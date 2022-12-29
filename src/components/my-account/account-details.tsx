//import Input from "@components/ui/input";
//import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  // useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
//import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";

const defaultValues = {};
const AccountDetails: React.FC = () => {
  // const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { t } = useTranslation();
  const { domain }: any = useContext(Context);
  const [userData, setUserData] = useState<any>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const {
    // register,
    //handleSubmit,
    // formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  /*  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  } */
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("userData")!);
    console.log(user);
    if (user) {
      setUserData(user);
    }
  }, []);
  useEffect(() => {
    setFirstName(userData.first_name);

    setLastName(userData.last_name);
    setEmail(userData.email);
    setNumber(userData.mobile);
  }, [userData]);
  console.log(userData, "user Data");
  console.log(firstName);
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className={`w-full flex flex-col`}
    >
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("common:text-account-details")}
      </h2>
      {/*  <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      > */}
      <div className="flex flex-col space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
          <div className="divide-y divide-current w-full">
            <div className=" p-3 ">
              <label className="text-sm"> {t("common:first-name")}</label>
              <p
                className="p-1 font-bold"
                style={{ color: domain.theme_color }}
              >
                {firstName}
              </p>
            </div>

            <div className="p-3 divide-solid">
              <label className="text-sm">{t("common:last-name")}</label>
              <p
                className="p-1 font-bold"
                style={{ color: domain.theme_color }}
              >
                {lastName}
              </p>
            </div>
            <div className="p-3 divide-solid">
              <label className="text-sm">{t("common:phone-number")}</label>
              <p
                className="p-1 font-bold"
                style={{ color: domain.theme_color }}
              >
                {number}
              </p>
            </div>
            <div className="p-3">
              <label className="text-sm">{t("common:email")}</label>
              <p
                className="p-1 font-bold"
                style={{ color: domain.theme_color }}
              >
                {email}
              </p>
            </div>
          </div>

          {/*  <Input
            labelKey="forms:label-first-name"
            /* {...register("firstName", {
              required: "forms:first-name-required",
            })} 
            value={firstName}
            variant="solid"
            className="w-full sm:w-1/2"
            errorKey={errors.firstName?.message}
            name={""}
          />
          <Input
            labelKey="forms:label-last-name"
            /*  {...register("lastName", {
               required: "forms:last-name-required",
             })} 
            variant="solid"
            value={lastName}
            className="w-full sm:w-1/2"
            errorKey={errors.lastName?.message}
            name={""}
          />
        </div>
        {/*  <Input
            labelKey="forms:label-display-name"
            {...register("displayName", {
              required: "forms:display-name-required",
            })}
            variant="solid"
            errorKey={errors.displayName?.message}
          /> 
        <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
          <Input
            type="tel"
            labelKey="forms:label-phone"
            /*  {...register("phoneNumber", {
              required: "forms:phone-required",
            })}
            variant="solid"
            value={number}
            className="w-full sm:w-1/2"
            name={""} // errorKey={errors.phoneNumber?.message}
          />
          <Input
            type="email"
            labelKey="forms:label-email-star"
            /*  {...register("email", {
               required: "forms:email-required",
               pattern: {
                 value:
                   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                 message: "forms:email-error",
               },
             })} 
            variant="solid"
            value={email}
            className="w-full sm:w-1/2"
            errorKey={errors.email?.message}
            name={""}
          />
            </div> */}
          {/*    <div className="relative flex flex-col">
          <span className="mt-2 text-sm text-heading font-semibold block pb-1">
            {t("common:text-gender")}
          </span>
          <div className="mt-2 flex items-center space-s-6">
            <RadioBox
              labelKey="forms:label-male"
              {...register("gender")}
              value="male"
            />
            <RadioBox
              labelKey="forms:label-female"
              {...register("gender")}
              value="female"
            />
          </div>
        </div>
        <div className="relative">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="h-12 mt-3 w-full sm:w-32"
          >
            {t("common:button-save")}
          </Button>
        </div> */}
        </div>
      </div>
      {/*  </form> */}
    </motion.div>
  );
};

export default AccountDetails;
