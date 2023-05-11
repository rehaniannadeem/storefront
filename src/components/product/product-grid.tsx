import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { FC, useContext, useEffect, useState, Fragment } from "react";
//import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
// import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
//import { slice } from "lodash";
import { Context } from "src/pages/_app";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import FilterSidebar from "@components/shop/filter-sidebar";
import DataNotFound from '../404/data-not-found'
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
// import axios from "axios";
// import Category from './../../pages/category/[slug]';
interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();
  const router = useRouter();
  const { products }: any = useContext(Context);
  //console.log(query.variation, "query");

  // const {
  //   //  isFetching: isLoading,
  //   /*  isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage, */
  //   // data,
  //   error,
  // } = useProductsQuery({ limit: 10, ...query });
  // if (error) return <p>{error.message}</p>;

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
  const [subCatArray, setSubCatArray] = useState<any>([

  ])
  const [allCategories, setAllCategories] = useState<any>([])
  const[selectedSubCategory,setSelectedSubCategory]=useState<any>({
    id:1,
    name:"All"
  })
  //const [sortedFilter, setSortedFilter] = useState<any>('low-high')
  //const [isLoading, setIsLoading] = useState(false)
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const { domain }: any = useContext(Context);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  // let storefront_base_url = process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  //console.log('>>>>>>>>>>>', productData)
  const options = [
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
  // console.log(productData,'product List');

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
    var cat = JSON.parse(localStorage.getItem("categories")!)
    setAllCategories(cat)
  }, [])
  useEffect(() => {
    Array.isArray(products) ? setProductData(products) : null;
  }, [products]);
  // console.log(categoryArray, 'query');


  useEffect(() => { 
    let arr: any = []
    categoryArray.map((category: any) => {
      allCategories.map((cat: any) => {
        if (cat?.name.toLowerCase() === category.toLowerCase()) {
          cat?.sub_categories?.map((sub: any) => {
            // setSubCatArray((current:any) => [...current, sub]);
            arr = [...arr, sub]
          })
        }
      })
    })
    var all = {
      id: 1,
      name: "All",

    }
    if(arr?.length!=0){
      setSubCatArray([all, ...arr])
    }else{
      setSubCatArray(arr)
    }
   

setSelectedSubCategory({
  id: 1,
  name: "All",
})
    // const getCategory = () => {
    //   // setIsLoading(true);
    //   axios({
    //     method: "get",
    //     url: storefront_base_url + "/categories",
    //     // data: bodyFormData,
    //     headers: {
    //       "Content-Type": "Application/json",
    //       Authorization: `Bearer ${domain.token}`,
    //     },
    //   })
    //     .then((response: any) => {
    //       var selected_category:any=[]
    //       console.log(response.data.data, "this is category detail");
    //       categoryArray.map((cat:any)=>{
    //         const select=[response?.data.data.find((category:any)=>category.name.toLowerCase()===cat)]
    //         // selected_category=[...select]
    //         console.log(select,'selected');

    //     })


    //     })
    //     .catch(function (err: any) {
    //       //handle error
    //       console.log(err);
    //     });
    // };

    // { Object.keys(domain).length != 0 && getCategory(); }

  }, [categoryArray]);
  // console.log(subCatArray, 'new ');
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
  // console.log(query.name,'filter');

  useEffect(() => {
    let length = productData?.filter((item: any) => {
      if (Object.keys(query)?.length === 0) {
        return item;
      } else {
        // if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
        //   return item;
        // }

        // if (item.category != null) {
        //   if (categoryArray.includes(item.category.name)) {
        //     return item;
        //   }
        // }

        // if (item.brands != null) {
        //   if (brandArray.includes(item.brands.name)) {
        //     return item;
        //   }
        // }

        if (query?.variation?.length != undefined) {
          if (variationArray.includes(item?.variations[0]
            ?.value)) {
            return item;
          }
        } else {
          return item
        }
      }
    }).filter((item: any) => {
      if (query.category?.length != undefined) {
        if (item.category != null) {
          if (categoryArray.includes(item.category.name)) {
            return item;
          }
        }
      } else {
        return item
      }
    }).filter((item: any) => {
      if (query.brand?.length != undefined) {
        if (item.brands != null) {
          if (brandArray.includes(item.brands.name)) {
            return item;
          }
        }
      } else {
        return item
      }
    }).filter((item: any) => {
      if (query.price?.length != undefined) {
        if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
          return item;
        }
      } else {
        return item
      }

    }).filter((item: any) => {
      if (query.name?.length) {
        if (
          item?.name
            .toLocaleLowerCase()
            .includes(query.name.toString().toLocaleLowerCase())
        ) {
          return item;
        }
      } else {
        return item
      }

    }).filter((item: any) => {
      if (query.category?.length != undefined && selectedSubCategory.id != 1) {
          console.log(item); 
          if (selectedSubCategory.id===item.sub_category?.id) {
            return item;
          }
       
      } else {
        return item
      }
    }).sort((firstItem: any, secondItem: any) => {
      if (selectedItem?.value === 'high-low') {
        return secondItem?.price - firstItem?.price;
      } else {
        if (selectedItem?.value === "low-high") {
          return firstItem?.price - secondItem?.price;
        } else {
          if (selectedItem?.value === "a-z") {
            return firstItem?.name.toLowerCase() > secondItem?.name.toLowerCase() ? 1 : -1;
          } else if (selectedItem?.value === "z-a") {
            return firstItem?.name.toLowerCase() < secondItem?.name.toLowerCase() ? 1 : -1;
          } else {
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
  // console.log(productData, 'product');
  const handleSelectSubCategory=(e:any)=>{
   setSelectedSubCategory(e)
    
  }

  return (
    <>
    {Object.keys(products).length==0 ? 
    <div  className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}>
<ProductFeedLoader limit={20} uniqueKey="search-product" />
</div> 
    :
    <>
      <div className="flex flex-col">
      <div className="grid grid-cols-12 my-2">
  <div className="col-span-9">
    {query.category &&
    <div className="flex flex-wrap">
      {subCatArray.map((sub: any,index:any) => (
        <ul>
          <li id={index} className={`flex text-center flex-row justify-start p-2  border m-2 rounded-full cursor-pointer 
         
          `}
          onClick={()=>{handleSelectSubCategory(sub)}}
          style={selectedSubCategory.id===sub.id? {
            borderColor:domain.theme_color,
            color:"white",
            backgroundColor:domain.theme_color
                
          }:{
            borderColor:domain.theme_color,
                
          }}>
          {sub.name}
          </li>
        </ul>
      ))}
    </div>}
  </div>
  <div className="col-span-3">
    <span className="flex justify-end p-2">{productLength} Items</span>
  </div>
</div>
<style jsx>{`
      @media screen and (max-width: 768px) {
        .flex {
          flex-wrap: wrap;
        }
      `}</style>




        <div className="flex justify-between   p-2">

          <button
            className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
            onClick={openFilter}
          >
            <FilterIcon />
            <span className="ps-2.5">{t("text-filters")}</span>
          </button>
          <span ><Listbox value={selectedItem} onChange={handleItemClick}>
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
                              className={`${selected ? "font-medium" : "font-normal"
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
          <Drawer
            placement={dir === "rtl" ? "right" : "left"}
            open={displayFilter}
            onClose={closeFilter}
            handler={false}
            showMask={true}
            level={null}
            contentWrapperStyle={contentWrapperCSS}
          >
            <FilterSidebar />
          </Drawer>
        </div>
        {!productData?.length && 
        <div>
        <DataNotFound/>
        </div>
}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
        >

          {/* {!productData?.length ? (
            // <ProductFeedLoader limit={20} uniqueKey="search-product" />
          
          ) : ( */}
          { productData?.length!=0 &&
            productData
              .filter((item: any) => {
                if (Object.keys(query)?.length === 0) {
                  return item;
                } else {

                  // if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
                  //   return item;
                  // }

                  // if (item.category != null) {
                  //   if (categoryArray.includes(item.category.name)) {
                  //     return item;
                  //   }
                  // }

                  // if (item.brands != null) {
                  //   if (brandArray.includes(item.brands.name)) {
                  //     return item;
                  //   }
                  // }
                  if (query?.variation?.length != undefined) {
                    if (variationArray.includes(item?.variations[0]
                      ?.value)) {
                      return item;
                    }
                  } else {
                    return item
                  }


                }
              }).filter((item: any) => {
                if (query.category?.length != undefined) {
                  if (item.category != null) {
                    if (categoryArray.includes(item.category.name)) {
                      return item;
                    }
                  }
                } else {
                  return item
                }
              }).filter((item: any) => {
                if (query.brand?.length != undefined) {
                  if (item.brands != null) {
                    if (brandArray.includes(item.brands.name)) {
                      return item;
                    }
                  }
                } else {
                  return item
                }
              }).filter((item: any) => {
                if (query.price?.length != undefined) {
                  if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
                    return item;
                  }
                } else {

                  return item
                }
              }).filter((item: any) => {
                if (query.name?.length) {
                  if (
                    item?.name
                      .toLocaleLowerCase()
                      .includes(query.name.toString().toLocaleLowerCase())
                  ) {
                    return item;
                  }
                } else {
                  return item
                }

              }).filter((item: any) => {
                if (query.category?.length != undefined && selectedSubCategory.id != 1) {
                    console.log(item); 
                    if (selectedSubCategory.id===item.sub_category?.id) {
                      return item;
                    }
                 
                } else {
                  return item
                }
              }).sort((firstItem: any, secondItem: any) => {
                if (selectedItem?.value === 'high-low') {
                  return secondItem?.price - firstItem?.price;
                } else {
                  if (selectedItem?.value === "low-high") {
                    return firstItem?.price - secondItem?.price;
                  } else {
                    if (selectedItem?.value === "a-z") {
                      return firstItem?.name.toLowerCase() > secondItem?.name.toLowerCase() ? 1 : -1;
                    } else if (selectedItem?.value === "z-a") {
                      return firstItem?.name.toLowerCase() < secondItem?.name.toLowerCase() ? 1 : -1;
                    } else {
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
          }
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
}
    </>
  );
};
