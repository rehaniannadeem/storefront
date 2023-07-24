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
import  { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
//import { useEffect, useState } from "react";
//import Head from "next/head";
//import { siteSettings } from "@settings/site-settings";
import { useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Image from "next/image";
import Text from "@components/ui/text";
import closeStore from '../../public/store-close.svg'
import { useTranslation } from "next-i18next";

import axios from "axios";
import Loader from "@components/ui/loaders/loader/loader";
function PopupContent({ closePopup, business, domain }: any) {
  const { t } = useTranslation("common");



  return (
    <div className="border-t border-b h-1/2 border-gray-300 text-center px-4 py-2 flex flex-col items-center justify-center sm:px-8 md:px-12 lg:px-16">
      <div>
        <Text variant="mediumHeading">{business + " "}{t("currently-close")} </Text>
      </div>
      <div>
        <Image
          src={closeStore}
          alt={t("error-heading")}
          width={200}
          height={200}
        />

        <Text variant="mediumHeading" className="mt-4">{t("close-message")}</Text>
        <div className="py-2">
          <button className="p-2 rounded text-lg font-semibold"
            style={{
              backgroundColor: domain.theme_color,
              cursor: "pointer",
              color: "white"
            }}
            onClick={closePopup}>Continue</button>
        </div>

      </div>

      <style jsx>{`
        @media only screen and (min-width: 640px) {
          .border-t {
            border-top-width: 1px;
          }
          .border-b {
            border-bottom-width: 1px;
          }
        }
      `}</style>
    </div>
  );
}

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
  const [business, setBusiness] = useState<any>('')
  const [domain, setDomain] = useState<any>({})
  const [isLoading,setIsLoading]=useState(false)
  // const[lang,setLang]=useState<any>(null)
  const url = router?.asPath.split("?")
  //  console.log(router,'url');

  async function getUserLocation(businessData:any) {
    
    
    setIsLoading(true)
    axios({

      method: "get",
      url: 'https://api.ipregistry.co/?key=7qsumd6hmu9lk9ns',
      // data: bodyFormData,
      headers: {
        "Content-Type": "Application/json",

      },
    })
      .then((response) => {
        //handle success
        // console.log(response.data,'location response');
        const lang = response.data.location.language.code;
        sessionStorage.setItem("countryCode", response.data.location.country.code);
        if (lang === 'ar') {
          sessionStorage.setItem("language", lang);
          setIsLoading(false)
        } else {        
          sessionStorage.setItem("language", 'en');
          setIsLoading(false)
        }
        if (businessData?.theme === ('minimal') && router?.asPath == "/") {
          router.push(`${ROUTES.HOME}`, undefined, {
            locale: lang,
          })

        } else if (businessData?.theme && router?.asPath == "/") {
          router.push(`/${businessData?.theme}`, undefined, {
            locale: lang,
          })

        }

      }
      )

  }

  useEffect(() => {
    let host = window.location.host;
    let parts = host.split(".");
    setBusiness(parts[0])

    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomain(domainData);
    }
  }, [])
  useEffect(() => {
    setIsLoading(true)
    const business = JSON.parse(localStorage.getItem('domainData')!)
 
    var isLanguage: any = null
    if (business) {

      if (!sessionStorage.getItem("language")) {
        if (business?.primary_language) {
          isLanguage = business?.primary_language
          sessionStorage.setItem("language", business?.primary_language)
        } else {
          getUserLocation(business);
        }
      } else {
        var language: any = sessionStorage.getItem("language")
        isLanguage = language
        
      }


      if (business?.theme === ('minimal') && router?.asPath == "/") {
        router.push(`${ROUTES.HOME}`, undefined, {
          locale: isLanguage,
        })
        setIsLoading(false)
        // console.log('is coming',business?.theme);
      } else if (business?.theme && router?.asPath == "/") {
        
     
        router.push(`/${business?.theme}`, undefined, {
          locale: isLanguage,
        })

      } else {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {

    if (url[1] != undefined && url[1].toLowerCase().includes("source")) {
      let newUrl = url[1].split("=")
      if (newUrl[1]) {
        sessionStorage.setItem("source", newUrl[1])
      }

    }

    {
      url[1] != undefined && url[1].toLowerCase().includes("sku") &&
        router.push(`${ROUTES.PRODUCT}?${url[1]}`, undefined, {
          locale: router.locale,
        })
    }

    // if(domainData?.name==="urbannecessity" && url[1]==undefined){
    //   router.push(`${ROUTES.SEARCH}`, undefined, {
    //     locale: router.locale,
    //   })

    // }
  }, [url])


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
if (isLoading) {
  return <Loader />
}


  return (
    <Container>
      {domain?.is_open === "false" &&
        <Popup modal open className="">
          {(close: any) => <PopupContent closePopup={close} business={business} domain={domain} />}
        </Popup>
      }

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
