import { CheckBox } from "@components/ui/checkbox";
//import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Context } from "src/pages/_app";
import axios from "axios";

export const BrandFilter = () => {
  const { domain }: any = useContext(Context);
  const [items, setItems] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("common");
  const router = useRouter();
  let storefront_base_url=process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  const { pathname, query } = router;
  /*  const { data, isLoading, error } = useBrandsQuery({
    limit: 10,
  }); */
  const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);
  React.useEffect(() => {
    setFormState(selectedBrands);
  }, [query?.brand]);
  useEffect(() => {
    const getBrand = () => {
      setIsLoading(true);
      axios({
        method: "get",
        url:storefront_base_url+"/brands",
        // data: bodyFormData,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domain.token}`,
        },
      })
        .then((response: any) => {
          //  console.log(response, "this is product detail");
          setItems(response.data.brands);
        })
        .catch(function (err: any) {
          //handle error
          console.log(err);
        });
      setIsLoading(false);
    };
    {Object.keys(domain).length!=0 &&  getBrand();}
   // getBrand();
  }, [domain]);
  //if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
    const { brand, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { brand: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  // const items = data?.brands;

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-brands")}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {isLoading && !items ? (
          <p>Loading...</p>
        ) : (
          items?.map((item: any) => (
            <CheckBox
              key={item.id}
              label={item.name}
              name={item.name.toLowerCase()}
              checked={formState.includes(item.slug)}
              value={item.slug}
              onChange={handleItemClick}
            />
          ))
        )}
      </div>
    </div>
  );
};
