import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
//import Subscription from "@components/common/subscription";
//import { ProductGrid } from "@components/product/product-grid";
import Button from "@components/ui/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductCard from "@components/product/product-card";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
//import { slice } from "lodash";

export default function Category() {
  const { query } = useRouter();
  const {
    query: { slug },
  } = useRouter();
  //  console.log(slug);
  const categoryTitle = slug?.toString().split("-").join("");
  // console.log(categoryTitle);
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
  // console.log(data?.pages[0]?.data);
  const [productData, setProductData] = useState<any>(data?.pages[0].data);

  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  // const initialProduct: any = slice(productData, 0, index);
  console.log(productData);

  const loadMore = () => {
    setIndex(index + 5);
    if (productData != undefined) {
      if (index >= productData?.length) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    }
  };
  useEffect(() => {
    setProductData(data?.pages[0].data);
  }, [data]);
  /*   useEffect(() => {
    if (productData?.length > index) {
      setIsCompleted(true);
    }
  }, [index, productData]); */
  /*   useEffect(() => {
    console.log(initialProduct[1].category);
  }, [initialProduct]); */
  // console.log(productData);
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <CategoryBanner />
        <div className="pb-16 lg:pb-20">
          {/*  <ProductGrid className="3xl:grid-cols-6" /> */}
          {productData != undefined ? (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 `}
            >
              {isLoading && !data?.pages?.length ? (
                <ProductFeedLoader limit={20} uniqueKey="search-product" />
              ) : (
                productData
                  .filter((item: any) => {
                    if (item.category != null) {
                      if (item.category.name == categoryTitle) {
                        return item;
                      }
                    }
                  })
                  .map((product: any) => (
                    <ProductCard
                      key={`product--key${product.id}`}
                      product={product}
                      variant="grid"
                    />
                  ))
                /*  data?.pages?.map((page) => {
                return page?.data.map((product) => (
                  <ProductCard
                    key={`product--key${product.id}`}
                    product={product}
                    variant="grid"
                  />
                ));
              }) */
              )}
            </div>
          ) : null}

          <div className="text-center pt-8 xl:pt-14">
            {isCompleted == true ? (
              <Button
                // loading={loadingMore}
                // disabled={loadingMore}
                onClick={loadMore}
                variant="slim"
              >
                {t("button-load-more")}
              </Button>
            ) : (
              <Button //loading={loadingMore}
                disabled={true}
                variant="slim"
              >
                {t("button-load-more")}
              </Button>
            )}
          </div>
        </div>
        {/*   <Subscription /> */}
      </Container>
    </div>
  );
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
