import Card from "@components/common/card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
//import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { ROUTES } from "@utils/routes";
//import Alert from "@components/ui/alert";
import {  useEffect, useState } from "react";
// import { Context } from "src/pages/_app";
// import axios from "axios";
interface BrandProps {
  sectionHeading: string;
  className?: string;
}

const breakpoints = {
  "1720": {
    slidesPerView: 8,
    spaceBetween: 28,
  },
  "1400": {
    slidesPerView: 7,
    spaceBetween: 28,
  },
  "1025": {
    slidesPerView: 6,
    spaceBetween: 28,
  },
  "768": {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  "500 ": {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const BrandBlock: React.FC<BrandProps> = ({
  className = "mb-11 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  sectionHeading,
}) => {
  /*   const { data, isLoading, error } = useBrandsQuery({
    limit: 8,
  }); */
  // const { domain }: any = useContext(Context);
  const [items, setItems] = useState<any>([]);
  // let storefront_base_url = process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    let brand: any = localStorage.getItem("brands")
    if (brand) {
      setItems(JSON.parse(brand))
      setIsLoading(false)
    }
  }, [])
  // useEffect(() => {
  //   const getBrand = () => {
  //      setIsLoading(true);
  //     axios({
  //       method: "get",
  //       url: storefront_base_url+"/brands",
  //       // data: bodyFormData,
  //       headers: {
  //         "Content-Type": "Application/json",
  //         Authorization: `Bearer ${domain.token}`,
  //       },
  //     })
  //       .then((response: any) => {
  //       //  console.log(response.data.brands, "this is brand detail");
  //         setItems(response.data.brands);
  //         setIsLoading(false);

  //         localStorage.setItem("brands", JSON.stringify(response.data.brands));
  //       })
  //       .catch(function (err: any) {
  //         //handle error
  //         console.log(err);
  //         setIsLoading(false);
  //       });
  //     // setIsLoading(false);
  //   };

  //   {Object.keys(domain)?.length!=0 &&  getBrand();}

  // }, [domain]);
  // const brands = data?.brands;
  // console.log(items,"brands");

  return (
    <div className={className}>
      {isLoading ?
        (<>  <SectionHeader sectionHeading={sectionHeading} />
          <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-12">
            {Array.from({ length: 10 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <CardRoundedLoader uniqueKey={`category-${idx}`} />
              </SwiperSlide>
            ))
            }
          </Carousel>
        </>) : (
          items?.length == 0 ? (<div></div>) :
            (<>
              <SectionHeader sectionHeading={sectionHeading} />
              <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-12">
                {items?.length == 0 && isLoading
                  ? Array.from({ length: 10 }).map((_, idx) => (
                    <SwiperSlide key={idx}>
                      <CardRoundedLoader uniqueKey={`category-${idx}`} />
                    </SwiperSlide>
                  ))
                  : items?.map((brand: any) => (
                    <SwiperSlide key={`brand--key${brand.id}`}>
                      <Card
                        item={brand}
                        variant="rounded"
                        size="medium"
                        href={{
                          pathname: ROUTES.SEARCH,
                          query: { brand: brand.slug },
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Carousel></>)

        )

      }
      {/* <SectionHeader sectionHeading={sectionHeading} />
      <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-12">
        {items.length == 0 && isLoading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <CardRoundedLoader uniqueKey={`category-${idx}`} />
              </SwiperSlide>
            ))
          : items?.map((brand: any) => (
              <SwiperSlide key={`brand--key${brand.id}`}>
                <Card
                  item={brand}
                  variant="rounded"
                  size="medium"
                  href={{
                    pathname: ROUTES.SEARCH,
                    query: { brand: brand.slug },
                  }}
                />
              </SwiperSlide>
            ))}
      </Carousel> */}
    </div>
  );
};

export default BrandBlock;
