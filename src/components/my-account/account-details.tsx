import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useUpdateUserMutation,
  //UpdateUserType,
} from "@framework/customer/use-update-customer";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { Context } from "src/pages/_app";
import { UpdateUser } from "./../../Services/Services";
import { toast } from "react-toastify";
type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
};

const AccountDetails = (data: any) => {
  const { isLoading } = useUpdateUserMutation();
  const { t } = useTranslation();
  const { domain }: any = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: data.data
      ? {
          ...data.data,
        }
      : data,
  });
  function onSubmit(values: FormValues) {
    let ID = data.data.id;
    let userType = data.data.type;

    let formVal = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      mobile: values.mobile,
      type: userType,
    };

    UpdateUser("/contactapi", formVal, ID).then((result) => {
      // console.log(">>>>>>>>>>> result", result.error.message);
      if (result.data) {
        toast.success("Updated successfully");
        localStorage.setItem("userData", JSON.stringify(result.data));
        setInterval(function () {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.error.message);
      }
    });
  }

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register("first_name")}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.first_name?.message}
            />
            <Input
              labelKey="forms:label-last-name"
              {...register("last_name", {
                required: "forms:last-name-required",
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.last_name?.message}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register("mobile", {
                required: "forms:phone-required",
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.mobile?.message}
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
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.email?.message}
            />
          </div>

          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-12 mt-3 w-full sm:w-32"
              style={{ background: domain.theme_color }}
            >
              {t("common:button-update")}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountDetails;
