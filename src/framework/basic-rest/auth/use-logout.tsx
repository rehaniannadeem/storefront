import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import axios from "axios";
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
const deleteItem = () => {
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  var domainData = JSON.parse(localStorage.getItem("domainData")!);
  let token=domainData.token
  let cartId=localStorage.getItem("cart_id")
    axios({
      method: "get",
      url: connector_base_url + "/abandonedcart/delete/"+cartId,
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      // data: {
      //   contact_id: userData.id,
      //    shipping_status: "pending", 
      //    final_amount: item?.attributes.sell_price_inc_tax,
      //    cart_detail:[item]
      // },

    })
      .then((response) => {
        console.log(response, 'deletes response ');
       
      })
      .catch((err) => {
        console.log(err, "Response Error");

      });
  }
export const useLogoutMutation = () => {
  const { clearCart } = useCart();
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove("auth_token");
      unauthorize();
      clearCart();
      deleteItem()
      Router.push("/");
      localStorage.removeItem("userData");
      localStorage.removeItem("cart_id");
      // window.location.reload();
    },
    onError: (data) => {
      console.log(data, "logout error response");
    },
  });
};
