import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/ignite-http";
import Cookies from "js-cookie";
import Router from "next/router";
import { useMutation } from "react-query";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  // return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    ok: true,
    message: "Logout Successful!",
  };
}
export const useLogoutMutation = () => {
  const { clearCart } = useCart();
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove("auth_token");
      unauthorize();
      clearCart();
      Router.push("/");
      localStorage.removeItem("userData");
      // window.location.reload();
    },
    onError: (data) => {
      console.log(data, "logout error response");
    },
  });
};
