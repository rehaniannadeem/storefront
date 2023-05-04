import React from "react";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";

// interface MenuItem {
//   id: number | string;
//   path: string;
//   label: string;
//   columnItemItems?: any
// }
// type MegaMenuProps = {
//   columns: {
//     id: number | string;
//     columnItems: any;
//   }[];
// };

const MegaMenu = ({ columns }:any) => {
  const { t } = useTranslation("menu");
  // const brands = JSON.parse(localStorage.getItem("brands")!);
  // const categories = JSON.parse(localStorage.getItem("categories")!);
// console.log(columns,'columns');

  return (
    <div className=" shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
      <div className={` flex flex-col
            ${
        columns?.length>=5?
              "grid grid-cols-5":
              `grid grid-cols-${columns.length}`
           

          }`}
              >
        {columns?.map((category:any,ind:any) => (
          
          <ul
            className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7  "
            key={ind}
            // style={{ columnCount: 2 }}
          >
         
              <React.Fragment key={category?.id}>
                <li className="mb-1.5" key={ind}>
                   <Link
                    // href={columnItem.path}
                    href={{ pathname: ROUTES.SEARCH, query: { category: category?.name } }}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                  >
                  <span className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300">
                    {" "}
                    {t(category?.name)}
                  </span>

                   </Link>
                </li>
                {category?.sub_categories?.map((sub_category: any) => (
                      <li
                        key={sub_category.id}
                        className={
                          
                          category?.sub_categories?.length === sub_category.id
                            ? "border-b border-gray-300 pb-3.5 mb-3 flex justify-center"
                            : "justify-center flex hover:bg-gray-300 "
                        }
                      >
                        <Link
                          href={{ pathname: ROUTES.SEARCH, query: { category: category?.name } }}
                          className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                        >
                          {t(sub_category.name)}
                        </Link>
                      </li>
                    ))}
                {/* {columnItem.label === "menu-categories" &&
                  categories?.map((item: any) => (
                    <li
                      key={item.id}
                      className={
                        columnItem?.columnItemItems?.length === item.id
                          ? "border-b border-gray-300 pb-3.5 mb-3"
                          : ""
                      }
                    >
                      <Link
                        href={{
                          pathname: ROUTES.SEARCH,
                          query: { category: item.name },
                        }}
                        className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))}
                {columnItem.label === "menu-brands" &&
                  brands?.map((item: any) => (
                    <li
                      key={item.id}
                      className={
                        columnItem?.columnItemItems?.length === item.id
                          ? "border-b border-gray-300 pb-3.5 mb-3"
                          : ""
                      }
                    >
                      <Link
                        href={{
                          pathname: ROUTES.SEARCH,
                          query: { brand: item.slug },
                        }}
                        className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  ))} */}
             
              </React.Fragment>
       
          </ul>
       
        ))}
        </div>
    </div>
  );
};

export default MegaMenu;
