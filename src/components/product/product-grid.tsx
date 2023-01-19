import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { FC, useContext, useEffect, useState } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
//import { slice } from "lodash";
import { Context } from "src/pages/_app";
interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();
  const router = useRouter();
  const { products }: any = useContext(Context);
  //console.log(products, "products");

  const {
    isFetching: isLoading,
    /*  isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage, */
    data,
    error,
  } = useProductsQuery({ limit: 10, ...query });
  if (error) return <p>{error.message}</p>;

  const { t } = useTranslation("common");
  const [productData, setProductData] = useState<any>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(13);
  // const initialProduct = slice(productData, 0, index);
  const [categoryArray, setCategoryArray] = useState<any>([]);
  const [brandArray, setBrandArray] = useState<any>([]);
  const [priceArray, setPriceArray] = useState<any>([]);
  const [variationArray, setVariationArray] = useState<any>([]);
  const [productLength, setProductLength] = useState<any>();
//console.log('>>>>>>>>>>>', productData)
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
    if (query.category?.length != undefined) {
      const filterCategory: any = query.category;
      setCategoryArray(filterCategory.split(","));
    } else {
      setCategoryArray([]);
    }
    if (query.brand?.length != undefined) {
      const filterCategory: any = query.brand;
      setBrandArray(filterCategory.split(","));
    } else {
      setBrandArray([]);
    }
    if (query.price?.length != undefined) {
      const filterPrice: any = query.price;
      // console.log(filterPrice, "filter price");
      setPriceArray(filterPrice.split("-"));
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
  }, [router]);
//console.log(productData[1].variations[0].value);

  useEffect(() => {
    let length = productData?.filter((item: any) => {
      if (Object.keys(query).length === 0) {
        return item;
      } else {
        if (item.price >= priceArray[0] && item.price < priceArray[1]) {
          return item;
        }

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
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          productData
            .filter((item: any) => {
              if (Object.keys(query).length === 0) {
                return item;
              } else {
                if (item.price >= priceArray[0] && item.price < priceArray[1]) {
                  return item;
                }

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
            })
            .slice(0, index)
            .map((product: any) => {
              if (product.name.toLocaleLowerCase() === "open product") {
                product.visibility = "hidden";
              } else {
                return (
                  <ProductCard
                    key={`product--key${product.id}`}
                    product={product}
                    variant="grid"
                  />
                );
              }
            })
        )}
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
