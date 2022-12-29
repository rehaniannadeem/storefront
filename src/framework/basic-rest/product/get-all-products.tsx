import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/ignite-http";
//import axios from "axios";

//import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
/* import { Context } from "src/pages/_app";
import { useContext } from "react"; */
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  /*  const { domain }: any = useContext(Context);
  console.log(domain); */
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  /*   axios({
    method: "get",
    url: `process.env.NEXT_PUBLIC_IGNITE_BACKEND_BASE_URL/API_ENDPOINTS.PRODUCTS`,
    // data: bodyFormData,
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${domain.token}`,
    },
  }); */

  return {
    //data: shuffle(data),
    data: data,
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
