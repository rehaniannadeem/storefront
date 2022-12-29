import { Order } from "@framework/types";
import http from "@framework/utils/ignite-http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`https://pos-dev.myignite.online/public/connector/api/sell`);
  return data.data[0];
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
    fetchOrder(id)
  );
};
