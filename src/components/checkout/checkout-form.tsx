import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
//import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
//import { Context } from "src/pages/_app";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "@contexts/cart/cart.context";
import DeliveryAddress from "src/components/checkout/deliveryAddress";
import CheckoutCard from "./checkout-card";
import Container from "@components/ui/container";
import { useUI } from "@contexts/ui.context";
import { toast } from "react-toastify";

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const { items, total } = useCart();

  // const { setOrder } = useContext(Context);

  const [userData, setUserData] = useState<any>({});
  // console.log(userData, "user data");
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [products, _setProducts] = useState(items);
  const [placeOrder, _setPlaceOrder] = useState([{}]);
  const [domainData, setDomainData] = useState<any>({});
  const [domainToken, setDomainToken] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [checked, setChecked] = useState<any>("Pickup");
  const [orderType, setOrderType] = useState([]);
  const { t } = useTranslation();
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  //const [_isDisabled, setIsDisabled] = useState<boolean>(false);
  const [paymentGateway, setPaymentGateway] = useState<any>([]);
  const { mutate: updateUser } = useCheckoutMutation();
  const [user, setUser] = useState(false);
  const [selectPayment, setSelectPayment] = useState<any>({
    id: 1,
    name: "cash On Delivery",
  });
  const [host, setHost] = useState("");
  const [_orderResponse, setOrderResponse] = useState<any>();
  const [productsName, _setProductsName] = useState<any>([]);
  const { isAuthorized, openModal, setModalView } = useUI();
  const { clearCart } = useCart();
  let connector_base_url=process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  // let host = window.location.host;
  // console.log(">>>>>>>>>>>", `https://${host}/my-account/orders/244582`);
  // console.log(">>>>>>>>>>>", selectPayment);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  useEffect(() => {
    setUser(isAuthorized);
  }, [isAuthorized]);
  useEffect(() => {
    setHost(window.location.host);

    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
      setOrderType(domainData.order_type);
    }

    setDomainToken(domainData.token);

    var userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData) {
      setUserData(userData);
    }
    {
      products.map(
        (item, index) => (
          (placeOrder[index] = {
            productDescription: null,
            product_id: item.slug,
            variation_id: item.attributes.id,
            quantity: item.quantity,
            name: item.name,
            unit_price: item.attributes.default_sell_price,
            sell_price_inc_tax: item.attributes.sell_price_inc_tax,
            tax_id: item.tax_id,
            unit_tax:
              item.attributes.sell_price_inc_tax -
              item.attributes.default_sell_price,
          }),
          (productsName[index] = item.name)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (Object.keys(domainData).length != 0) {
      axios({
        method: "get",
        url: `http://wallet31.myignite.online/app/api/payment_gateway/${domainData.currency.code}`,

        headers: {
          Accept: "Application/json",
          "merchant-uuid": `${domainData.business_location.custom_field3}`,
          // "merchant-uuid": "05113C9C7BD4C",
        },
      })
        .then((response) => {
          // console.log(response, "Payment Gateway");
          setPaymentGateway(response.data.data);
        })
        .catch((err) => {
          console.log(err, "Response Error");
        });
    }
  }, [domainData]);

  useEffect(() => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setMobileNumber(userData.mobile);
    setEmail(userData.email);
  }, [userData]);
  const get_url = (response: any) => {
    axios({
      method: "get",
      url: "https://wallet31.myignite.online/app/api/get_url",
      headers: {
        Accept: "Application/json",
        "merchant-uuid": `${domainData.business_location.custom_field3}`,
        // "merchant-uuid": "05113C9C7BD4C",
      },
      params: {
        order_no: response.id,
        item_name: productsName.toString(),
        amount: response.total_before_tax,
        email: userData.email,
        currency: domainData.currency.code,
        method_id: selectPayment.id,
        invoice_id: response.invoice_no,
        return_url: `http://${host}/my-account/orders/${response.id}`,
        //  return_url: "https://www.google.com/",
        cancel_url: `http://${host}/my-account/orders/${response.id}`,
      },
    })
      .then((response) => {
        console.log(response.data.Url, "Payment ");
        if (response.status == 200) {
          console.log("get_url");
          setAddToCartLoader(false);
          //  setIsDisabled(false);
          clearCart();
          window.open(response.data.Url, "_self");
        }
        /// setPaymentGateway(response.data.data);
      })
      .catch((err) => {
        console.log(err, "Response Error");
        setAddToCartLoader(false);
      });
  };
  async function onSubmit(input: CheckoutInputType) {
    setAddToCartLoader(true);
    axios({
      method: "post",
      url:connector_base_url+"/sell",

      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${domainToken}`,
      },
      data: {
        sells: [
          {
            sale_note: additionalNote,
            shipping_status: "pending",
            status: "final",
            shipping_address: address,
            order_type: checked,
            location_id: domainData.location_id,
            contact_id: userData.id,
            delivered_to: firstName + " " + lastName,

            //payments: "",
            /*   payments: [
              {
                amount: total,
                method: selectPayment.name,
                card_type: "",
              },
            ], */
            order_source: "storefront",
            total_before_tax: total,
            products: placeOrder,
          },
        ],
      },
    })
      .then((response) => {
        console.log(response, "this is response");
        if (response.data[0].original) {
          toast.error(response.data[0].original.error.message);
          setAddToCartLoader(false);
        } else {
          setOrderResponse(response.data[0]);
          localStorage.setItem("orderDetail", JSON.stringify(response.data[0]));

          if (response.status == 200) {
            if (selectPayment.name == "cash On Delivery") {
              Router.push(ROUTES.ORDER);
            } else {
              get_url(response.data[0]);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err, "error");
        setAddToCartLoader(false);
      });

    updateUser(input);
  }

  return (
    <Container>
      <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
        <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
          {user ? (
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="w-full mx-auto flex flex-col justify-center "
              noValidate
            >
              <div className=" my-3">
                <h2 className="font-bold">{t("forms:delivery-option")}</h2>
                {orderType?.map((type: any, index: any) => (
                  // console.log(">>>>>>>>>>>", index),
                  <div className="flex my-2 border-4 rounded-md border-solid p-1 hover:bg-gray-200">
                    <input
                      style={{
                        accentColor: domainData.theme_color,
                        cursor: "pointer",
                      }}
                      type="radio"
                      value={type}
                      name="option"
                      id={index}
                      className="m-2 "
                      onChange={(e) => setChecked(e.target.value)}
                      checked={type == checked}
                    />
                    <label>{type}</label>
                  </div>
                ))}
              </div>

              {checked === "Delivery" ? (
                <div className="flex flex-col space-y-4 lg:space-y-5">
                  <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                    {t("text-shipping-address")}
                  </h2>
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <Input
                      labelKey="forms:label-first-name"
                      {...register("firstName", {
                        required: "forms:first-name-required",
                      })}
                      errorKey={errors.firstName?.message}
                      variant="solid"
                      className="w-full lg:w-1/2 "
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <Input
                      labelKey="forms:label-last-name"
                      {...register("lastName", {
                        required: "forms:last-name-required",
                      })}
                      errorKey={errors.lastName?.message}
                      variant="solid"
                      className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  {/*  <Input
              labelKey="forms:label-address"
              {...register("address", {
                required: "forms:address-required",
              })}
              errorKey={errors.address?.message}
              variant="solid"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            /> */}
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <Input
                      type="tel"
                      labelKey="forms:label-phone"
                      {...register("phone", {
                        required: "forms:phone-required",
                      })}
                      errorKey={errors.phone?.message}
                      variant="solid"
                      className="w-full lg:w-1/2 "
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                      }}
                    />

                    <Input
                      type="email"
                      labelKey="forms:label-email-star"
                      {...register("email", {
                        required: "forms:email-required",
                        pattern: {
                          value:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "forms:email-error",
                        },
                      })}
                      errorKey={errors.email?.message}
                      variant="solid"
                      className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  {/*   <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register("city")}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-postcode"
              {...register("zipCode")}
              type="number"
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div> 
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>*/}
                  <TextArea
                    labelKey="forms:label-order-notes"
                    {...register("note")}
                    placeholderKey="forms:placeholder-order-notes"
                    className="relative pt-3 xl:pt-6"
                    value={additionalNote}
                    onChange={(e) => {
                      setAdditionalNote(e.target.value);
                    }}
                  />
                  <div>
                    <DeliveryAddress setAddress={setAddress} />
                  </div>
                </div>
              ) : null}

              {/* <div className="flex mt-2 w-full border-2 border-solid p-1 rounded">
          <input
            style={{ accentColor: "black", padding: "10px" }}
            type="radio"
            name="payment type"
            className="m-2"
          />
          <label>Cash On Delivery</label>
        </div> */}
            </form>
          ) : (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className=" text-base font-bold">
                {" "}
                <button
                  style={{ textDecoration: "underline" }}
                  className="text-heading"
                  type="button"
                  onClick={handleLogin}
                >
                  {t("forms:login")}
                </button>{" "}
              </strong>
              <span className="block sm:inline text-base ">
                {" "}
                {t("forms:place-order")}
              </span>
            </div>
          )}
        </div>
        <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
          <CheckoutCard />
          {paymentGateway && (
            <div className=" my-3 p-2 ">
              <h2 className="font-bold p-1">{t("forms:payment-method")}</h2>
              <div className="flex my-2 border-4 rounded-md border-solid p-1 h-16 hover:bg-gray-200 ">
                <input
                  style={{
                    accentColor: domainData.theme_color,
                    cursor: "pointer",
                  }}
                  type="radio"
                  value="cash On Delivery"
                  name="payment-option"
                  className="m-2 "
                  onChange={() =>
                    setSelectPayment({ id: 1, name: "cash On Delivery" })
                  }
                  checked={"cash On Delivery" == selectPayment.name}
                />

                <label className="p-2">Cash On Delivery</label>
              </div>
              {paymentGateway?.map((type: any, index: any) => (
                <div className="flex my-2 border-4 h-16  rounded-md border-solid p-1 hover:bg-gray-200 ">
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
                    //checked={(type.name = selectPayment.name)}
                  />

                  <label className="p-2">{type.name}</label>

                  <div className="  inline-flex  md:ml-10  w-full  justify-end">
                    <img
                      className="w-2/5"
                      style={{
                        height: "3rem",

                        display: "flex",
                      }}
                      src={type.logo}
                    />
                  </div>
                </div>
              ))}
              <div className="flex w-full p-3">
                <Button
                  className="w-full "
                  loading={addToCartLoader}
                  disabled={items.length <= 0 ? true : false}
                  style={{
                    backgroundColor: domainData.theme_color,
                    color: "white",
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  {t("common:button-place-order")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CheckoutForm;
