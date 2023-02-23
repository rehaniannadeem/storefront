import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";
import { useEffect, useState } from "react";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const [_domainData, setDomainData] = useState({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: domainCurrencyCode,
  });
  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      <div className="flex border  rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
        <img
          src={item.image ?? "/assets/placeholder/order-product.svg"}
          width="64"
          height="64"
          className="object-cover"
        />
      </div>
      <h6 className="text-sm ps-3 font-regular text-heading">
        {generateCartItemName(item)}
      </h6>
      <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
        {price}
      </div>
    </div>
  );
};
