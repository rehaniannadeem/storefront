import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
// import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
//import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
//import isEmpty from "lodash/isEmpty";
//import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
//import ProductMetaReview from "@components/product/product-meta-review";
import axios from "axios";
import { useTranslation } from "next-i18next";

//import { isEmpty } from "lodash";
import getSymbolFromCurrency from "currency-symbol-map";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useUI } from "@contexts/ui.context";
import Loader from "@components/ui/loaders/loader/loader";
declare global {
  interface Window {
    TabbyPromo: any;
  }
}
const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation("common");
  const { items, total } = useCart();
  // console.log(items,'this is Item');

  const {
    query: { slug },
    locale
  } = useRouter();
  
  const { isAuthorized } = useUI();
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  // const productName = "Air Force 1 Low Comfort Premium QS Black/Black - 573974 001"
  // const productName =router.asPath;


   const productName = slug;
  // console.log(slug,'slugslug');
  const { width } = useWindowSize();
  // const { data } = useProductQuery(slug as string);
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string | any }>(
    {}
  );
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [domainData, setDomainData] = useState<any>({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [token, setToken] = useState("");
  const [product, setProduct] = useState<any>({});
  const [isGalleryImg, setIsGalleryImg] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  //const [isCategory, setIsCategory] = useState(false);
  // let isSelected = Object.keys(attributes).length == 0 ? false : true;
  let storefront_base_url = process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  const [userData, setUserData] = useState<any>({});
  const [cartId, setCartId] = useState<any>()
  const [Loading, setIsLoading] = useState(false)
  const[finalPrice, setFinalPrice] = useState<number | null>(null);

  // console.log(cartId,'idaiffsiadsfdc');

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
      setToken(domainData.token);
      setDomainCurrencyCode(domainData.currency.code);
      
    }
    // setDomainCurrencyCode(domainData.currency.code);
    // setToken(domainData.token);
    var userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData) {
      setUserData(userData);
    }
    let cartId: any = localStorage.getItem("cart_id")
    setCartId(cartId)
    // console.log(token);

  }, []);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = () => {
      axios({
        method: "get",
        url: storefront_base_url + "/products",
        params: {
          product_slug: productName,
        },

        headers: {
          //"Content-Type": "multipart/form-data",
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if(response){
            // console.log(response.data, "this is response");
            // let finalProduct=''
            // response?.data.filter(((product:any)=> {
            //   if(product.name===productName){
            //     finalProduct=product
            //   }
            // }
            //   ))
            // console.log(finalProduct,'final final');
            
            setProduct(response.data[0]);
            setFinalPrice(response?.data[0]?.price)
  
            if (response?.data[0]?.gallery?.length === 0) {
              setIsGalleryImg(false);
            } else {
              setIsGalleryImg(true);
            }
            // setAttributes({})
  
            setIsLoading(false)
          }
         
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        });
    };
    if (token) {
      fetchData();
    }

  }, [token, productName]);
  useEffect(() => {

    if (product?.enable_stock == 1) {

      if (
        Object.keys(attributes)?.length != 0) {

        if (quantity <= Math.round(attributes?.variation_details[0]?.qty_available)) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    }
  }, [quantity]);
  useEffect(() => {


    {
      Object.keys(attributes)?.length != 0
        ? setIsSelected(true)
        : setIsSelected(false);
    }
    if (Object.keys(attributes)?.length != 0 && product?.enable_stock == 1) {
      if (attributes?.variation_details[0]?.qty_available <= 0) {
        setQuantity(0);
        //setIsDisable(true);
        setIsSelected(false);
      }
    }

    if (product?.enable_stock == 1) {

      if (
        Object.keys(attributes)?.length != 0) {

        if (quantity <= Math.round(attributes?.variation_details[0]?.qty_available)) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    }

    // var price:any = Object.keys(attributes)?.length == 0
    //   ? Number(product?.price).toFixed(2)
    //   : Number(attributes?.sell_price_inc_tax).toFixed(2)
    // setFinalPrice(product?.price)
  }, [attributes]);
  useEffect(() => {


    if (Object.keys(product)?.length != 0) {
      if (product.variations?.length == 1) {
        setAttributes(product.variations[0]);
      }
    }
  }, [product]);
  const updateItemToServer = (item: any) => {
    axios({
      method: "post",
      url: connector_base_url + "/abandonedcart/store",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        contact_id: userData.id,
        id: cartId,
        shipping_status: "pending",
        final_amount: total,
        cart_detail: item
      },

    })
      .then((response) => {
        console.log(response.data, 'response server');
        if (response?.data?.success) {
          // localStorage.setItem("cart_id",response.data.data.id)
          toast.success("Added to the cart")

          setAddToCartLoader(false);
        } else {
          toast.error("Something went wrong")
          setAddToCartLoader(false);
        }


      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
  const addItemToServer = (item: any) => {
    axios({
      method: "post",
      url: connector_base_url + "/abandonedcart/store",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        contact_id: userData.id,
        shipping_status: "pending",
        final_amount: total,
        cart_detail: item
      },

    })
      .then((response) => {
        console.log(response.data, 'response server');
        if (response?.data?.success) {
          localStorage.setItem("cart_id", response.data.data.id)
          setCartId(response.data.data.id)
          toast.success("Added to the cart")
          setAddToCartLoader(false);
        } else {
          toast.error("Something went wrong")
          setAddToCartLoader(false);
        }


      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
  useEffect(() => {
    let cartId: any = localStorage.getItem("cart_id")
    setCartId(cartId)

  })

  useEffect(() => {
    if (isAuthorized && token) {
      if (cartId) {
        updateItemToServer(items)
      } else {
        addItemToServer(items)
      }
    }


  }, [items])
  useEffect(() => {
// console.log(finalPrice,'priceprice');

    const script = document.createElement("script");
    script.src = "https://checkout.tabby.ai/tabby-promo.js";
    script.async = true;
    if (finalPrice) {
      console.log(finalPrice,'testest');
      script.onload = () => {
        new window.TabbyPromo({
          selector: "#tabby",
          currency:domainCurrencyCode ,
          price: finalPrice,
          installmentsCount: 4,
          lang: "en",
          source: "product",
          publicKey: domainData?.tabby?.public_key,
          merchantCode: domainData?.tabby?.merchant_cod,
        });
      };
    }
    if (document.body) {
      document.body.appendChild(script);
    }

    return () => {
      if (document.body) {
        document.body.removeChild(script);
      }
    };


  }, [finalPrice]);

  // console.log(product, "product");
  /*   const { price } = usePrice(
    data && {
      amount: product.price,
      baseAmount: product.price,
      currencyCode: domainCurrencyCode,
    }
  ); */
  // if (isLoading) return <Loader/>;
  const variations = getVariations(product?.variations);

  /*  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true; */



  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    /*    if (product.enable_stock === 0) {

      setTimeout(() => {
        setAddToCartLoader(false);
      }, 600);

      const item = generateCartItem(product!, attributes);
      addItemToCart(item, quantity);
      toast.success("Added to the cart", {
        //type: "dark",
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (quantity > attributes.variation_details[0].qty_available) {
      toast.error("Product is out of stock", {
        //type: "dark",
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setAddToCartLoader(false);
    } else {
      setTimeout(() => {
        setAddToCartLoader(false);
      }, 600);

      const item = generateCartItem(product!, attributes);
      addItemToCart(item, quantity);
      toast.success("Added to the cart", {
        //type: "dark",
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
 */

    const item = generateCartItem(product!, attributes);
    if (Object.keys(attributes)?.length != 0 && product?.enable_stock == 1) {
      if (quantity <= Math.round(attributes?.variation_details[0]?.qty_available)) {
        addItemToCart(item, quantity);
        // console.log(item,"Item");
        setTimeout(() => {
          setAddToCartLoader(false);
        }, 600);
        // {isAuthorized &&  addItemToServer(item) }
        // toast.success("Added to the cart", {
        //   //type: "dark",
        //   progressClassName: "fancy-progress-bar",
        //   position: width > 768 ? "bottom-right" : "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        // setAddToCartLoader(false);

        // console.log(item, "item")
      } else {
        toast.error("Out of Stock", {
          //type: "dark",
          progressClassName: "fancy-progress-bar",
          position: width > 768 ? "bottom-right" : "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          setAddToCartLoader(false);
        }, 600);
      }

    } else {
      addItemToCart(item, quantity);
      setTimeout(() => {
        setAddToCartLoader(false);
      }, 600);
      // {isAuthorized &&  addItemToServer(item) }
      // toast.success("Added to the cart", {
      //   //type: "dark",
      //   progressClassName: "fancy-progress-bar",
      //   position: width > 768 ? "bottom-right" : "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      // setAddToCartLoader(false);

      // console.log(item, "item")
    }
  }

  function handleAttribute(attribute: any) {
    setAttributes(() => ({
      // ...prev,
      ...attribute,
    }));
  }
  /*   console.log(product, "product");
  console.log(attributes, "attributes");
  console.log(Object.keys(attributes).length, "quantity");
   console.log(product.enable_stock, "stock"); */
  // console.log(product, "product");
  //console.log("attributes", attributes);

  if (Loading) {
    return <Loader />
  }


  return (
    //block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
      {width < 1025 ? (
        isGalleryImg == true ? (
          <Carousel
            pagination={{
              clickable: true,
            }}
            breakpoints={productGalleryCarouselResponsive}
            className="product-gallery"
            buttonClassName="hidden"
          >
            {product?.gallery?.slice(0, 4).map((item: any, index: number) => (
              <SwiperSlide key={`product-gallery-key-${index}`}>
                <div className="col-span-1 transition duration-150  ease-in hover:opacity-90">
                  <img
                    src={
                      item?.original ??
                      "/icons/ignite-default.png"
                    }
                    alt={`${item?.name}--${index}`}
                    className="object-contain w-full "
                    style={{ height: "200px" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <Carousel
            pagination={{
              clickable: true,
            }}
            breakpoints={productGalleryCarouselResponsive}
            className="product-gallery"
            buttonClassName="hidden"
          >
            <SwiperSlide key={`product-gallery-key`}>
              <div className="col-span-5 ">
                <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">

                  <img src={(product?.image?.thumbnail.includes('default.png') || product?.image?.thumbnail === null) ? (
                    product?.gallery[0]?.thumbnail ?? '/icons/ignite-default.png'
                  ) : (product?.image?.thumbnail)} alt="product Image" className="object-contain" />
                  {/* <img src={"/icons/ignite-default.png"} alt="product Image" className="object-cover"/> */}
                </div>
              </div>
            </SwiperSlide>
          </Carousel>
        )
      ) : isGalleryImg == true ? (
        product.gallery && (
          <div className="col-span-5">
            <ImageGallery
              items={product.gallery}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}

            />
          </div>
        )
      ) : (
        /*  <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {product?.gallery?.slice(0, 4).map((item: any, index: number) => (
            <div
              key={index}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              <img
                src={
                  item?.original ??
                  "/assets/placeholder/products/product-gallery.svg"
                }
                alt={`${data?.name}--${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div> */
        <div className="col-span-5 ">
          <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
            {/* <img src={"/icons/ignite-default.png"} className="w-full object-cover" style={{ height: '400px' }} alt="product Image" /> */}
            <img src={(product?.image?.thumbnail.includes('default.png') || product?.image?.thumbnail === null) ? (
              product?.gallery[0]?.thumbnail ?? '/icons/ignite-default.png'
            ) : (product?.image?.thumbnail)} className="w-full object-contain" style={{ height: '400px' }} alt="product Image" />
          </div>
        </div>
      )}

      <div className="col-span-4 pt-8 lg:pt-0">

        <div className="pb-7 mb-7 border-b border-gray-300">

          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {locale === 'ar' && product?.arabic_name ? product?.arabic_name : product?.name}
            {/* {product?.name} */}
          </h2>

          <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
            {product?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: `${product?.description}` }}
              />
            )}
          </p>
          <div className="flex items-center mt-5">
            <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
              {getSymbolFromCurrency(domainCurrencyCode)}{" "}
              {Object.keys(attributes)?.length == 0
                ? Number(product.price).toFixed(2)
                : Number(attributes.sell_price_inc_tax).toFixed(2)}
              {/*  {price} */}
            </div>
            {/*  {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
                {basePrice}
              </span>
            )} */}
          </div>
        </div>

        {product && product.type === "variable" ? (
          <div className="pb-3 border-b border-gray-300 w-fit">
            {Object.keys(variations).map((variation) => {
              return (
                <ProductAttributes
                  key={variation}
                  title={variation}
                  attributes={variations[variation]}
                  active={attributes.value}
                  onClick={handleAttribute}
                  quantity={quantity}
                  enable_stock={product.enable_stock}
                />
              );
            })}
          </div>
        ) : null}
        <div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
          <Counter
            quantity={quantity}
            onIncrement={() => {
              // console.log(quantity, "dslfkjalfskjaslkfjj");
              // if (quantity == 0) {
              //   // alert("out of stock");
              // } else {
              setQuantity((prev) => prev + 1);
              // }
            }}
            onDecrement={() => {
              setQuantity((prev) => (prev !== 1 ? prev - 1 : 1));
              if (product?.enable_stock == 1) {
                if (
                  Object.keys(attributes)?.length != 0 &&
                  quantity <
                  Math.round(attributes.variation_details[0]?.qty_available)
                ) {
                  setIsDisable(false);
                }
              }
            }}
            disableDecrement={quantity === 0}
          // disableIncrement={isDisable}
          />
          {domainData?.is_open === "true" ?
            <Button
              onClick={addToCart}
              variant="slim"
              className={`w-full md:w-6/12 xl:w-80 ${!isSelected && "bg-gray-400 hover:bg-gray-400"
                } `}
              style={
                !isSelected
                  ? { backgroundColor: "bg-gray-400" }
                  : { backgroundColor: domainData.theme_color }
              }
              disabled={!isSelected || isDisable}
              loading={addToCartLoader}
            >
              <span className="py-2 3xl:px-8"> {t("text-add-to-cart")}</span>
            </Button> :
            <p className="font-semibold text-red-600">
              {t('common:close-message')}
            </p>


          }
        </div>
        <div className="py-6">
          <ul className="text-sm space-y-5 pb-1">
            <li>
              <span className="font-semibold text-heading inline-block pe-2">
                SKU:
              </span>
              {attributes.sku}
            </li>

            <li>
              <span className="font-semibold text-heading inline-block pe-2">
                {t("category")}:
              </span>
              {product?.category?.name}
            </li>

            {/*  {data?.tags && Array.isArray(data.tags) && (
              <li className="productTags">
                <span className="font-semibold text-heading inline-block pe-2">
                  Tags:
                </span>
                {data.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={tag.slug}
                    className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
                  >
                    {tag.name}
                    <span className="text-heading">,</span>
                  </Link>
                ))}
              </li>
            )} */}
          </ul>
        </div>
        {domainData?.tabby?.merchant_code && domainData?.tabby?.public_key &&
         <div id="tabby"></div>
        }
       

        {/* <ProductMetaReview data={data} /> */}
      </div>
    </div>
  );
};

export default ProductSingleDetails;
