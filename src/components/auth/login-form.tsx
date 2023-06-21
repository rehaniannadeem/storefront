import Input from "@components/ui/input";
//import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
//import Logo from "@components/ui/logo";
//import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { Context } from "src/pages/_app";
import useWindowSize from "react-use/lib/useWindowSize";
// import { m } from "framer-motion";
import "react-phone-number-input/style.css";
// import { useRouter } from "next/router";
const LoginForm: React.FC = () => {
  const { width } = useWindowSize();
  const successNotify = (text: string) =>
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const errorNotify = (text: string) =>
    toast.error(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  <ToastContainer />;

  const { t } = useTranslation();
  // setModalView, openModal,
  const { closeModal } = useUI();
  const { mutate: login, isLoading } = useLoginMutation();
  const [phone, setPhone] = useState<any>();
  const [otp, setOtp] = useState("");
  const [visibleOtp, setVisibleOtp] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [domainData, setDomainData] = useState<any>({});
  const [domainToken, setDomainToken] = useState("");
  const [userData, setUserData] = useState({});
  const [countryCode,setCountryCode]=useState<any>('')
  //const [authenticatedUser, setAuthenticatedUser] = useState({});
  let connector_base_url=process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  //const { setUser } = useContext(Context);
  // const router = useRouter();
  // let {locale}=router
  
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainToken(domainData.token);

    setCountryCode(sessionStorage.getItem('countryCode'));
    
  }, []);

  const {
    //register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();
  //const { isAuthorized } = useUI();
  //console.log(isAuthorized);
  function onSubmit({ password, remember_me }: LoginInputType) {
    login({
      email: userEmail,
      password,
      remember_me,
    });
    //  console.log(email, password, remember_me, "data");
  }
  {
    /**
  function handelSocialLogin() {
    login({
      email: "demo@demo.com",
      password: "demo",
      remember_me: true,
    });
  }
  function handleSignUp() {
    setModalView("SIGN_UP_VIEW");
    return openModal();
  }
  function handleForgetPassword() {
    setModalView("FORGET_PASSWORD");
    return openModal();
  }
  */
  }
  const verifyNumber = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // var bodyFormData = new FormData();
    //  bodyFormData.set("mobile", phone);
    axios({
      params: {
        mobile_num: phone,
      },
      method: "get",
      url:connector_base_url+"/contactapi",
      // data: bodyFormData,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${domainToken}`,
      },
    })
      .then((response) => {
        //handle success
        // console.log(response.data.data);
        if (response?.data?.data?.length == 0) {
          console.log("data not  found");
          setVisibleRegister(true);
          setOtp("");
          setVisibleOtp(false);

          //  setVisibleOtp(true);
          // successNotify(response.data.message);
        } else {
          //  console.log("data found");
          setVerifyAccount(true);
          setUserEmail(response.data.data[0].email);
          //  setUserNumber(response.data.data[0].mobile);
          setUserData(response.data.data[0]);

          // setUser(response.data.data[0]);

          setInterval(function () {
            document.getElementById("login")?.click();
            window.location.reload();
          }, 1000);

          //handleSubmit(onSubmit);
          //errorNotify(response.data.message);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  //console.log(userData, "user data");
  const verifyOtp = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.set("mobile_no", phone);
    bodyFormData.set("otp", otp);

    axios({
      method: "post",
      url:connector_base_url+"/login-consumer",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${domainToken}`,
      },
    })
      .then(function (response) {
        //handle success

        if (response.data.status == true) {
          // setVisibleOtp(true);
          successNotify("OTP Verify Successfully");

          {
            verifyNumber(event);
          }
        } else {
          errorNotify(response.data.message);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  const handleOtp = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.set("mobile_no", phone);
    axios({
      method: "post",
      url:connector_base_url+"/send-otp-consumer",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${domainToken}`,
      },
    })
      .then(function (response) {
        //handle success

        if (response.data.status == true) {
          successNotify(response.data.message);
          setVisibleOtp(true);
        } else {
          errorNotify(response.data.message);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  const registerUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log(firstName, lastName, email);

    axios({
      method: "post",
      url:connector_base_url+"/contactapi",

      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        type: "customer",
        mobile: phone,
      },
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${domainToken}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.status);
        if (response.status == 201) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setVisibleRegister(false);
          toast.success("Register Successfully")
          {
            verifyNumber(event);
          }
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  //console.log(firstName, lastName, email);
  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <h1 className="font-bold text-2xl">{t("forms:login")}</h1>
          {/*  <Logo /> */}
        </div>
        {/** 
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:login-helper")}
        </p>
        */}
      </div>
      {/*  <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        // noValidate
      > */}
      <div className="flex flex-col space-y-3.5 content-center">
        {/** 
          <Input
            labelKey="forms:label-email"
            type="email"
            variant="solid"
            {...register("email", {
              required: `${t("forms:email-required")}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t("forms:email-error"),
              },
            })}
            errorKey={errors.email?.message}
          />
          */}

        <label
          htmlFor="Phone No"
          className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
        >
          {t("common:phone-number")}
        </label>
        <PhoneInput
          international
          defaultCountry={countryCode}
          className="p-2"
          value={phone}
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) {
              handleOtp(e);
            }
          }}
          containerStyle={{
            padding: "1rem",
          }}
          onChange={(e) => {
            setPhone(e);
            setVisibleOtp(false);
            setVerifyAccount(false);
            setVisibleRegister(false);
            setOtp("");
          }}
        />

        {visibleOtp ? (
          <div className="">
            <div className="">
              <label
                htmlFor="OTP"
                className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer m-0"
              >
                {t("forms:OTP")}
              </label>
            </div>
            <div className="">
              {width > 1050 ? (
                <OtpInput
                  value={otp}
                  isInputNum={true}
                  onChange={setOtp}
                  shouldAutoFocus={true}
                  numInputs={4}
                  className="my-2 mx-6"
                  inputStyle={{
                    border: "1px solid black",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <OtpInput
                  value={otp}
                  isInputNum={true}
                  onChange={setOtp}
                  shouldAutoFocus={true}
                  numInputs={4}
                  className="my-2 mx-4"
                  //separator={<span>-</span>}
                  inputStyle={{
                    border: "1px solid black",

                    width: "3rem",
                    height: "3rem",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
          </div>
        ) : null}
        {visibleRegister ? (
          <form id="registerForm" onSubmit={registerUser}>
            <div>
              <Input
                labelKey={t("common:first-name")}
                type="text"
                name="firstName"
                variant="solid"
                className="p-4"
                value={firstName}
                required
                /*   {...register("email", {
                  required: `${t("forms:name-required")}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("forms:name-error"),
                  },
                })} */
                onChange={(e) => setFirstName(e.target.value)}
                errorKey={errors.email?.message}
              />
              <Input
                name="lastName"
                labelKey={t("common:last-name")}
                type="text"
                variant="solid"
                className="p-4"
                required
                /*  {...register("email", {
                  required: `${t("forms:name-required")}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("forms:name-error"),
                  },
                })} */
                onChange={(e) => setLastName(e.target.value)}
                errorKey={errors.email?.message}
              />
              <Input
                name="email"
                labelKey={t("common:email")}
                type="email"
                variant="solid"
                className="p-4"
                required
                /*  {...register("email", {
                  required: `${t("forms:email-required")}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("forms:email-error"),
                  },
                })} */
                onChange={(e) => setEmail(e.target.value)}
                errorKey={errors.email?.message}
              />
            </div>
            {/*  <div className="relative">
                <Button
                  type="submit"
                  form="registerForm"
                  loading={isLoading}
                  disabled={isLoading}
                  className="h-11 md:h-12 w-full mt-1.5"
                  //onClick={registerUser}
                >
                  {t("common:Register")}
                </Button>
              </div> */}
          </form>
        ) : null}

        {/*
          <div className="flex items-center justify-center">
            <div className="flex items-center flex-shrink-0">
              <label className="switch relative inline-block w-10 cursor-pointer">
                <input
                  id="remember"
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  {...register("remember_me")}
                />
                <span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
              </label>
              <label
                htmlFor="remember"
                className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
              >
                {t("forms:label-remember-me")}
              </label>
            </div>
           
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                {t("common:text-forgot-password")}
              </button>
            </div>
          </div>
           */}
        {visibleRegister ? (
          <div className="relative">
            <Button
              type="submit"
              form="registerForm"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
              style={{ backgroundColor: domainData.theme_color }}
              //onClick={registerUser}
            >
              {t("forms:register")}
            </Button>
          </div>
        ) : verifyAccount ? (
          <div className="relative">
            <Button
              type="submit"
              id="login"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
              onClick={handleSubmit(onSubmit)}
              style={{ backgroundColor: domainData.theme_color }}
            >
              {t("forms:login")}
            </Button>
          </div>
        ) : visibleOtp ? (
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
              onClick={verifyOtp}
              style={{ backgroundColor: domainData.theme_color }}
            >
              {t("forms:next")}
            </Button>
          </div>
        ) : (
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
              onClick={handleOtp}
              style={{ backgroundColor: domainData.theme_color }}
            >
              {t("forms:next")}
            </Button>
          </div>
        )}
      </div>
      {/*   </form> */}

      {/** 
       *   <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">
          {t("common:text-or")}
        </span>
      </div>
      <Button
        loading={isLoading}
        disabled={isLoading}
        className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
        onClick={handelSocialLogin}
      >
        <ImFacebook2 className="text-sm sm:text-base me-1.5" />
        {t("common:text-login-with-facebook")}
      </Button>
      <Button
        loading={isLoading}
        disabled={isLoading}
        className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
        onClick={handelSocialLogin}
      >
        <ImGoogle2 className="text-sm sm:text-base me-1.5" />
        {t("common:text-login-with-google")}
      </Button>
        <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {t("common:text-no-account")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignUp}
        >
          {t("common:text-register")}
        </button>
      </div>
      */}
    </div>
  );
};

export default LoginForm;
