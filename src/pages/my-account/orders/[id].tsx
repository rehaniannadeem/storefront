import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
//import OrderDetails from "@components/order/order-details";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import usePrice from "@framework/product/use-price";
//import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
//import { Context } from "src/pages/_app";
//import { useCart } from "@contexts/cart/cart.context";
import axios from "axios";
import { useUI } from "@contexts/ui.context";
import Loader from "@components/ui/loaders/loader/loader";
import Button from "@components/ui/button";
import Image from "next/image";
import cardImg from '../../../components/assets/cardImg.jpg';
/* const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIn0.eyJhdWQiOiIzMiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIiwiaWF0IjoxNjY4NTg1MDU4LCJuYmYiOjE2Njg1ODUwNTgsImV4cCI6MTcwMDEyMTA1OCwic3ViIjoiODc1Iiwic2NvcGVzIjpbXX0.ZvK1RxFj6d88z5BIzNgv8yD-oD0agNSORK0pWKx6RpbRiwPUuDKt77tJwxNl6W3szMfvr7m8N3UNqBvjASplPkWvk2YIFTGmHjMl4UxlbqSa-vyqTdtvWUOOBUnPdA27x6B0dkDTe8IK_RFvFSrb9mk_vdmFRQo075mBUbPmt-hBNSCsISRAGYnMm5WRRJ16ec02gFUjnqH61HnnbN3XUEZ7_o1tK4K7Dfj6krrZL6u_4AcJzWUEafQSLZV4enTb35NM1n9nwGjGS_gQYUPPM8mj6de5BD2zDbl5SrruG6Wr2O_gaW4mHSYI7Dr9HPCkUIVh27bjUQmfG84dFyaPqouuk49Hb3jToSi-OjidU2iBjCE9XXdoqZ0CXFGVDdleNB-l0Yd7EeMFjf1iB_tuVzSYITldfA81W5iAXqOzM3QBh3BEa2TMC3z5WGFIhRJy5G_EFcTCxj2u4Q-cV5aT2JUJRy7KTs-2Byaifun3FtzsLe2YX7sNxXxf_inOlXxMnswCh5atHqpsNBbwqzG6snW5JyKr96QeYB5p2Vcfi0fLJgJV94clN0skadnTeY0du3lnyRjVLNp-uckoEBJJIuMv0gLApyo880fzT4i7xFBSk-sFd6MWYMBvxYYHUJPebJyikxqE26lnYD64l3l_cwwt3T3wYVvRIFoG7U9W58c"; */

const OrderItemCard = ({ product }: { product: any }) => {
  const [_domainData, setDomainData] = useState<any>({});

  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");

  //console.log(product, "this is product");
  //console.log(product, "this is orderdata");
  //console.log(orderData.product, "this is product");
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);


  const { price: itemTotal }: any = usePrice({
    amount: product.unit_price_inc_tax * product.quantity,
    currencyCode: domainCurrencyCode,
  });

  return (
    <tr
      className="border-b font-normal border-gray-300 last:border-b-0"
      key={product.product.id}
    >
      <td className="p-4">
        {product.product.name} * {product.quantity}
      </td>

      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
export default function OrderPage() {
  const router = useRouter();

  const orderId = router.query.id;

  const [domainData, setDomainData] = useState<any>({});
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const [_productData, setProductData] = useState<any>({});
  const [paymentGateway, setPaymentGateway] = useState<any>([]);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [selectPayment, setSelectPayment] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const {
    isAuthorized,
  } = useUI();

  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation("common");
  //const [subTotal, setSubTotal] = useState<any>();
  const [order, setOrder] = useState<any>({});
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  let production_payment_url = process.env.NEXT_PUBLIC_IGNITE_PRODUCTION_PAYMENT_URL
  const isDisable = Object.keys(selectPayment).length == 0
  const productName = Array.isArray(orderDetail) && orderDetail?.map((product: any) => {
    return product.product.name

  })
  console.log(productName);

  useEffect(() => {
    setIsLoading(true)
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
    var userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData) {
      setUserData(userData);
    }

    const fetchData = () => {
      axios({
        method: "get",
        url: connector_base_url + `/sell/${orderId}`,

        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domainData.token}`,
        },
      })
        .then((response) => {
          setOrderDetail(response.data.data[0]);
          // console.log(">>>>>>>>>>>", response);
          setOrder(response.data.data[0]);
          setOrderDetail(response.data.data[0].sell_lines);
          //setSubTotal(response.data.data[0].total_before_tax);
          /*  console.log(response.data.data[0].total_before_tax, "this is total");
          console.log(subTotal, " total");
          console.log(response.data.data, "order"); */
          setProductData(response.data.data[0].sell_lines[0].product);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    if (router.asPath.includes("my-account") && !isAuthorized) {
      router.push('/')
      //   setTimeout(() => {
      //    setIsLoading(false)
      //  }, 1500);
    } else {
      setIsLoading(false)
    }
  }, []);
  useEffect(() => {

    if (order?.payment_status == "due") {
      axios({
        method: "get",
        url: production_payment_url + `/app/api/payment_gateway/${domainCurrencyCode}`,

        headers: {
          Accept: "Application/json",
          "merchant-uuid": `${domainData.business_location.custom_field3}`,
          // "merchant-uuid": "05113C9C7BD4C",
        },
      })
        .then((response) => {
          console.log(response, "Payment Gateway");
          setPaymentGateway(response.data.data);
        })
        .catch((err) => {
          console.log(err, "Response Error");
        });
    }
  }, [order]);

  const handlePayment = () => {
    const finalTotal = Number(order?.final_total) + Number(order?.shipping_charges)
    setAddToCartLoader(true);
    axios({
      method: "get",
      url: production_payment_url + "/app/api/get_url",
      headers: {
        Accept: "Application/json",
        "merchant-uuid": `${domainData.business_location.custom_field3}`,
        // "merchant-uuid": "05113C9C7BD4C",
      },
      params: {
        order_no: order.id,
        item_name: productName.toString(),
        amount: finalTotal,
        email: userData.email,
        mobile: userData.mobile,
        currency: domainData?.currency?.code,
        method_id: selectPayment.id,
        invoice_id: order.id,
        return_url: `http://${window.location.host}/my-account/orders/${order.id}`,
        //  return_url: "https://www.google.com/",
        cancel_url: `http://${window.location.host}/my-account/orders/${order.id}`,
      },
    })
      .then((response) => {
        // console.log(response, "Payment ");
        if (response.status == 200) {
          // console.log("get_url");

          //  setIsDisabled(false);
          // clearCart();
          window.open(response.data.Url, "_self");
          setAddToCartLoader(false);
        }
        /// setPaymentGateway(response.data.data);
      })
      .catch((err) => {
        console.log(err, "Response Error");
        setAddToCartLoader(false);
      });

  }
  // console.log(order, "order Detail");

  // const { data, isLoading } = useOrderQuery(id?.toString()!);

  /* const { price: subtotal } = usePrice(
    productData && {
      amount: orderDetail.unit_price * orderDetail.quantity,
      currencyCode: domainCurrencyCode,
    }
  ); */
  //console.log(subtotal, "this is total");
  console.log(order, "order Detail");
  // console.log(order);


  if (isLoading) {
    return <Loader />
  }

  return (
    <AccountLayout>
      {/*  <OrderDetails className="p-0" /> */}
      {orderDetail[0] != null ? (
        <>
          <div className="pt-10 lg:pt-12">
            <div className=" inline-flex  md:ml-10  w-full mb-2 ">
              <h2 className="text-lg md:text-xl xl:text-2xl  font-bold text-heading ">
                {t("text-order-details")}:
              </h2>
              <div className="inline-flex  md:ml-10  w-3/5 justify-end">
                {order?.payment_status.toLowerCase() === "due" ?
                  <h2 className="font-bold text-lg rounded-full text-white bg-red-600 p-2 w-fit h-fit">
                    {order.payment_status}
                  </h2> :
                  <h2 className="font-bold text-lg rounded-full text-white bg-green-600 p-2 w-fit h-fit">
                    {order.payment_status}
                  </h2>
                }
                {/* <h2 className="font-bold text-lg rounded-full text-white bg-red-600 p-2 w-fit h-fit">
                {order.payment_status}
              </h2> */}
              </div>
            </div>

            <table className="w-full text-heading font-semibold text-sm lg:text-base">
              <thead>
                <tr>
                  <th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
                    {t("common:order-id")}
                  </th>
                  <th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
                    {order.invoice_no}
                  </th>
                </tr>

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
                {orderDetail?.map((order: any, index: any) => (
                  <OrderItemCard product={order} key={index} />
                ))}

                {/*  <OrderItemCard product={productData} orderData={orderDetail} /> */}
              </tbody>

              <tfoot>
                {/* <tr className="odd:bg-gray-150">
                <td className="p-4 italic">{t("text-sub-total")}:</td>
                <td className="p-4">
                  {domainCurrencyCode} {Math.round(subTotal)}
                </td>
              </tr> */}
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
                  <td className="p-4 italic">{t("common:shipping-fee")}:</td>
                  <td className="p-4"> {domainCurrencyCode} {Number(order?.shipping_charges).toFixed(2)}</td>
                </tr>

                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:date")}:</td>
                  <td className="p-4">{orderDetail[0]?.created_at}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:tracking-info")}:</td>
                  <td className="p-4">{order?.shipping_custom_field_5}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:order-type")}:</td>
                  <td className="p-4">{order?.order_type}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:customer-name")}:</td>
                  <td className="p-4">{order?.delivered_to}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:shipping-address")}:</td>
                  <td className="p-4">{order?.shipping_address}</td>
                </tr>
                {/*  <tr className="odd:bg-gray-150">
                <td className="p-4 italic">{t("common:payment-method")}:</td>
                <td className="p-4">{order.payment_lines[0].method}</td>
              </tr> */}
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("text-note")}:</td>
                  <td className="p-4">{order?.additional_notes}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("common:label-discount")}:</td>
                  <td className="p-4"> {domainCurrencyCode} {Number(order?.discount_amount).toFixed(2)}</td>
                </tr>
                <tr className="odd:bg-gray-150">
                  <td className="p-4 italic">{t("text-total")}:</td>
                  <td className="p-4">
                    {domainCurrencyCode} {(Number(order?.final_total) + Number(order?.shipping_charges)).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

          </div>
          {order?.payment_status == "due" &&
            <div className="flex justify-end">
              <div className="flex justify-end">
                <div className="flex flex-col w-3/6 ">

                  {domainData?.store_payment_methods?.ignitepay === true && paymentGateway?.map((type: any, index: any) => (
                    <div className="grid grid-cols-12 my-2 border-4   rounded-md border-solid p-1 hover:bg-gray-200 "
                      onClick={() => setSelectPayment(type)}
                      key={index}
                    >

                      <div className="col-span-6 flex justify-start">
                        <input
                          style={{
                            accentColor: domainData.theme_color,
                            cursor: "pointer",
                          }}
                          type="radio"
                          id={index}
                          value={type}
                          name="payment-option"
                          className="m-2 "
                          onChange={() => setSelectPayment(type)}
                          checked={type.name === selectPayment.name}
                        />

                        {domainCurrencyCode == "SAR" ? <label className="p-2 flex self-center">{type.name === 'Tabby' ? <div className="flex flex-col "><span className="flex justify-center">{t('common:tabby-payment')} </span>
                          {/* <div>
                            <Image
                              src={cardImg}
                              alt={t("error-heading")}
                              width={800}
                              height={0}
                              className="object-contain"
                            />
                          </div> */}

                        </div> :
                          <div className="flex flex-col"><span className="flex justify-center">{t('common:online-payment')}</span>
                            <div>
                              <Image
                                src={cardImg}
                                alt={t("error-heading")}
                                width={800}
                                height={0}
                                className="object-contain"
                              />
                            </div>

                          </div>}</label>
                          : <label className="p-2 flex self-center">{type.name === 'Paymob' ? <div className="flex flex-col"><span className="flex ml-3">{t('common:online-payment')}</span>  <div>
                            <Image
                              src={cardImg}
                              alt={t("error-heading")}
                              width={800}
                              height={0}
                              className="object-contain"
                            />
                          </div></div> : <div className="flex flex-col"><span className="flex justify-center">{t('common:online-payment')}</span><span className="flex justify-center">({type?.name})</span></div>}</label>
                        }                     {/* <label className="p-2 flex self-center">{t('common:online-payment') + ` (${type?.name})`}</label> */}
                      </div>
                      <div className="inline-flex col-span-6 w-full  justify-end">
                      {type?.name != 'Tap' &&
                          <img
                            className="flex h-14 w-fit self-center"
                            // style={{
                            //   height: "3rem",

                            //   display: "flex",
                            // }}
                            src={type.logo}
                          />

                        }
                      </div>
                    </div>
                  ))}
                  <Button
                    className="w-full "
                    loading={addToCartLoader}
                    disabled={isDisable}
                    style={{
                      backgroundColor: domainData.theme_color,
                      color: "white",
                    }}
                    onClick={handlePayment}
                  >
                    {t("common:button-pay")}
                  </Button>
                </div>
              </div>
            </div>
          }



        </>

      ) : null}
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
