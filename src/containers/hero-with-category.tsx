import BannerCard from "@components/common/banner-card";
import CategoryListCard from "@components/common/category-list-card";
import Carousel from "@components/ui/carousel/carousel";
import { Swiper, SwiperSlide } from "swiper/react";
//import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { useWindowSize } from "@utils/use-window-size";

import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import CategoryListFeedLoader from "@components/ui/loaders/category-list-feed-loader";
//import { ROUTES } from "@utils/routes";
//import Alert from "@components/ui/alert";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";
import axios from "axios";

interface Props {
  className?: string;
}

const categoryResponsive = {
  "1280": {
    slidesPerView: 4,
    spaceBetween: 28,
  },
  "768": {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  "480": {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

const HeroWithCategory: React.FC<Props> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
}) => {
  const { domain }: any = useContext(Context);
  let token = domain.token;
  const { width } = useWindowSize();
  /*   const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
  }); */

  const [banners, setBanners] = useState<any>([]);
  const [placeholder, _setPlaceholder] = useState<any>([]);

  const [items, setItems] = useState<any>([]);
  //fetch banner method
  const getBanner = () => {
    //  setIsLoading(true);
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
        // setIsLoading(false);

        // setSlider(data.data[0].banner_image);
        //console.log(data.data, "slider");
      });
  };
  //get categories
  const getCategory = () => {
    //  setCategoryLoading(true);
    axios({
      method: "get",
      url: "http://pos-dev.myignite.online/api/store-front/categories",
      // data: bodyFormData,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${domain.token}`,
      },
    })
      .then((response: any) => {
        // console.log(response.data, "this is product detail");
        setItems(response.data.data);
        localStorage.setItem("categories", JSON.stringify(response.data.data));
      })
      .catch(function (err: any) {
        //handle error
        console.log(err);
      });
  };
  useEffect(() => {
    getCategory();
  }, [domain]);

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
   
      
  return (
    <div
      className={`grid grid-cols-1 2xl:grid-cols-5 gap-5 xl:gap-7 ${className}`}
    >
      {width < 1500 ? (
        <div>
          <Carousel breakpoints={categoryResponsive} buttonSize="small">
            {/*changed data.categories.data.length into data*/}
            {items.length == 0
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <SwiperSlide key={`category-list-${idx}`}>
                    <CategoryListCardLoader
                      uniqueKey={`category-list-${idx}`}
                    />
                  </SwiperSlide>
                ))
              : items?.map((category: any, index: any) => (
                  <SwiperSlide key={index}>
                    <CategoryListCard
                      key={`category--key${category.id}`}
                      category={category}
                    />
                  </SwiperSlide>
                  /*   <div className="w-full mx-1 sm-w-full ">
                    <CategoryListCard category={category} />
                  </div> */
                ))}
          </Carousel>
        </div>
      ) : (
        <div className="2xl:-me-14 grid grid-cols-1 gap-3">
          {items.length == 0 ? (
            <CategoryListFeedLoader limit={8} />
          ) : (
            //changed data.categories.data into data.data
            items
              ?.slice(0, 8)
              .map((category: any, index: any) => (
                <CategoryListCard key={index} category={category} />
              ))
          )}
        </div>
      )}
      <div className="col-span-full row-span-full 2xl:row-auto 2xl:col-span-4 2xl:ms-14">
        <Carousel
          pagination={{
            clickable: true,
          }}
          className="-mx-0"
          buttonClassName="hidden"
        >
          {placeholder.length == 0
            ? Array.from({ length: 8 }).map((_, idx) => (
                <SwiperSlide key={`category-list-${idx}`}>
                  <CategoryListCardLoader uniqueKey={`category-list-${idx}`} />
                </SwiperSlide>
              ))
            : //<CategoryListFeedLoader limit={8} />
              placeholder?.map((banner: any, index: any) => (
                <Swiper key={index}>
                  <SwiperSlide key={`banner--key${banner.id}`}>
                    <BannerCard
                      key={index}
                      banner={banner}
                      href={"/"}
                      className="xl:h-4/6"
                    />
                  </SwiperSlide>
                </Swiper>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroWithCategory;
