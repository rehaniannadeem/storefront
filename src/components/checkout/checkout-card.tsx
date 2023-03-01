// import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
// import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const CheckoutCard = (shipping: any) => {
  const { items, /* total */ isEmpty } = useCart();
  const [domainData, setDomainData] = useState<any>({});
  const [_domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState(shipping.shipping)
  const [check, setCheck] = useState<any>()
  // const [finalTotal, setFinalTotal] = useState(total)
  // setSelectedMethod(check)
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);

  useEffect(() => {
    if (shipping.shipping) {
      setShippingMethod(shipping?.shipping)
    }

  }, [shipping]);

  // const { price: subtotal } = usePrice({
  //   amount: total,
  //   currencyCode: domainCurrencyCode,
  // });


  // useEffect(() => {
  //   let final: any = 0
  //   if (shipping.shipping === 'Free') {
  //     final = total

  //   } else {
  //     if (Object.keys(check).length != 0) {
  //       // if(check?.is_cod ===1){
  //       //   final = (total + Number(check?.cod_rate))
  //       // }else{
  //         final = (total + Number(check?.base_shipping_fee))


  //     } else {
  //       final = total
  //     }
  //     // final = (total + Number(check?.base_shipping_fee))
  //   }
  //   // setFinalTotal(final)
  // }, [check, shipping])
  useEffect(() => {
    if (shipping.shipping === 'Free') {
      setCheck({})
    }else if(shipping.shipping !=undefined){
      setCheck(shipping.shipping[0])
      shipping.setSelectedMethod(shipping.shipping[0])
    }
  }, [shipping.shipping])

    // console.log(shipping, 'shipiing');

  const { t } = useTranslation("common");
  // const checkoutFooter = [
  //   {
  //     id: 1,
  //     name: t("text-sub-total"),
  //     price: total.toFixed(2),
  //     code: domainCurrencyCode
  //   },
  //   {
  //     id: 2,
  //     name: t("text-shipping"),
  //     price: shipping.shipping,
  //     code: domainCurrencyCode
  //     // price: t("text-free"),
  //   },
  //   {
  //     id: 3,
  //     name: t("text-total"),
  //     price: finalTotal.toFixed(2),
  //     code: domainCurrencyCode
  //   },

  // ];

  const handleShippingMethod = (e: any) => {
    //  console.log(e)
    setCheck(e)
    shipping.setSelectedMethod(e)
  }

  return (
    <div className="pt-12 md:pt-0 2xl:ps-4 border-b border-gray-300">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-your-order")}
      </h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>{t("text-product")}</span>
        <span className="ms-auto flex-shrink-0">{t("text-sub-total")}</span>
      </div>
      <div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="text-red-500 lg:px-3 py-4">{t("text-empty-cart")}</p>
        )}
      </div>


      {/* <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
        {t("text-sub-total")}
        {<span className="ms-auto flex-shrink-0">{domainCurrencyCode + " " + total.toFixed(2)}</span>}
      </div > */}
      <div className='border-b flex flex-col  py-4 lg:py-5 text-sm lg:px-3  '>
        <div className="flex items-center  border-gray-300 text-sm  w-full font-semibold  last:border-b-0 last:text-base last:pb-0">
          
          {t("text-shipping-method")}
          {/* {shipping.shipping !== "Free" ? <span className="ms-auto flex-shrink-0"></span> : <span className="ms-auto flex-shrink-0">{shipping.shipping}</span>} */}
        </div>
        <div>
          {shippingMethod !== "Free" && shippingMethod != undefined && shipping.isDelivery == true &&
            shippingMethod?.map((method: any, index: any) => (

              <div
                className="grid grid-cols-12  p-2 justify-between  cursor-pointer my-2 border-4 rounded-md border-solid  hover:bg-gray-200"
                key={index}
                onClick={() => { handleShippingMethod(method) }}
              >

                <div className="w-full col-span-7">
                  <label htmlFor={`methodType-${index}`} className="flex">
                    <input
                      style={{
                        accentColor: domainData.theme_color,
                        cursor: "pointer",
                      }}
                      type="radio"
                      value={method}
                      name="method"
                      id={`methodType-${index}`}
                      className="m-2"
                      onChange={() => { handleShippingMethod(method) }}
                      checked={method === check}
                    />
                    {method?.image &&
                      <span className="self-center"> <img src={method?.image} width={20} height={20} alt="" /></span>

                    }
                    <span className="self-center px-1">{method.name}</span>
                  </label></div>
             
                <div className="flex flex-col justify-end col-span-5">
                <span className="self-center"> {method?.is_cod === 1 ?<span> COD Fee: {Number(method?.cod_rate).toFixed(2)}</span> : null}</span>
                  <span className="self-center">Delivery Fee: {Number(method.base_shipping_fee).toFixed(2)} </span>
                 
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
        {t("text-total")}
        {<span className="ms-auto flex-shrink-0">{domainCurrencyCode + " " + finalTotal.toFixed(2)}</span>}

      </div> */}
      {/* {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id}  />
      ))} */}
    </div>
  );
};

export default CheckoutCard;
