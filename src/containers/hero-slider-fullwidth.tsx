import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
//import { homeSixHeroImages as banners } from "@framework/static/banner";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import { ROUTES } from "@utils/routes";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";
import { SwiperSlide } from "swiper/react";

const HeroSlider: React.FC = () => {
  const { domain }: any = useContext(Context);
  let token = domain.token;
  const [banners, setBanners] = useState<any>([]);
  const [placeholder, _setPlaceholder] = useState<any>([]);

  const getBanner = () => {
    // setIsLoading(true);
    fetch("https://pos-dev.myignite.online/connector/api/banner", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        // ContentType: "image/jpg",
        ContentType: "Application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBanners(data.data);
        //  setIsLoading(false);

        // setSlider(data.data[0].banner_image);
        console.log(data.data, "slider");
      });
  };

  useEffect(() => {
    getBanner();
  }, [token]);
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
  });
  //console.log(placeholder, "placehoder2");
  return (
    <div className="relative mb-5 md:mb-8">
      <Carousel
        autoplay={false}
        className="mx-0"
        buttonClassName="hidden"
        paginationPosition="left"
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
                className="carouselItem"
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

export default HeroSlider;
