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
  // console.log(columns,'col');
  
  // console.log(categoriesWithSubCategories,'sub');

  // console.log(categoriesWithoutSubCategories,'without sub');

const columnsArray:any=[]

// columns?.map((_item:any,index:any)=>{
  for(let index=0;index<columns.length;index++){
  const withOUtSub=categoriesWithoutSubCategories.map((newItem:any)=>{
    return(
      newItem
    )
   
  })
  const withSub=categoriesWithSubCategories.map((newItem:any)=>{
    return(
      newItem
    )
   
  })
  if(index<=categoriesWithSubCategories?.length || index<=categoriesWithoutSubCategories?.length){

      
      columnsArray.push(  {
        id:index+1,
        columnItems:[
          {
            id:index,
            label:withSub[index]?.name,
            columnItemItems:withSub[index]?.sub_categories
          },{
            id: index+1,
            label:withOUtSub[index]?.name,
          }
    
        ]
      }
    )
 
  
  }
  }

  
  // console.log(columnsArray,'result');

  return (
    <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
    <div className={`${
      columnsArray?.length>=5?"grid grid-cols-5":`grid grid-cols-${columnsArray?.length}`

    }`}>
      {columnsArray?.map((column:any) => (
        <ul
          className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
          key={column.id}
        >
          {column?.columnItems?.map((columnItem:any) => (
            <React.Fragment key={columnItem.id}>
              <li className="mb-1.5">
                {columnItem?.label &&
                <Link
                 href={{ pathname: ROUTES.SEARCH, query: { category: columnItem?.label} }}
                  className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                >
                  {t(columnItem?.label)}
                </Link>
}
              </li>
              {columnItem?.columnItemItems?.map((item: any,ind:any) => (
                <li
                  key={item.id}
                  className={
                    columnItem?.columnItemItems?.length === ind+1
                      ? "border-b border-gray-300 pb-3.5 mb-3"
                      : ""
                  }
                >
                 {item?.name &&
                  <Link
                   href={{ pathname: ROUTES.SEARCH, query: { category: columnItem?.label } }}
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
