import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
//import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
//import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import getSymbolFromCurrency from "currency-symbol-map";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
    isAuthorized
  } = useUI();
  // console.log(isAuthorized,'autho');
  const { items,total} = useCart();
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  const router = useRouter();
  const {locale}=useRouter()
    const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string | any }>(
    {}
  );
  //const [attributes, setAttributes] = useState<any>();
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [domainData, setDomainData] = useState<any>({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState<any>({});
  const[cartId,setCartId]=useState()
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
    setToken(domainData.token);
    var userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData) {
      setUserData(userData);
    }
    let cartId:any=localStorage.getItem("cart_id")
    setCartId(cartId)
  }, []);
  useEffect(() => {
    if (data?.enable_stock == 1) {
     
      if (
        Object.keys(attributes).length != 0) {
        
        if (quantity<=Math.round(attributes?.variation_details[0]?.qty_available) ) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }
    }
  }, [quantity]);
  useEffect(() => {
    {
      Object.keys(attributes).length != 0
        ? setIsSelected(true)
        : setIsSelected(false);
    }
    if (Object.keys(attributes).length != 0 && data.enable_stock == 1) {
      if (attributes?.variation_details[0]?.qty_available <= 0) {
        setQuantity(0);
        // setIsDisable(true);
        setIsSelected(false);
      }
    }
  }, [attributes]);
  useEffect(() => {
    if (Object.keys(data).length != 0) {
      if (data.variations.length == 1) {
        setAttributes(data?.variations[0]);
      }
    }
  }, [data]);
  const variations = getVariations(data.variations);
  const { image, name, description } = data;

  //let urlName = name.replace(/\s+/g, "-");

  //const isSelected = Object.keys(attributes).length == 0 ? false : true;
  /*   const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes.value) &&
      Object.keys(variations).every((variation) =>
        attributes.value.hasOwnProperty(variation)
      )
    : true; */

  /*   const { price, basePrice, discount } = usePrice({
    // amount: itemPrice,
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: domainCurrencyCode,
  }); */

  /* function addToCart() {

    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      setViewCartBtn(true);
    }, 600);
    const item = generateCartItem(data!, attributes);

    addItemToCart(item, quantity);
    console.log(item, "item");
  }
 */
  const updateItemToServer = (item:any) => {
    axios({
      method: "post",
      url: connector_base_url + "/abandonedcart/store",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        contact_id: userData.id,
        id:cartId,
         shipping_status: "pending", 
         final_amount: total,
         cart_detail:item
      },

    })
      .then((response) => {
        console.log(response.data, 'response server');
        if(response?.data?.success){
          // localStorage.setItem("cart_id",response.data.data.id)
          toast.success("Added to the cart")

          setAddToCartLoader(false);
        }else{
          toast.error("Something went wrong")
          setAddToCartLoader(false);
        }


      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
  const addItemToServer = (item:any) => {
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
         cart_detail:item
      },

    })
      .then((response) => {
        console.log(response.data, 'response server');
        if(response?.data?.success){
          localStorage.setItem("cart_id",response.data.data.id)
          setCartId(response.data.data.id)
          toast.success("Added to the cart")
          setAddToCartLoader(false);
        }else{
          toast.error("Something went wrong")
          setAddToCartLoader(false);
        }


      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
  // console.log(cartId);
  
  useEffect(()=>{
    if(isAuthorized && token){
      if(cartId){
        updateItemToServer(items)
      }else{
        addItemToServer(items)
      }
      
    }
  
  },[items])

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting

    setAddToCartLoader(true);
    /*  if (data.enable_stock === 0) {
      setTimeout(() => {
        setAddToCartLoader(false);
        setViewCartBtn(true);
      }, 600);

      const item = generateCartItem(data!, attributes);
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
        setViewCartBtn(true);
      }, 600);

      const item = generateCartItem(data!, attributes);
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
    } */
    const item = generateCartItem(data!, attributes);
    if (Object.keys(attributes).length != 0 && data.enable_stock == 1) {
      if(quantity<=Math.round(attributes?.variation_details[0]?.qty_available)){
        // {isAuthorized &&  addItemToServer(item) }
        
       
        addItemToCart(item, quantity);
        
        setTimeout(() => {
          setAddToCartLoader(false);
        }, 600);
        // toast.success("Added to the cart", {
        //   //type: "dark",
        //   progressClassName: "fancy-progress-bar",
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        setViewCartBtn(true);
        // setAddToCartLoader(false);
    
        // console.log(item, "item")
      }else{
        toast.error("Out of Stock", {
          //type: "dark",
          progressClassName: "fancy-progress-bar",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setAddToCartLoader(false);
      }
    }else{
      addItemToCart(item, quantity);
      
   
      // {isAuthorized &&  addItemToServer(item) }
      // toast.success("Added to the cart", {
      //   //type: "dark",
      //   progressClassName: "fancy-progress-bar",
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      setViewCartBtn(true);
      // setAddToCartLoader(false);
  
      // console.log(item, "item")
      setTimeout(() => {
        setAddToCartLoader(false);
      }, 600);
      // setAddToCartLoader(false);
    }
  }

  function navigateToProductPage() {
    //console.log('>>>>>>>>>>>',`${ROUTES.PRODUCTS}/${name} `)
    closeModal();
    router.push(`${ROUTES.PRODUCTS}/${name}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes(() => ({
      //...prev,
      ...attribute,
    }));
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }
  // console.log( "attributes");

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden ">
          <img
            src={
              image?.original ??
              "/icons/ignite-default.png"
            }
            alt={name}
            className="lg:object-contain md:object-contain sm:object-contain lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
              {locale==='ar' && data?.arabic_name ? data?.arabic_name : data?.name}
                {/* {name} */}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {description && (
                <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
              )}
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {getSymbolFromCurrency(domainCurrencyCode)}{" "}
                {Object.keys(attributes).length == 0
                  ? Number(data?.price).toFixed(2)
                  : Number(attributes?.sell_price_inc_tax).toFixed(2)}
              </div>
              {/*   {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )} */}
            </div>
          </div>
          {data && data.type === "variable"
            ? Object.keys(variations).map((variation) => {
                return (
                  <ProductAttributes
                    key={`popup-attribute-key${variation}`}
                    title={variation}
                    attributes={variations[variation]}
                    active={attributes.value}
                    onClick={handleAttribute}
                    quantity={quantity}
                    enable_stock={data.enable_stock}
                  />
                );
              })
            : null}

          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
              <Counter
                quantity={quantity}
                onIncrement={() => {
                  if (quantity == 0) {
                    alert("out of stock");
                  } else {
                    setQuantity((prev) => prev + 1);
                  }
                }}
                onDecrement={() => {
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1));
                  if (data.enable_stock == 1) {
                    if (
                      Object.keys(attributes).length != 0 &&
                      quantity <
                        Math.round(
                          attributes.variation_details[0].qty_available
                        )
                    ) {
                      setIsDisable(false);
                    }
                  }
                }}
                disableDecrement={quantity === 0}
               // disableIncrement={isDisable}
              />
              {domainData?.is_open==="true"?
              <Button
                onClick={addToCart}
                variant="flat"
                className={`w-full h-11 md:h-12 px-1.5 ${
                  !isSelected && "bg-gray-400 hover:bg-gray-400"
                }`}
                style={
                  !isSelected
                    ? { backgroundColor: "bg-gray-400" }
                    : { backgroundColor: domainData.theme_color }
                }
                disabled={!isSelected || isDisable}
                loading={addToCartLoader}
              >
                {t("text-add-to-cart")}
              </Button>:
              <p className="font-semibold text-red-600">
               { t('common:close-message')}
              </p>
}
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t("text-view-cart")}
              </button>
            )}

            <Button
              onClick={navigateToProductPage}
              variant="flat"
              className="w-full h-11 md:h-12"
              style={{ backgroundColor: domainData.theme_color }}
            >
              {t("text-view-details")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
