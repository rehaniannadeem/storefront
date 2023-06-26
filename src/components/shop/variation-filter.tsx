//import { useCategoriesQuery } from "@framework/category/get-all-categories";
//import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
//import { useTranslation } from "next-i18next";
import { Context } from "src/pages/_app";
import axios from "axios";
import cn from "classnames";
export const VariationFilter = () => {
  const { domain }: any = useContext(Context);
  // const { t } = useTranslation("common");
  const router = useRouter();
  let connector_base_url = process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  const { pathname, query } = router;
  const [items, setItems] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  //const [active, setActive] = useState("")
  /*  const { data, isLoading } = useCategoriesQuery({
    limit: 10,
  }); */
  // const items = data?.data;
  //console.log(data, "category Data");

  const selectedVariation = query?.variation
    ? (query.variation as string).split(",")
    : [];
  const [formState, setFormState] =
    React.useState<string[]>(selectedVariation);

  React.useEffect(() => {
    setFormState(selectedVariation);
    // if (query?.variation == undefined) {
    //   setActive("")
    // }


  }, [query?.variation]);
  useEffect(() => {
    const getVariations = () => {
      setIsLoading(true);
      axios({
        method: "get",
        url: connector_base_url + "/get_variations",
        // data: bodyFormData,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domain.token}`,
        },
      })
        .then((response: any) => {
          // console.log(response.data, "this is product detail");
          setItems(response.data[0]);
        })
        .catch(function (err: any) {
          //handle error
          console.log(err);
        });
    };

    { Object.keys(domain)?.length != 0 && getVariations(); }
    // getCategory();
    setIsLoading(false);
  }, [domain]);
  // if (isLoading) return <p>Loading...</p>;

  function handleItemClick(active: any): void {
    const value = active

    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { variation, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { variation: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const handleClick = (itemName: any) => {
   // setActive(itemName)
    handleItemClick(itemName)

  }
  //console.log(items, "items");

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {items?.name}
      </h3>
      <div className="mt-2 ">
        {isLoading && !items ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid grid-cols-3 gap-4">
            {items?.values?.map((item: any, index: any) => (

              <li key={index} className={cn(
                " cursor-pointer rounded border inline-flex border-gray-100    w-full  p-2 mb-2 md:mb-3 me-2 md:me-3 justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                // {
                //   "border-2": item.name === active,
                // }
              )}
                // style={item.name == active ? { borderColor: domain?.theme_color } : { borderColor: "#D3D3D3" }}
                onClick={() => {
                  handleClick(item.name)

                }}>{item.name}</li>


              //         <CheckBox
              //   key={item.id}
              //   label={item.name}
              //   name={item.name.toLowerCase()}
              //   checked={formState.includes(item.name)}
              //   value={item.name}
              //   onChange={handleItemClick}
              // /> 
            ))}
          </ul>
        )}
      </div>
    </div >
  );
};
