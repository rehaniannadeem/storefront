import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const { t } = useTranslation("common");
  
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  // const { clearCart } = useCart();
  const { closeCart,isAuthorized } = useUI();
  const { items, total, isEmpty } = useCart();
  const [domainData, setDomainData] = useState<any>({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState<any>({});
  const[cartId,setCartId]=useState()
  /*   const clearCart = () => {
    localStorage.removeItem("store-front-cart");
  }; */
  console.log(items, "items");
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
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: domainCurrencyCode,
  });
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
        id:cartId,
         shipping_status: "pending", 
         final_amount: total,
         cart_detail:item
      },

    })
      .then((response) => {
        console.log(response.data, 'response server');
        if(response?.data?.success){
   
        }else{
         
        }
      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
  useEffect(()=>{
    if(isAuthorized){
      addItemToServer(items)
    }
  
  },[items])
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
        <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
          {t("text-shopping-cart")}
        </h2>
        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeCart}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>
      {!isEmpty ? (
        <Scrollbar className="cart-scrollbar w-full flex-grow">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          variants={fadeInOut(0.25)}
          className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
        >
          <EmptyCart />
          <h3 className="text-lg text-heading font-bold pt-8">
            {t("text-empty-cart")}
          </h3>
        </motion.div>
      )}

      <div
        className="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7"
        onClick={closeCart}
      >
        {/*    <button className="w-full pe-5 -mt-0.5 py-0.5" onClick={clearCart}>
          {t("clear-cart")}
        </button> */}

        <Link href={isEmpty === false ? ROUTES.CHECKOUT : ""}>
          <a
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center  rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
              {
                "cursor-not-allowed bg-gray-400 hover:bg-gray-400": isEmpty,
              }
            )}
            style={
              isEmpty
                ? { backgroundColor: "bg-gray-400" }
                : { backgroundColor: domainData.theme_color }
            }
          >
            <span className="w-full pe-5 -mt-0.5 py-0.5">
              {t("text-proceed-to-checkout")}
            </span>
            <span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
              <span className="border-s border-white pe-5 py-0.5" />
              {cartTotal}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}
