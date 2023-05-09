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
  const newArray = [];

for (let i = 0; i < columns?.length; i += 3) {
  const chunk = columns.slice(i, i + 3);
  newArray.push(chunk);
}

const finalArray = newArray.map((chunk) => ({ items: chunk }));

  return (


    <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
    <div className={`${
      finalArray?.length>=5?"grid grid-cols-5":`grid grid-cols-${finalArray?.length}`

    }`}>
      {finalArray?.map((column:any) => (
        <ul
          className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
          key={column.id}
        >
          {column?.items?.map((columnItem:any) => (
            <React.Fragment key={columnItem.id}>
              <li className="mb-1.5">
                {columnItem?.name &&
                <Link
                 href={{ pathname: ROUTES.SEARCH, query: { category: columnItem?.name} }}
                  className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                >
                  {t(columnItem?.name)}
                </Link>
}
              </li>
              {columnItem?.sub_categories?.map((item: any,ind:any) => (
                <li
                  key={item.id}
                  className={
                    columnItem?.sub_categories?.length === ind+1
                      ? "border-b border-gray-300 pb-3.5 mb-3"
                      : ""
                  }
                >
                 {item?.name &&
                  <Link
                   href={{ pathname: ROUTES.SEARCH, query: { category: columnItem?.name } }}
                    className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 "
                  >
                    {t(item?.name)}
                  </Link>
}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      ))}
    </div>
  </div>
  );
};

export default MegaMenu;
