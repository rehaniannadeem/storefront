import { IoCheckmarkCircle } from "react-icons/io5";
//import OrderDetails from "@components/order/order-details";
//import { useOrderQuery } from "@framework/order/get-order";
//import { useRouter } from "next/router";
//import usePrice from "@framework/product/use-price";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
//import { Context } from "src/pages/_app";
import { useState } from "react";
import { useCart } from "@contexts/cart/cart.context";

export default function OrderInformation() {
  // const { order }: any = useContext(Context);
  //console.log(order, "order");
  const [orderDetail, setOrderDetail] = useState<any>();
  const [_domainData, setDomainData] = useState({});
  const [isLoading,setIsLoading]=useState(false)
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  // const [isClear, setIsClear] = useState(false);
  // const {
  //   query: { id },
  // } = useRouter();
  const { t } = useTranslation("common");
  //const { isLoading } = useOrderQuery(id?.toString()!);
  const { clearCart } = useCart();
  // const { total } = useCart();
  /*   const { price: total } = usePrice(
    data && {
      amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      currencyCode: "USD",
    }
  ); */

  useEffect(() => {
    setIsLoading(true)
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
    var orderDetail = JSON.parse(localStorage.getItem("orderDetail")!);
    if (orderDetail) {
      setOrderDetail(orderDetail);
    }
    setIsLoading(false)
  }, []);
  useEffect(() => {
    localStorage.removeItem("orderDetail");

    clearCart();
  }, [orderDetail != undefined]);

  //console.log(data);
  console.log(orderDetail, "order detail");
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
        </span>
        {t("text-order-received")}
      </div>
      {orderDetail != undefined ? (
        <ul className="border border-gray-300 bg-gray-50 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
          <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-body font-normal leading-5">
              {t("text-order-number")}:
            </span>
            {orderDetail?.invoice_no}
          </li>
          <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-body font-normal leading-5">
              {t("text-date")}:
            </span>
            {orderDetail?.created_at}
          </li>
          <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-body font-normal leading-5">
              {t("name")}:
            </span>
            {orderDetail?.delivered_to}
          </li>
          <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-body font-normal leading-5">
              {t("text-total")}:
            </span>
            {domainCurrencyCode} {orderDetail.final_total}
          </li>
          <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
            <span className="uppercase text-[11px] block text-body font-normal leading-5">
              {t("text-payment-method")}:
            </span>
            Cash On Delivery
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      {/* <p className="text-heading text-sm md:text-base mb-8">
        {t("text-pay-cash")}
      </p> */}

      {/*  <OrderDetails /> */}
    </div>
  );
}
