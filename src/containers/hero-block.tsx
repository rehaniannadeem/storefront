import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
//import { homeOneHeroBanner as banners } from "@framework/static/banner";
import { useWindowSize } from "@utils/use-window-size";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";

const breakpoints = {
  "1500": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const HeroBlock: React.FC = () => {
  const { width } = useWindowSize();
  const { domain }: any = useContext(Context);
  const [banners, setBanners] = useState<any>([]);
  const [placeholder, _setPlaceholder] = useState<any>([]);
  const getBanner = () => {
    //	setIsLoading(true);
    fetch("https://pos-dev.myignite.online/connector/api/banner", {
      method: "get",
      headers: {
        Authorization: `Bearer ${domain.token}`,
        // ContentType: "image/jpg",
        ContentType: "Application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBanners(data.data);
        //setIsLoading(false);

        // setSlider(data.data[0].banner_image);
        console.log(data.data, "slider");
      });
  };

  useEffect(() => {
    getBanner();
  }, [domain]);
  useEffect(() => {
    {
      banners?.map(
        (item: any, index: any) =>
          (placeholder[index] = {
            id: item.id,
            title: "slider image",
            slug: "slider image",
            image: {
              mobile: {
                url: item.banner_image,
                width: 450,
                height: 275,
              },
              desktop: {
                url: item.banner_image,
                width: 1450,
                height: 800,
              },
            },
          })
      );
    }

    // console.log(placeholder, "placehoder2");
  });
  return (
    <div className="heroBannerOne relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0">
      <Carousel
        breakpoints={breakpoints}
        centeredSlides={width < 1500 ? false : true}
        autoplay={{ delay: 5000 }}
        className="mx-0"
        buttonClassName="hidden"
        pagination={{
          clickable: true,
        }}
      >
        {placeholder.length == 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <SwiperSlide key={`category-list-${idx}`}>
                <CategoryListCardLoader uniqueKey={`category-list-${idx}`} />
              </SwiperSlide>
            ))
          : placeholder?.map((banner: any) => (
              <SwiperSlide
                className="carouselItem px-0 2xl:px-3.5"
                key={`banner--key-${banner?.id}`}
              >
                <BannerCard
                  banner={banner}
                  href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
                />
              </SwiperSlide>
            ))}
      </Carousel>
    </div>
  );
};

export default HeroBlock;
