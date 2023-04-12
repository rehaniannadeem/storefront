/** 
import BannerCard from "@components/common/banner-card";
import CategoryGridBlock from "@containers/category-grid-block";
import CollectionBlock from "@containers/collection-block";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import BannerGridBlock from "@containers/banner-grid-block";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import Subscription from "@components/common/subscription";
import { homeOneBanner as banner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";
*/
import Container from "@components/ui/container";
import BrandBlock from "@containers/brand-block";
// import FeatureBlock from "@containers/feature-block";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import ProductsWithFlashSale from "@containers/products-with-flash-sale";
import HeroWithCategory from "@containers/hero-with-category";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
//import { useEffect, useState } from "react";
//import Head from "next/head";
//import { siteSettings } from "@settings/site-settings";
import { useEffect } from 'react';



const flashSaleCarouselBreakpoint = {
  "1281": {
    slidesPerView: 1,
    spaceBetween: 28,
  },
  "768": {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

export default function Home() {
  const router = useRouter();
//  let domainData:any={}
  const url=router?.asPath.split("?")
//  console.log(router,'url');

  // useEffect(()=>{
  //   domainData=JSON?.parse(localStorage?.getItem("domainData")!)
  // },[])

useEffect(()=>{
 
  if(url[1]!=undefined && url[1].toLowerCase().includes("source")){
    let newUrl=url[1].split("=")
    if(newUrl[1]){
      sessionStorage.setItem("source",newUrl[1])
    }
   
   }
  
  {url[1]!=undefined &&  url[1].toLowerCase().includes("sku")&&
  router.push(`${ROUTES.PRODUCT}?${url[1]}`, undefined, {
    locale: router.locale,
  })}
  // if(domainData?.name==="urbannecessity" && url[1]==undefined){
  //   router.push(`${ROUTES.SEARCH}`, undefined, {
  //     locale: router.locale,
  //   })

  // }
},[url])
  /** 
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "http://pos-dev.myignite.online/connector/api/business/sf-dev",
        {
          method: "get",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTitle(data.data[0].name);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);
  siteSettings.name = title;
*/
  return (
    <Container>
    
      <HeroWithCategory />
      <ProductsWithFlashSale carouselBreakpoint={flashSaleCarouselBreakpoint} />
      {/**
      <BannerGridBlock />
      <CategoryGridBlock sectionHeading="text-featured-categories" />
      <Divider />
      <BestSellerProductFeed />
      <BannerCard
        key={`banner--key${banner.id}`}
        banner={banner}
        href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
        className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
      />
      <NewArrivalsProductFeed />
       <CollectionBlock />
       <DownloadApps />
        <Support />
      <Subscription />
      */}
      <Divider />
      <BrandBlock sectionHeading="text-top-brands" />
      {/* <FeatureBlock /> */}
    </Container>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
