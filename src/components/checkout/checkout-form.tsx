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
  // console.log("item",items);

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
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [paymentGateway, setPaymentGateway] = useState<any>([]);
  const { mutate: updateUser } = useCheckoutMutation();
  const [user, setUser] = useState(false);
  const [selectPayment, setSelectPayment] = useState<any>({});
  const [isDelivery,setIsDelivery]=useState(true)
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
  const [host, setHost] = useState("");
  const [_orderResponse, setOrderResponse] = useState<any>();
  const [productsName, _setProductsName] = useState<any>([]);
  const[shippingFee,setShippingFee]=useState<any>()
  // const[city,setCity]=useState<any>("")
  // const[country,setCountry]=useState<any>("")
  const [location, setLocation] = useState<any>({
    city: "",
    country: ""
  })
  const { isAuthorized, openModal, setModalView } = useUI();
  const [shipping, setShipping] = useState<string>("Free")
  // const [isCity,setIsCity]=useState(false)
  // const [isCountry,setIsCountry]=useState(false)
  const [selectedMethod, setSelectedMethod] = useState<any>({})
  const [finalTotal, setFinalTotal] = useState(total)
  const { clearCart } = useCart();
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  let production_payment_url = process.env.NEXT_PUBLIC_IGNITE_PRODUCTION_PAYMENT_URL

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

  useEffect(()=>{
    if(checked==="Delivery"){
      if(Object.keys(selectPayment).length!=0 && Object.keys(selectedMethod).length!=0){
        setIsDisabled(false)
      }else{
        setIsDisabled(true)
      }
    }
  
  },[selectPayment])

  useEffect(() => {
    if (isAuthorized === false || items.length <= 0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [items])
  useEffect(() => {
    setSelectPayment({})
    // if (selectedMethod) {
    //   // setIsDisabled(false)
    //   if (shipping === "Free") {
    //     setFinalTotal(total)
    //   } else {
    //     let newTotal = total + Number(selectedMethod?.base_shipping_fee)
    //     setFinalTotal(newTotal)
    //   }
    // }
  }, [selectedMethod])
  useEffect(() => {
    // setSelectPayment({})
    if (Object.keys(selectPayment).length!=0 && Object.keys(selectedMethod).length!=0) {
      // setIsDisabled(false)
      if (shipping === "Free") {
        setFinalTotal(total)
      } else {
        if(selectPayment.name == "cash On Delivery"){
          let newTotal = total + Number(selectedMethod?.cod_rate)
          setFinalTotal(newTotal)
          setShippingFee(Number(selectedMethod?.cod_rate))
        }else if(selectPayment.name){
          let newTotal = total + Number(selectedMethod?.base_shipping_fee)
          setFinalTotal(newTotal)
          setShippingFee(Number(selectedMethod?.base_shipping_fee))
        }
       
      }
    }
  }, [selectPayment])
  // console.log(finalTotal,"finaltotal");
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData?.currency?.code);
  }, []);

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
            tax_rate_id: item.tax_id,
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
    let newCity = location?.city.toLowerCase()
    let newCountry = location?.country.toLowerCase()
    if (newCity && newCountry) {

      axios({
        method: "get",
        url: connector_base_url + "/shipping-methods",
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${domainToken}`,
          // "merchant-uuid": `${domainData.business_location.custom_field3}`,
          // "merchant-uuid": "05113C9C7BD4C",
        },
        params: {
          country: newCountry,
          city: newCity
        },
      })
        .then((response) => {
          //  console.log(response,'this is response');
          setShipping(response?.data?.data)
          if (response?.data.success === false) {
            setIsDelivery(false)
            toast.error(response.data.message)
          }else{
            setIsDelivery(true)
          }

        })
        .catch((err) => {
          console.log(err, "Response Error");
          setAddToCartLoader(false);
        });
      // setIsDisabled(false)

    }
  }, [location.city,location.country])

  useEffect(() => {
    if (Object.keys(domainData).length != 0) {
      axios({
        method: "get",
        url: production_payment_url+ `/app/api/payment_gateway/${domainData?.currency?.code}`,

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
  }, [domainData]);

  useEffect(() => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setMobileNumber(userData.mobile);
    setEmail(userData.email);
  }, [userData]);
  useEffect(()=>{
    if(checked==="Pickup"){
      setSelectPayment({
        id: 1,
        name: "cash On Delivery",
      })
    }else{
      setSelectPayment({
        
      })
    }
  },[checked])
  const get_url = (response: any) => {
    // console.log(response,'treu response');

    axios({
      method: "get",
      url:production_payment_url+ "/app/api/get_url",
      headers: {
        Accept: "Application/json",
        "merchant-uuid": `${domainData.business_location.custom_field3}`,
        // "merchant-uuid": "05113C9C7BD4C",
      },
      params: {
        order_no: response.id,
        item_name: productsName.toString(),
        amount: finalTotal,
        email: userData.email,
        currency: domainData?.currency?.code,
        method_id: selectPayment.id,
        invoice_id: response.id,
        return_url: `http://${host}/my-account/orders/${response.id}`,
        //  return_url: "https://www.google.com/",
        cancel_url: `http://${host}/my-account/orders/${response.id}`,
      },
    })
      .then((response) => {
        // console.log(response, "Payment ");
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
    let shippingCharges = 0
    let shippingMethod = ""
    if (shipping === "Free") {
      shippingCharges = 0
      shippingMethod = ""
    } else {
      if (selectPayment.name == "cash On Delivery") {
        shippingCharges = Number(selectedMethod?.cod_rate)
        shippingMethod = selectedMethod?.name
      }else{
        shippingCharges = Number(selectedMethod?.base_shipping_fee)
        shippingMethod = selectedMethod?.name
      }

    }
    setAddToCartLoader(true);
    axios({
      method: "post",
      url: connector_base_url + "/sell",
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
            shipping_charges: shippingCharges,
            shipping_custom_field_4: shippingMethod,
            payments: null,
            /*   payments: [
              {
                amount: total,
                method: selectPayment.name,
                card_type: "",
              },
            ], */
            order_source: "storefront",
            total_before_tax: finalTotal,
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
  const handleDeliveryOption = (e: any) => {
    setChecked(e)
    let value = e
    if (value?.toLowerCase() === 'delivery') {
      // setShipping("100")
      setIsDisabled(true)

    } else {
      setShipping("Free")
      setIsDisabled(false)
      setSelectedMethod({})
      // setCity('')
      // setCountry('')
    }

    // console.log(e, 'e value');

  }
  // const handleCity=()=>{
  //   setIsCity(true)

  // }
  // const handleCountry=()=>{
  //   setIsCountry(true)

  // }

  // console.log(selectedMethod, "check");
  //  console.log(shippingFee, "country");

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
                {orderType?.map((type, index) => (
                  <div
                    className="flex cursor-pointer my-2 border-4 rounded-md border-solid p-1 hover:bg-gray-200"
                    key={index}
                    onClick={() => { handleDeliveryOption(type) }}
                  >
                    <label htmlFor={`orderType-${index}`}>
                      <input
                        style={{
                          accentColor: domainData.theme_color,
                          cursor: "pointer",
                        }}
                        type="radio"
                        value={type}
                        name="option"
                        id={`orderType-${index}`}
                        className="m-2"
                        onChange={() => { handleDeliveryOption(type) }}
                        checked={type === checked}
                      />
                      {type}
                    </label>
                  </div>
                ))}
                {/* {orderType?.map((type: any, index: any) => (
                  // console.log(">>>>>>>>>>>", index),
                  <div className="flex my-2 border-4 rounded-md border-solid p-1 hover:bg-gray-200" >
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
                      // onChange={handleDeliveryOption}
                      checked={type == checked}
                    />
                    <label>{type}</label>
                  </div>
                ))} */}
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

                  {/* <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <Input
                      labelKey="forms:label-city"
                       name={"city" }
                      // {...register("city", {
                      //   required: "forms:phone-required",
                      // })}
                      value={city}
                      onChange={(e)=>{setCity(e.target.value)}}
                      variant="solid"
                      className="w-full lg:w-1/2 "
                      onBlur={handleCity}
                      onFocus={()=>setIsCity(false)}
                      
                    />

                    <Input
                      labelKey="forms:label-country"
                      name={"country"}
                      // {...register("city")}
                      value={country}
                      onChange={(e)=>{setCountry(e.target.value)}}
                      variant="solid"
                      className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                      onBlur={handleCountry}
                      onFocus={()=>setIsCountry(false)}
                    />
                  </div> */}
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
                    {/* <label >Address</label> */}
                    <DeliveryAddress setAddress={setAddress} setLocation={setLocation} />
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
          <CheckoutCard shipping={shipping} setSelectedMethod={setSelectedMethod} isDelivery={isDelivery} />
          {paymentGateway && (
            <div className=" my-3 p-2 ">
              <h2 className="font-semibold p-1">{t("forms:payment-method")}</h2>
              {/* <div className="flex my-2 border-4 rounded-md border-solid p-1 h-16 hover:bg-gray-200 ">
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
              </div> */}
              {checked === "Pickup" ? (
                <div>
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
                    <div className="grid grid-cols-12 my-2 border-4   rounded-md border-solid p-1 hover:bg-gray-200 ">
                     <div className="col-span-5">
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
                      </div>
                      <div className="inline-flex col-span-7 w-full  justify-end">
                       
                        <img
                          className="flex h-14 w-fit self-center"
                          // style={{
                          //   height: "3rem",

                          //   display: "flex",
                          // }}
                          src={type.logo}
                        />
                     
                       
                      </div>
                    </div>
                  ))}
                </div>

              ) :
                selectedMethod && selectedMethod.is_cod === 0 ?
                  paymentGateway?.map((type: any, index: any) => (
                    <div className="grid grid-cols-12 my-2 border-4   rounded-md border-solid p-1 hover:bg-gray-200 ">
                     <div className="col-span-5">
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
                      </div>
                      <div className="inline-flex col-span-7 w-full  justify-end">
                       
                        <img
                          className="flex h-14 w-fit self-center"
                          // style={{
                          //   height: "3rem",

                          //   display: "flex",
                          // }}
                          src={type.logo}
                        />
                     
                       
                      </div>
                    </div>
                  )) :
                  <div>
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
                   <div className="grid grid-cols-12 my-2 border-4   rounded-md border-solid p-1 hover:bg-gray-200 ">
                   <div className="col-span-5">
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
                    </div>
                    <div className="inline-flex col-span-7 w-full  justify-end">
                     
                      <img
                        className="flex h-14 w-fit self-center"
                        // style={{
                        //   height: "3rem",

                        //   display: "flex",
                        // }}
                        src={type.logo}
                      />
                   
                     
                    </div>
                  </div>
                  ))}
                </div>
              }
                <div className="flex items-center py-4 lg:py-5 border-b border-t border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
        {t("text-sub-total")}
        {<span className="ms-auto flex-shrink-0">{domainCurrencyCode + " " + total.toFixed(2)}</span>}
      </div >
      <div className="flex items-center py-4 lg:py-5 border-b  border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
      {t("text-shipping")}
          {shipping !== "Free" ? <span className="ms-auto flex-shrink-0">{shippingFee && domainCurrencyCode + " " +shippingFee.toFixed(2)}</span> : <span className="ms-auto flex-shrink-0">{shipping}</span>}
          </div >
           
               <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
        {t("text-total")}
        {<span className="ms-auto flex-shrink-0">{domainCurrencyCode+" " + finalTotal.toFixed(2)}</span>}

      </div> 
                    {/* // {paymentGateway?.map((type: any, index: any) => (
                //   <div className="flex my-2 border-4 h-16  rounded-md border-solid p-1 hover:bg-gray-200 ">
                //     <input
                //       style={{
                //         accentColor: domainData.theme_color,
                //         cursor: "pointer",
                //       }}
                //       type="radio"
                //       id={index}
                //       value={type}
                //       name="payment-option"
                //       className="m-2 "
                //       onChange={() => setSelectPayment(type)}
                //     //checked={(type.name = selectPayment.name)}
                //     />

                //     <label className="p-2">{type.name}</label>

                //     <div className="  inline-flex  md:ml-10  w-full  justify-end">
                //       <img
                //         className="w-2/5"
                //         style={{
                //           height: "3rem",

                //           display: "flex",
                //         }}
                //         src={type.logo}
                //       />
                //     </div>
                //   </div>
                // ))} */}
                    <div className="flex w-full p-3">
                      <Button
                        className="w-full "
                        loading={addToCartLoader}
                        disabled={isDisabled}
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
