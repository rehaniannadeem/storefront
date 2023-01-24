import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { FC, useContext, useEffect, useState,Fragment } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
//import { slice } from "lodash";
import { Context } from "src/pages/_app";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();
  const router = useRouter();
  const { products }: any = useContext(Context);
//  console.log(query.sort_by, "products");

  const {
    //  isFetching: isLoading,
    /*  isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage, */
    // data,
    error,
  } = useProductsQuery({ limit: 10, ...query });
  if (error) return <p>{error.message}</p>;

  const { t } = useTranslation("common");
  const [productData, setProductData] = useState<any>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(12);
  // const initialProduct = slice(productData, 0, index);
  const [categoryArray, setCategoryArray] = useState<any>([]);
  const [brandArray, setBrandArray] = useState<any>([]);
  const [priceArray, setPriceArray] = useState<any>([]);
  const [variationArray, setVariationArray] = useState<any>([]);
  const [productLength, setProductLength] = useState<any>();
  //const [sortedFilter, setSortedFilter] = useState<any>('low-high')
  //const [isLoading, setIsLoading] = useState(false)
 
  //console.log('>>>>>>>>>>>', productData)
 const options=[
    { name: "text-sorting-options", value: "options" },
   //  { name: "text-newest", value: "newest" },
   // { name: "text-popularity", value: "popularity" }, 
   { name: "text-price-low-high", value: "low-high" },
   { name: "text-price-high-low", value: "high-low" },
   { name: "text-sort-a-z", value: "a-z" },
   { name: "text-sort-z-a", value: "z-a" },
 ]
 const [selectedItem, setSelectedItem] = useState<any>(options[0]);
 function handleItemClick(values: any) {
  setSelectedItem(values);
  // const { sort_by, ...restQuery } = query;
  // router.push(
  //   {
  //     pathname,
  //     query: {
  //       ...restQuery,
  //       ...(values.value !== options[0].value
  //         ? { sort_by: values.value }
  //         : {}),
  //     },
  //   },
  //   undefined,
  //   { scroll: false }
  // );
}
//console.log(selectedItem);

  const loadMore = () => {
    setIndex(index + 12);
    if (productData != undefined) {
      if (index >= productLength) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    }
  };
  useEffect(() => {
    Array.isArray(products) ? setProductData(products) : null;
  }, [products]);
  useEffect(() => {
   // setIsLoading(true)
    
    if (query?.category?.length != undefined) {
      const filterCategory: any = query.category;
      setCategoryArray(filterCategory.split(","));
    } else {
      setCategoryArray([]);
    }
    if (query?.brand?.length != undefined) {
      const filterCategory: any = query.brand;
      setBrandArray(filterCategory.split(","));
    } else {
      setBrandArray([]);
    }
    if (query.price?.length != undefined) {
      const filterPrice: any = query.price;
      setPriceArray(filterPrice.split("-"));
      //console.log(priceArray, "filter price");
    } else {
      setPriceArray([]);
    }
    if (query?.variation?.length != undefined) {
      const filterVariation: any = query?.variation;
      // console.log(filterPrice, "filter price");
      setVariationArray(filterVariation.split(","));
    } else {
      setVariationArray([]);
    }
   // setIsLoading(false)
  }, [router]);
  //console.log(sortedFilter,'filter');

  useEffect(() => {
    let length = productData?.filter((item: any) => {
      if (Object.keys(query).length === 0) {
        return item;
      } else {
        // if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
        //   return item;
        // }

        if (item.category != null) {
          if (categoryArray.includes(item.category.name)) {
            return item;
          }
        }

        if (item.brands != null) {
          if (brandArray.includes(item.brands.name)) {
            return item;
          }
        }

        if (variationArray.includes(item?.variations[0]
          ?.value)) {
          return item;
        }

      }
    }).filter((item:any)=>{
      if (query.price?.length != undefined) {
        if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
          return item;
        }
      } else {
        return item
      }

    }).sort((firstItem:any,secondItem:any)=>{
      if (selectedItem?.value === 'high-low') {
        return secondItem?.price - firstItem?.price;
      } else {
        if(selectedItem?.value==="low-high"){
          return firstItem?.price - secondItem?.price;
        }else{
          if(selectedItem?.value==="a-z"){
            return firstItem?.name.toLowerCase() > secondItem?.name.toLowerCase() ? 1 : -1;
          }else if(selectedItem?.value==="z-a"){
            return firstItem?.name.toLowerCase() < secondItem?.name.toLowerCase() ? 1 : -1;
          }else{
            return firstItem
          }
          
        }
        
      }
    }).length;

    setProductLength(length);
  });

  useEffect(() => {
    if (productLength > index) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [index, productLength]);

  return (
    <>
    <div className="flex flex-col">

   
      <div className="flex justify-between p-2">
          <span>{productLength}</span>
          <span><Listbox value={selectedItem} onChange={handleItemClick}>
			{({ open }) => (
				<div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
					<Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
						<span className="block truncate">{t(selectedItem.name)}</span>
						<span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
							<HiOutlineSelector
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						show={open}
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							static
							className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
						>
							{options?.map((option, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`${active ? "text-amber-900 bg-gray-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 ps-10 pe-4`
									}
									value={option}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`${
													selected ? "font-medium" : "font-normal"
												} block truncate`}
											>
												{t(option.name)}
											</span>
											{selected ? (
												<span
													className={`${active ? "text-amber-600" : ""}
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
												>
													<HiCheck className="w-5 h-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox></span>
        </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
      
        { !productData?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          productData
            .filter((item: any) => {
              if (Object.keys(query).length === 0) {
                return item;
              } else {
                
                // if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
                //   return item;
                // }

                if (item.category != null) {
                  if (categoryArray.includes(item.category.name)) {
                    return item;
                  }
                }

                if (item.brands != null) {
                  if (brandArray.includes(item.brands.name)) {
                    return item;
                  }
                }

                if (variationArray.includes(item?.variations[0]
                  ?.value)) {
                  return item;
                }
              
              }
            }).filter((item:any)=>{
              if (query.price?.length != undefined) {
                if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
                  return item;
                }
              } else {
                
                return item
              }
            }) .sort((firstItem: any, secondItem: any) => {
                if (selectedItem?.value === 'high-low') {
                  return secondItem?.price - firstItem?.price;
                } else {
                  if(selectedItem?.value==="low-high"){
                    return firstItem?.price - secondItem?.price;
                  }else{
                    if(selectedItem?.value==="a-z"){
                      return firstItem?.name.toLowerCase() > secondItem?.name.toLowerCase() ? 1 : -1;
                    }else if(selectedItem?.value==="z-a"){
                      return firstItem?.name.toLowerCase() < secondItem?.name.toLowerCase() ? 1 : -1;
                    }else{
                      return firstItem
                    }
                    
                  }
                  
                }
             

            })
            .slice(0, index)
            .map((product: any) => {
              return (
                <ProductCard
                  key={`product--key${product.id}`}
                  product={product}
                  variant="grid"
                />
              );
            }
            )
        )}
      </div>
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {isCompleted === true ? (
          <Button
            // loading={loadingMore}
            // disabled={loadingMore}
            onClick={loadMore}
            variant="slim"
          >
            {t("button-load-more")}
          </Button>
        ) : null}
      </div>
    </>
  );
};
