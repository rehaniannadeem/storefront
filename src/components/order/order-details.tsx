//import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
//import { Context } from "src/pages/_app";
import { useCart } from "@contexts/cart/cart.context";

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const [_domainData, setDomainData] = useState({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: domainCurrencyCode,
  });
  return (
    <tr
      className="border-b font-normal border-gray-300 last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string }> = ({
  className = "pt-10 lg:pt-12",
}) => {
  const { items, total } = useCart();
  // const [cardProduct, setCardProduct] = useState(items[0]);
  // const { order } = useContext(Context);
  // const [orderDetail, setOrderDetail] = useState(order);
  const [_domainData, setDomainData] = useState({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);
  const {
    // query: { id },
  } = useRouter();
  const { t } = useTranslation("common");
  // const { data, isLoading } = useOrderQuery(id?.toString()!);

  const { price: subtotal } = usePrice(
    items && {
      amount: total,
      currencyCode: domainCurrencyCode,
    }
  );
  /* 
  const { price: total } = usePrice(
    data && {
      amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      currencyCode: "USD",
    }
  );
  const { price: shipping } = usePrice(
    data && {
      amount: data.shipping_fee,
      currencyCode: "USD",
    }
  ); */

  return (
    <div className={className}>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-order-details")}:
      </h2>
      <table className="w-full text-heading font-semibold text-sm lg:text-base">
        <thead>
          <tr>
            <th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
              {t("text-product")}
            </th>
            <th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
              {t("text-total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((product: any, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>

        <tfoot>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-sub-total")}:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          {/*   <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-shipping")}:</td>
            <td className="p-4">
                {shipping} 
              <span className="text-[13px] font-normal ps-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr> */}
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-payment-method")}:</td>
            <td className="p-4">Cash</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-total")}:</td>
            <td className="p-4"> {subtotal}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-note")}:</td>
            <td className="p-4">new order</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
