import React, { useContext } from "react";
// import { useTranslation } from "next-i18next";
import { Context } from "src/pages/_app";
import { useRouter } from 'next/router';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  label?: string | any;
  item?: any
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ labelKey, label, item, ...rest }, ref) => {
    // const { t } = useTranslation();
    const {locale}=useRouter()
    const { domain }: any = useContext(Context);
    //  console.log(item,'fdskfjdl');
    return (
      <label className="group flex items-center text-heading text-sm cursor-pointer">
        <input
          type="checkbox"
          className=" w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none "
          ref={ref}
          {...rest}
          style={{ accentColor: domain.theme_color }}
        />
        <span className="ms-4 -mt-0.5">{/* {labelKey ? t(labelKey) : label} */}   {locale==='ar' && item?.arabic_name ? item?.arabic_name : label}</span>
      </label>
    );
  }
);
