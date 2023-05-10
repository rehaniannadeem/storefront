import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
//import ListMenu from "@components/ui/list-menu";
// import ListCategory from "@components/ui/list-categries";
// import ListBrand from "@components/ui/list-brand";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("menu");
  // let brands: any = [];
  let categories: any = [];
  if (typeof window !== "undefined") {
    // brands = JSON.parse(localStorage.getItem("brands")!);
    categories = JSON.parse(localStorage.getItem("categories")!);
  }
// console.log(categories,'categories');

  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {data?.map((item: any, index: any) => (
        <div
          className={`menuItem group cursor-pointer py-7 ${
            item.subMenu ? "relative" : ""
          }`}
          key={index}
        >
          <Link
            //  href={item.path}
            href={
              item.label === "UN Merch"
                ? { pathname: ROUTES.SEARCH, query: { category: "UN Merch" } }
                : item.path
            }
            className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
          >
            {/* <span className="m-0.5 text-xl ">{item.icon}</span> */}
            <span className="text-lg"> {t(item.label)}</span>

            {(item?.columns || item.subMenu) && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>
          {(item?.label==='menu-products' || item?.label==='menu-categories')  &&
          <MegaMenu columns={categories} label={item?.label}/>
          }
            {/* {item?.label==='menu-categories' &&
          <MegaMenu columns={categories} label={item?.label} />
          } */}


          {/* {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )} */}

          {/* {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
              {item.label === "menu-categories" && (
                <ul className="text-body text-sm py-5"
                style={{ columnCount: 2 }}>
                  {categories?.map((menu: any, index: number) => {
                    const dept: number = 1;
                    const menuName: string = `sidebar-menu-${dept}-${index}`;
                    return (
                      <ListCategory
                        data={menu}
                        key={menuName}
                        menuIndex={index}
                      />
                    );
                  })}
                </ul>
              )}
              {item.label === "menu-brands" && (
                <ul
                  className="text-body text-sm py-5"
                  style={{ columnCount: 2 }}
                >
                  {brands?.map((menu: any, index: number) => {
                    const dept: number = 1;
                    const menuName: string = `sidebar-menu-${dept}-${index}`;
                    return (
                      <ListBrand data={menu} key={menuName} menuIndex={index} />
                    );
                  })}
                </ul>
              )}
              {/*  {item.subMenu.map((menu: any, index: number) => {
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
                })}
            </div>
          )} */}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
