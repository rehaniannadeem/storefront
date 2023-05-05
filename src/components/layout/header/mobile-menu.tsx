import { useState } from "react";
import Link from "@components/ui/link";
import { siteSettings } from "@settings/site-settings";
import Scrollbar from "@components/common/scrollbar";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { Context } from "src/pages/_app";
import { ROUTES } from "@utils/routes";

/** 
 * import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from "react-icons/io5";
const social = [
  {
    id: 0,
    link: "https://www.facebook.com/redqinc/",
    icon: <IoLogoFacebook />,
    className: "facebook",
    title: "text-facebook",
  },
  {
    id: 1,
    link: "https://twitter.com/redqinc",
    icon: <IoLogoTwitter />,
    className: "twitter",
    title: "text-twitter",
  },
  {
    id: 2,
    link: "https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",
    icon: <IoLogoYoutube />,
    className: "youtube",
    title: "text-youtube",
  },
  {
    id: 3,
    link: "https://www.instagram.com/redqinc/",
    icon: <IoLogoInstagram />,
    className: "instagram",
    title: "text-instagram",
  },
];
*/
export default function MobileMenu() {
  const [subActiveMenus, setSubActiveMenus] = useState<any>([]);
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar } = useUI();
  const { t } = useTranslation("menu");
  let brands: any = [];
  let categories: any = [];

  if (typeof window !== "undefined") {
    brands = JSON.parse(localStorage.getItem("brands")!);
    categories = JSON.parse(localStorage.getItem("categories")!);
  }
  const handleSubArrowClick = (menuName: string) => {
    var newSubActiveMenus = [...subActiveMenus];

    if (newSubActiveMenus.includes(menuName)) {
      var index = newSubActiveMenus.indexOf(menuName);
      if (index > -1) {
        newSubActiveMenus.splice(index, 1);
      }
    } else {
      newSubActiveMenus.push(menuName);
    }

    setSubActiveMenus(newSubActiveMenus);
  };
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };
  const { domain }: any = useContext(Context);
  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = "",
  }: any) =>
    data.label && (
      <li className={`mb-0.5 ${className}`}>
        <div
          className="flex flex-row items-center justify-between"
        //  onClick={closeSidebar}
        >
          <Link
            href={
              data.label === "UN Merch"
                ? { pathname: ROUTES.SEARCH, query: { category: "UN Merch" } }
                : data.path
            }
            className="w-full inline-flex text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
          >
            {/*   <span className="m-0.5 text-lg">{data.icon}</span> */}
            <span className="text-lg"> {t(data.label)}</span>
            {/*  <span className="block w-full" onClick={closeSidebar}>
              {t(`${data.label}`)}
            </span> */}
          </Link>
          {hasSubMenu && (
            <div
              className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                  }`}
              />
            </div>
          )}
        </div>

        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

    const SubMenuList = ({ 
      data,
      parentCategory,
      className = "",
    }: any) =>  (
      console.log(parentCategory),
      
        <li className={`mb-0.5 ${className}`}>
          <div
            className="flex flex-row items-center justify-between"
          //  onClick={closeSidebar}
          >
            <Link
              href={
                 { pathname: ROUTES.SEARCH, query: { category:parentCategory?.name } }
                  
              }
              className="w-full inline-flex text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
            >
              {/*   <span className="m-0.5 text-lg">{data.icon}</span> */}
              <span className="text-sm"> {t(data.name)}</span>
              {/*  <span className="block w-full" onClick={closeSidebar}>
                {t(`${data.label}`)}
              </span> */}
            </Link>
            {/* {hasSubMenu && (
              <div
                className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
                onClick={() => handleArrowClick(menuName)}
              >
                <IoIosArrowDown
                  className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                    }`}
                />
              </div>
            )} */}
          </div>
  
          {/* {hasSubMenu && (
            <SubMenu
              dept={dept}
              data={data?.sub_categories}
              toggle={activeMenus.includes(menuName)}
              menuIndex={menuIndex}
            />
          )} */}
        </li>
      );

//   const Sub_category = ({ data, id_index }: any) => (
    

  
//       <>
//         {id_index && id_index === data?.id && data?.sub_categories.map((sub_category: any, ind: any) => {

//           <li className="" key={id_index} >
//             {/* <Link
//   href={{
//     pathname: ROUTES.SEARCH,
//     query: { category: data.name },
//   }}
//   className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
// > */}
//             {t(sub_category.name)}

//             {/* </Link> */}
//           </li>
//         }

//         )}
//       </>
//     )
    

  const ListSubCategories = ({ data }: any) => {
    const dept: number = 2;
    const menuName: string = `sidebar-sub-menu-${dept}-${data.id}`;


console.log(subActiveMenus,'submenu');

    return (
      <>
        <li className="relative ps-4 mb-0.5" key={data.id} >
          <Link
            href={{
              pathname: ROUTES.SEARCH,
              query: { category: data.name },
            }}
            className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
          >
            {t(data.name)}
               {data.sub_categories.length != 0  && (
            <span
              className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
              onClick={() => handleSubArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${subActiveMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                  }`}
              />
            </span>
          )}
          </Link>
         
          <NewSubMenu
            dept={dept}
            data={data}
            toggle={subActiveMenus.includes(menuName)}
            menuIndex={data.id}
          />
      
          {/* {selectSubMenu!=undefined &&
            // <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />

            // <Sub_category data={data} id_index={selectSubMenu} />

          } */}
        </li>
      </>
    )

  }

  const ListCategories = ({ data, keyValue }: any) => (
    <li className="relative ps-4 mb-0.5" key={keyValue} onClick={closeSidebar}>
      <Link
        href={{
          pathname: ROUTES.SEARCH,
          query: { category: data.name },
        }}
        className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
      >
        {t(data.name)}
        {data.subMenu && (
          <span className="text-sm mt-0.5 shrink-0">
     
          </span>
        )}
      </Link>
   
    </li>
  );
  const ListBrands = ({ data, keyValue }: any) => (
    <li className="relative ps-4 mb-0.5" key={keyValue} onClick={closeSidebar}>
      <Link
        href={{
          pathname: ROUTES.SEARCH,
          query: { brand: data.slug },
        }}
        className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
      >
        {t(data.name)}
        {data.subMenu && (
          <span className="text-sm mt-0.5 shrink-0">
         
          </span>
        )}
      </Link>
    
    </li>
  );
  const NewSubMenu = ({ dept, data, toggle }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className="pt-0.5">
     
          	{data?.sub_categories?.map((menu: any) => {
					// const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

					return (
						<SubMenuList
							data={menu}
              parentCategory={data}							
							className={dept > 1 && "ps-4"}
						/>
					);
				})}
     
      </ul>
    );
  };

  const SubMenu = ({ dept, data, toggle }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;


    return (
      <ul className="pt-0.5">
        {data.label === "menu-categories" &&
          categories.map((menu: any, index: number) => {
            return <ListCategories data={menu} keyValue={index} />;
          })}
        {data.label === "menu-brands" &&
          brands.map((menu: any, index: number) => {
            return <ListBrands data={menu} keyValue={index} />;
          })}
        {data.label === "menu-products" &&
          categories.map((menu: any, index: any) => {
            return <ListSubCategories data={menu} keyValue={index} />;
          })}
       
  
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
          <Logo width={70} height={70} />

          <button
            className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow mb-auto">
          <div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
            <ul className="mobileMenu">
              {domain?.name === "un"
                ? site_header?.urbannecessity_mobile_menu?.map((menu, index) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })
                : site_header.mobileMenu.map((menu, index) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <>
                      {menu.label === 'menu-products' ?
                        <ListMenu
                          dept={dept}
                          data={menu}
                          hasSubMenu={true}
                          menuName={menuName}
                          key={menuName}
                          menuIndex={index}
                        />
                        :
                        <ListMenu
                          dept={dept}
                          data={menu}
                          // hasSubMenu={true}
                          menuName={menuName}
                          key={menuName}
                          menuIndex={index}
                        />}

                    </>


                  );
                })}
            </ul>
          </div>
        </Scrollbar>
  
      </div>
    </>
  );
}
