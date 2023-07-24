import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/custom-carousel";
import { SwiperSlide } from "swiper/react";
// import { promotionBanner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";
import { useEffect, useState } from "react";

interface BannerProps {
	className?: string;
}

const breakpoints = {
	"0": {
		slidesPerView: 2,
	},
};

const BannerSliderBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {

	const [_isLoading, setIsLoading] = useState(false)
	const [banners, setBanners] = useState<any>([]);
	const [placeholder, _setPlaceholder] = useState<any>([]);
	let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
	useEffect(() => {
		let token = localStorage.getItem("user_token")
		console.log(token);

		if (token) {
			getBanner(token);
		}
	}, []);
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

	const getBanner = (token: any) => {
		setIsLoading(true);
		fetch(connector_base_url + "/banner", {
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
				setIsLoading(false);

				// setSlider(data.data[0].banner_image);
				console.log(data.data, "slider");
			});
	};

	return (
		<div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
			<div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
				<Carousel
					breakpoints={breakpoints}
					centeredSlides={true}
					pagination={{
						clickable: true,
					}}
					paginationVariant="circle"
					buttonClassName="hidden"
				>
					{placeholder?.map((banner: any) => (
						<SwiperSlide
							key={`banner--key${banner.id}`}
							className="px-1.5 md:px-2.5 xl:px-3.5"
						>
							<BannerCard
								banner={banner}
								effectActive={true}
								href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default BannerSliderBlock;
