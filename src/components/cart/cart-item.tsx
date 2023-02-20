import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
//import usePrice from "@framework/product/use-price";
import { ROUTES } from "@utils/routes";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
 // const urlName = item.name.replace(/\s+/g, "-");
  const { t } = useTranslation("common");
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();
  const [_domainData, setDomainData] = useState({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");


  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);
  /*  const { price } = usePrice({
    amount: item.price,
    currencyCode: domainCurrencyCode,
  });
  const { price: totalPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: domainCurrencyCode,
  }); */

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
        <Image
          src={item?.image ?? "/assets/placeholder/cart-item.svg"}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || "Product Image"}
          className="bg-gray-300 object-cover"
        />
        <div
          className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <Link
          href={`${ROUTES.PRODUCTS}/${item?.name}`}
          className="truncate text-sm text-heading mb-1.5 -mt-1"
        >
          {generateCartItemName(item)}
        </Link>
        <span className="text-sm text-gray-400 mb-2.5">
          {t("text-unit-price")} : &nbsp;
          {getSymbolFromCurrency(domainCurrencyCode)}
          {Math.round(item.attributes.sell_price_inc_tax)}
          {/* {price} */}
        </span>

        <div className="flex items-end justify-between">
          <Counter
            quantity={item.quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.id)}
            variant="dark"
          />
          <span className="font-semibold p-1 text-sm md:text-base text-heading leading-5">
            {getSymbolFromCurrency(domainCurrencyCode)}
            {Math.round(item.itemTotal)}
            {/*   {totalPrice} */}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
