import CartIcon from "@components/icons/cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { useContext, useEffect, useState } from "react";
import { Context } from "./../../pages/_app";

const CartButton = () => {
  const { openCart } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    return openCart();
  }
  const { domain }: any = useContext(Context);
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    setBgColor(domain.theme_color);
  }, [domain]);
  return (
    <div>
      {domain ? (
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
          onClick={handleCartOpen}
          aria-label="cart-button"
        >
          <CartIcon />
          <span
            className={`cart-counter-badge flex items-center justify-center  text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold`}
            style={{ backgroundColor: bgColor }}
          >
            {totalItems}
          </span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
          onClick={handleCartOpen}
          aria-label="cart-button"
        >
          <CartIcon />
          <span
            className={`cart-counter-badge flex items-center justify-center bg-heading  text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold`}
          >
            {totalItems}
          </span>
        </button>
      )}
    </div>
  );
};

export default CartButton;
