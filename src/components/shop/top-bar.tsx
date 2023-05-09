import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";

import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
//import { useProductsQuery } from "@framework/product/get-all-products";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";
const SearchTopBar = () => {
  const { query } = useRouter();

  // const { data } = useProductsQuery({ limit: 10, ...query });
  const { products }: any = useContext(Context);
  const [categoryArray, setCategoryArray] = useState<any>([]);
  const [brandArray, setBrandArray] = useState<any>([]);
  const [priceArray, setPriceArray] = useState<any>([]);
  const [productLength, setProductLength] = useState();
  const [productData, setProductData] = useState<any>([]);
  const [variationArray, setVariationArray] = useState<any>([]);
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

  useEffect(() => {
    Array.isArray(products) ? setProductData(products) : null;
  }, [products]);

  useEffect(() => {
    if (query.category?.length != undefined) {
      const filterCategory: any = query.category;
      setCategoryArray(filterCategory.split(","));
    } else {
      setCategoryArray([]);
    }
    if (query.brand?.length != undefined) {
      const filterCategory: any = query.brand;
      setBrandArray(filterCategory.split(","));
    } else {
      setBrandArray([]);
    }
    if (query.price?.length != undefined) {
      const filterPrice: any = query.price;
      // console.log(filterPrice, "filter price");
      setPriceArray(filterPrice.split("-"));
    } else {
      setPriceArray([]);
    }
    if (query?.variation?.length != undefined) {
      const filterVariation: any = query?.variation;
      setVariationArray(filterVariation.split(","));
    } else {
      setVariationArray([]);
    }
  
  }, [query]);

  useEffect(() => {
    let length = productData?.filter((item: any) => {
      if (Object.keys(query)?.length === 0) {
        return item;
      } else {
        if (item.price >= priceArray[0] && item.price <= priceArray[1]) {
          return item;
        }

        if (item.category != null) {
          if (categoryArray.includes(item.category.name)) {
            return item;
          }
        }

        if (item.brands != null) {
          if (brandArray.includes(item.brands.name)) {
            return item;
          }
        }
        if (variationArray.includes(item?.variations[0]?.value)) {
          return item;
        }
      }
    }).length;

    setProductLength(length);
  });
  
  return (
    <div className="flex justify-between items-center mb-7">
      {/*  <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {t("text-casual-wear")}
      </Text> */}
      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t("text-filters")}</span>
      </button>
      <div className=" items-center justify-end contents">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
          {productLength} {t("text-items")}
        </div>
          <ListBox
          options={[
             { name: "text-sorting-options", value: "options" },
            //  { name: "text-newest", value: "newest" },
            // { name: "text-popularity", value: "popularity" }, 
            { name: "text-price-low-high", value: "low-high" },
            { name: "text-price-high-low", value: "high-low" },
          ]}
        />
      </div>
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
