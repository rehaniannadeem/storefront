import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
//import { paginate } from "@utils/paginate";
import Pagination from "./../Pagination";

//import { useUI } from "@contexts/ui.context";
import { Context } from "src/pages/_app";
//import usePrice from "@framework/product/use-price";
//import { classNames } from 'classnames';
//const pageSize = 10;
/* const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIn0.eyJhdWQiOiIzMiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIiwiaWF0IjoxNjY4NTg1MDU4LCJuYmYiOjE2Njg1ODUwNTgsImV4cCI6MTcwMDEyMTA1OCwic3ViIjoiODc1Iiwic2NvcGVzIjpbXX0.ZvK1RxFj6d88z5BIzNgv8yD-oD0agNSORK0pWKx6RpbRiwPUuDKt77tJwxNl6W3szMfvr7m8N3UNqBvjASplPkWvk2YIFTGmHjMl4UxlbqSa-vyqTdtvWUOOBUnPdA27x6B0dkDTe8IK_RFvFSrb9mk_vdmFRQo075mBUbPmt-hBNSCsISRAGYnMm5WRRJ16ec02gFUjnqH61HnnbN3XUEZ7_o1tK4K7Dfj6krrZL6u_4AcJzWUEafQSLZV4enTb35NM1n9nwGjGS_gQYUPPM8mj6de5BD2zDbl5SrruG6Wr2O_gaW4mHSYI7Dr9HPCkUIVh27bjUQmfG84dFyaPqouuk49Hb3jToSi-OjidU2iBjCE9XXdoqZ0CXFGVDdleNB-l0Yd7EeMFjf1iB_tuVzSYITldfA81W5iAXqOzM3QBh3BEa2TMC3z5WGFIhRJy5G_EFcTCxj2u4Q-cV5aT2JUJRy7KTs-2Byaifun3FtzsLe2YX7sNxXxf_inOlXxMnswCh5atHqpsNBbwqzG6snW5JyKr96QeYB5p2Vcfi0fLJgJV94clN0skadnTeY0du3lnyRjVLNp-uckoEBJJIuMv0gLApyo880fzT4i7xFBSk-sFd6MWYMBvxYYHUJPebJyikxqE26lnYD64l3l_cwwt3T3wYVvRIFoG7U9W58c"; */
const OrdersTable: React.FC = () => {
  // const { user }: any = useContext(Context);
  // const { isAuthorized } = useUI();
  const { width } = useWindowSize();
  const { t } = useTranslation("common");
  const { domain }: any = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [userData, _setUserData] = useState(user);
  const [pageSize, _setPageSize] = useState(10);
  const [metaData, setMetaData] = useState<any>({});
  const [domainData, setDomainData] = useState<any>({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [userData, setUserData] = useState<any>({});
  //console.log(userData, "user");

  const fetchData = () => {
    axios({
      method: "get",
      url: "https://pos-dev.myignite.online/public/connector/api/sell",
      params: {
        contact_id: userData.id,
        //deliver_to: "mehboob",
      },

      headers: {
        //"Content-Type": "multipart/form-data",
        "Content-Type": "Application/json",
        Authorization: `Bearer ${domainData.token}`,
      },
    })
      .then((response) => {
        setMetaData(response.data.meta);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
    var user = JSON.parse(localStorage.getItem("userData")!);
    if (user) {
      setUserData(user);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "get",
        url: "https://pos-dev.myignite.online/public/connector/api/sell",
        params: {
          per_page: metaData.total,
          contact_id: userData.id,
          order_by_date: "desc",
          //deliver_to: "mehboob",
        },

        headers: {
          //"Content-Type": "multipart/form-data",
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domainData.token}`,
        },
      })
        .then((response) => {
          setOrders(response.data.data);
          console.log(response.data.data, "order data");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (Object.keys(metaData).length != 0) {
      fetchData();
    }
  }, [metaData]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginate = (items: any, pageNumber: number, pageSize: any) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const paginatePosts = paginate(orders, currentPage, pageSize);
  // console.log(paginatePosts, "paginate");
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-orders")}
      </h2>

      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >
        {width >= 1025 ? (
          paginatePosts.length != 0 ? (
            <table>
              <thead className="text-sm lg:text-base">
                <tr>
                  <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                    {t("text-order")}
                  </th>
                  <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                    {t("text-date")}
                  </th>
                  <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                    {t("text-status")}
                  </th>
                  <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                    {t("text-total")}
                  </th>
                  <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
                    {t("text-actions")}
                  </th>
                </tr>
              </thead>
              {paginatePosts?.map((order: any) => (
                <tbody key={order.id} className="text-sm lg:text-base">
                  <tr className="border-b border-gray-300 last:border-b-0">
                    <td className="px-4 py-5 text-start">
                      <Link
                        href={`/my-account/orders/${order.id}`}
                        className="underline hover:no-underline text-body"
                      >
                        {order.invoice_no}
                      </Link>
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      {order.transaction_date}
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      {order.shipping_status}
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      {domainCurrencyCode} {Math.round(order.final_total)}
                    </td>
                    <td className="text-end px-4 py-5 text-heading">
                      <Link href={`/my-account/orders/${order.id}`}>
                        <a
                          style={{ backgroundColor: domain.theme_color }}
                          className="text-sm leading-4 
                        text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                        >
                          {t("button-view")}
                        </a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <div className="text-center ">
              <div role="status">
                <svg
                  className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="black"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
        ) : paginatePosts.length != 0 ? (
          <div className="w-full space-y-4">
            {paginatePosts?.map((order: any, index) => (
              <ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
                <li className="flex items-center justify-between" key={index}>
                  {t("text-order")}
                  <span className="font-normal">
                    <Link
                      href={`/my-account/orders/${order.id}`}
                      className="underline hover:no-underline text-body"
                    >
                      {order.invoice_no}
                    </Link>
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  {t("text-date")}
                  <span className="font-normal">{order.created_at}</span>
                </li>
                <li className="flex items-center justify-between">
                  {t("text-status")}
                  <span className="font-normal"> {order.shipping_status}</span>
                </li>
                <li className="flex items-center justify-between">
                  {t("text-total")}
                  <span className="font-normal">
                    {" "}
                    {domainCurrencyCode} {Math.round(order.final_total)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  {t("text-actions")}
                  <span className="font-normal">
                    <Link href={`/my-account/orders/${order.id}`}>
                      <a
                        style={{ backgroundColor: domain.theme_color }}
                        className="text-sm leading-4 
                        text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                      >
                        {t("button-view")}
                      </a>
                    </Link>
                  </span>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div role="status">
              <svg
                className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="black"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className=" mt-1">
          {
            <Pagination
              items={orders.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          }
        </div>
      </motion.div>
    </>
  );
};

export default OrdersTable;
