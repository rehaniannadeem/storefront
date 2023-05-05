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


const MegaMenu = ({ columns }: any) => {
  const { t } = useTranslation("menu");
  // const brands = JSON.parse(localStorage.getItem("brands")!);
  // const categories = JSON.parse(localStorage.getItem("categories")!);
  // console.log(columns,'columns');

  const categoriesWithSubCategories: any = [];
  const categoriesWithoutSubCategories: any = [];
  columns?.forEach((category: any) => {
    if (category?.sub_categories?.length != 0) {
      categoriesWithSubCategories.push(category);
    } else {
      categoriesWithoutSubCategories.push(category);
    }
  });


  const sortedArray = categoriesWithSubCategories.concat(categoriesWithoutSubCategories);
  console.log(columns?.length);


  return (
    <div className=" shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible ">

      <div className={` ${sortedArray?.length >= 10 ? "grid grid-cols-5 gap-x-1" : "grid grid-cols-3 gap-x-1"
        }`}

      >
        {sortedArray?.map((category: any, ind: any) => (
          <div key={ind} className="pb-2">
            <Link
              href={{ pathname: ROUTES.SEARCH, query: { category: category?.name } }}
              className="text-heading justify-center flex align-middle py-2 font-semibold hover:bg-gray-100 bg-gray-50"
            >
              <h2 className="text-heading justify-center flex align-middle py-2 font-semibold ">{t(category?.name)}</h2>
            </Link>

            {category?.sub_categories && (
              <div className="flex flex-wrap mt-3">
                {category?.sub_categories?.map((sub_category: any, index: number) => (
                  index % 3 === 0 && (
                    <ul key={sub_category.id} className="mr-8">
                      {category?.sub_categories.slice(index, index + 3).map((sub_category: any) => (
                        <li key={sub_category.id} className="mb-3 flex justify-center">
                          <Link
                            href={{ pathname: ROUTES.SEARCH, query: { category: category?.name } }}
                            className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                          >
                            {t(sub_category.name)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
