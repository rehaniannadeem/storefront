//import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Context } from "src/pages/_app";
import axios from "axios";

export const CategoryFilter = () => {
  const { domain }: any = useContext(Context);
  const { t } = useTranslation("common");
  const router = useRouter();
  let storefront_base_url=process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  const { pathname, query } = router;
  const [items, setItems] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  /*  const { data, isLoading } = useCategoriesQuery({
    limit: 10,
  }); */
  // const items = data?.data;
  //console.log(data, "category Data");

  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];
  const [formState, setFormState] =
    React.useState<string[]>(selectedCategories);

  React.useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);
  useEffect(() => {
    const getCategory = () => {
      setIsLoading(true);
      axios({
        method: "get",
        url: storefront_base_url+"/categories",
        // data: bodyFormData,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domain.token}`,
        },
      })
        .then((response: any) => {
          // console.log(response.data, "this is product detail");
          setItems(response.data.data);
        })
        .catch(function (err: any) {
          //handle error
          console.log(err);
        });
    };
    
    {Object.keys(domain).length!=0 &&  getCategory();}
   // getCategory();
    setIsLoading(false);
  }, [domain]);
  // if (isLoading) return <p>Loading...</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  // console.log(items, "items");

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-category")}
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
              checked={formState.includes(item.name)}
              value={item.name}
              item={item}
              onChange={handleItemClick}
            />
          ))
        )}
      </div>
    </div>
  );
};
