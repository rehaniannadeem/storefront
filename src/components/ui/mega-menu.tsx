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


const MegaMenu = ({ columns, label }: any) => {
  const { t } = useTranslation("menu");
  // const newProductArray = [];

// for (let i = 0; i < columns?.length; i += 3) {
//   const chunk = columns.slice(i, i + 3);
//   newProductArray.push(chunk);
// }


// let newProductArray = [];
// let i = 0;
// while (i < columns?.length) {
//   let chunk = columns.slice(i, i + 3);
//   // console.log(chunk);
  
//   let hasSubCategories = chunk.some((item:any) => item.sub_categories.length!=0);
 
//   if (hasSubCategories) {
//     newProductArray.push(chunk);
//     i += 3;
//   } else {
//     chunk = columns.slice(i, i + 6);
//     let hasSubCategories = chunk.some((item:any) => item.sub_categories.length!=0);
//     if (hasSubCategories) {
//       newProductArray.push(chunk);
//       i += 6;
//     }else{
//       chunk = columns.slice(i, i + 9);
//       let hasSubCategories = chunk.some((item:any) => item.sub_categories);
//       if (hasSubCategories) {
//         newProductArray.push(chunk);
//         i += 9;
//       }

//     }
   
//   }
// }
// const columnss:any = []; // Your array of categories

const newProductArray = [];
// let column = [];
// let totalLength = 0;

// for (let i = 0; i < columns.length; i++) {
//   const category = columns[i];
//   const subCategoriesLength = category.sub_categories.length;
//   totalLength+=(totalLength + subCategoriesLength)
//   // Check if adding the current category will exceed the total length of 9
//   if (totalLength === 9) {
//     column.push(category);
//     totalLength += subCategoriesLength;
//   } else {
//     newProductArray.push(column);
    
//     // Reset column and totalLength
//     column = [category];
//     totalLength = subCategoriesLength;
//   }
  
//   // Check if it's the last category and needs to be added to newProductArray
//   if (i === columns.length - 1) {
//     newProductArray.push(column);
//   }
// }

let totalLength=0
let prev=0;
let next=0;
for (let i = 0; i < columns?.length; i += 1) {
 next=i+1
  const category = columns[i];
   totalLength += category.sub_categories.length + 1; // Length of category and its sub-categories

  if (totalLength >= 9) {
    const chunk = columns.slice(prev, next);
    prev=next
    newProductArray.push(chunk);
    totalLength=0

    
    // i += totalLength - 1; // Skip the additional iterations for the sub-categories
  }else if(i===columns.length-1){
    
    const chunk = columns.slice(prev, columns.length);
    newProductArray.push(chunk);

  }
}

// for (let i = 0; i < columns?.length; i += 1) {
//   const chunk = columns.slice(i, i + 1);
//   newProductArray.push(chunk);
// }


const finalProductArray = newProductArray.map((chunk) => ({ items: chunk }));
console.log(newProductArray,'final product');


 const newCategoryArray = [];
for (let i = 0; i < columns?.length; i += 8) {
  const chunk = columns.slice(i, i + 8);
  newCategoryArray.push(chunk);
}

const finalCategoryArray = newCategoryArray.map((chunk) => ({ items: chunk }));

  return (


    <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">

{label==='menu-categories' && 
<div className={`${

finalCategoryArray?.length>=4?"grid grid-cols-4":`grid grid-cols-${finalCategoryArray?.length} `

    }`}>
      {finalCategoryArray?.map((column:any) => (
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
}

{ label==='menu-products'  &&
    <div className={`${
      finalProductArray?.length>=5?"grid grid-cols-5":`grid grid-cols-${finalProductArray?.length} `

    }`}>
      {finalProductArray?.map((column:any) => (
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
}
  </div>
  );
};

export default MegaMenu;
