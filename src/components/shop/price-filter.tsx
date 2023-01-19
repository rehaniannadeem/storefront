//import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React,{useContext, useRef} from "react";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import { Context } from "src/pages/_app";
//import { type } from './../../framework/basic-rest/types';
// const priceFilterItems = [
//   {
//     id: "1",
//     name: "Under 50",
//     slug: "0-50",
//   },
//   {
//     id: "2",
//     name: "50 to 100",
//     slug: "50-100",
//   },
//   {
//     id: "3",
//     name: "100 to 150",
//     slug: "100-150",
//   },
//   {
//     id: "4",
//     name: "150 to 200",
//     slug: "150-200",
//   },
//   {
//     id: "5",
//     name: "200 to 300",
//     slug: "200-300",
//   },
//   {
//     id: "6",
//     name: "300 to 500",
//     slug: "300-500",
//   },
//   {
//     id: "7",
//     name: "500 to 1000",
//     slug: "500-1000",
//   },
//   {
//     id: "8",
//     name: "Over 1000",
//     slug: "1000-1000000",
//   },
// ];
export const PriceFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { domain }: any = useContext(Context);
  const { pathname, query } = router;
  const selectedPrices = query?.price ? (query.price as string).split(",") : [];
  const [formState, setFormState] = React.useState(selectedPrices);
  React.useEffect(() => {
    setFormState(selectedPrices);
  }, [query?.price]);

 // const items = priceFilterItems;
  const minPrice:any=useRef(null)
  const maxPrice:any=useRef(null)
  const submit=()=>{
    handleItemClick(minPrice?.current?.value,maxPrice?.current?.value)
    // console.log('>>>>>>>>>>>min', minPrice?.current?.value)
    // console.log('>>>>>>>>>>>max', maxPrice?.current?.value)
  }
  function handleItemClick(min:any,max:any): void {
    
   // const { value } = e.currentTarget;
    const  value :any= `${min}-${max}`;
   
   
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [value];
    // setFormState(currentFormState);
    const { price, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length ? { price: currentFormState } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-price")}
      </h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-5">
         <input type="text" placeholder="Min Price" ref={minPrice} className="border-solid border p-2 col-span-2  border-current rounded"  />
         <p className="  mx-1 justify-self-center self-center col-span-1">To</p>
          <input type="text" placeholder="Max Price" ref={maxPrice} className="border-solid border col-span-2 p-2  border-current  rounded" />
         {/* <span onClick={submit} className="my-1 self-center cursor-pointer">Go</span>  */}
         </div>
         <div className="grid grid-cols-1 ">
         <Button
         className="my-3 "
            style={{backgroundColor:domain.theme_color}}
           onClick={submit}
            variant="slim"
          >
            {t("Go")}
          </Button>
         </div>
       
        
      </div>
      {/* <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div> */}
    </div>
  );
};
