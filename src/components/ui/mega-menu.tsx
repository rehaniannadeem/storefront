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

  // const categoriesWithSubCategories: any = [];
  // const categoriesWithoutSubCategories: any = [];
  // columns?.forEach((category: any) => {
  //   if (category?.sub_categories?.length != 0) {
  //     categoriesWithSubCategories.push(category);
  //   } else {
  //     categoriesWithoutSubCategories.push(category);
  //   }
  // });
  


  const newArray = [];

for (let i = 0; i < columns.length; i += 3) {
  const chunk = columns.slice(i, i + 3);
  newArray.push(chunk);
}

const finalArray = newArray.map((chunk) => ({ items: chunk }));

// console.log(finalArray,'final Array');

// const columnsArray:any=[]

// // columns?.map((_item:any,index:any)=>{
//   for(let index=0;index<columns.length;index++){
//   const withOUtSub=categoriesWithoutSubCategories.map((newItem:any)=>{
//     return(
//       newItem
//     )
   
//   })
//   const withSub=categoriesWithSubCategories.map((newItem:any)=>{
//     return(
//       newItem
//     )
   
//   })
//   if(index<=categoriesWithSubCategories?.length && index<=categoriesWithoutSubCategories?.length){

      
//       columnsArray.push(  {
//         id:index+1,
//         columnItems:[
//           {
//             id:index,
//             label:withSub[index]?.name,
//             columnItemItems:withSub[index]?.sub_categories
//           },{
//             id: index+1,
//             label:withOUtSub[index]?.name,
//           }
    
//         ]
//       }
//     )
 
  
//   }
//   }

  
 

  return (

//     <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
// <div className="grid grid-flow-col grid-rows-3">
//   {columns?.map((column: any) => (
//     <ul
//       className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
//       key={column.id}
//     >
//       <React.Fragment key={column.id}>
//         <li className="mb-1.5">
//           {column?.name && (
//             <Link
//               href={{ pathname: ROUTES.SEARCH, query: { category: column?.name } }}
//               className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
//             >
//               {t(column?.name)}
//             </Link>
//           )}
//         </li>
//         {column?.sub_categories?.map((item: any, ind: any) => (
//           <li
//             key={item.id}
//             className={
//               column?.sub_categories?.length === ind + 1 ? "border-b border-gray-300 pb-3.5 mb-3" : ""
//             }
//           >
//             {item?.name && (
//               <Link
//                 href={{ pathname: ROUTES.SEARCH, query: { category: column?.name } }}
//                 className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 "
//               >
//                 {t(item?.name)}
//               </Link>
//             )}
//           </li>
//         ))}
//       </React.Fragment>
//     </ul>
//   ))}
// </div>
//   </div>

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
