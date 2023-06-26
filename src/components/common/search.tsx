import React, { useRef, useEffect, useState } from "react";
import cn from "classnames";
import SearchResultLoader from "@components/ui/loaders/search-result-loader";
import { useUI } from "@contexts/ui.context";
import SearchBox from "@components/common/search-box";
//import { useSearchQuery } from "@framework/product/use-search";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Scrollbar from "@components/common/scrollbar";
import SearchProduct from "@components/common/search-product";

import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
// import { Context } from "src/pages/_app";


export default function Search(token:any) {
  const router = useRouter();
  const { displaySearch, closeSearch } = useUI();
  // const { products }: any = useContext(Context);
  const [searchText, setSearchText] = useState("");
  // const [productData, setProductData] = useState<any>();
  // const [domain, setDomain] = useState<any>();
  const [filterArray, setFilterArray] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  let storefront_base_url = process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  /*   const { data, isLoading } = useSearchQuery({
    text: searchText,
  }); */
  //console.log(data, "search data");


  // useEffect(() => {
  //   setProductData(products);
  // }, [products]);
  // useEffect(() => {
  //   var domainData = JSON.parse(localStorage.getItem("domainData")!);
  //   setDomain(domainData)
  // })

// console.log(token,'domaindomain');

  function GetFunction(value: any) {
   setIsLoading(true)
    try {   
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      };
  
      return new Promise((resolve, reject) => {
        fetch(`${storefront_base_url}/products?name=${value}`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (value) {
              // console.log(data, 'datadata', value);
              setFilterArray(data);
            }
            setIsLoading(false);
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
            setIsLoading(false)
          });
      });
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
   
    // if (searchText) {
    //   setIsLoading(true)
    //   fetchData();
    // }

    if (!searchText) {
      setFilterArray([])
    }

  }, [searchText])
// console.log(closeSearch,'sdjfhasdf');

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
    router.push(`${ROUTES.SEARCH}?name=${encodeURIComponent(searchText)}`);
    closeSearch()
    // setTimeout(() => {
     
    // }, 600);
  }
  const handleAutoSearch = (e: any) => {
  setSearchText(e.target.value)
    
    setTimeout(() => {
      if(e.target.value){
        GetFunction(e.target.value);
      }
    }, 1000);
   

  }
  function clear() {
    setSearchText("");
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (displaySearch) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [displaySearch]);
  return (
    <div ref={ref}>
      <div
        className={cn("overlay", {
          open: displaySearch,
        })}
        role="button"
        onClick={closeSearch}
      />
      <div
        className={cn(
          "drawer-search relative hidden top-0 z-30 opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px]",
          {
            open: displaySearch,
          }
        )}
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
            <div className="flex flex-col mx-auto mb-1.5 w-full ">
          
              <SearchBox
                onSubmit={handleSearch}
                onChange={handleAutoSearch}
                name="search"
                value={searchText}
                onClear={clear}
                ref={(input) => input && input.focus()}
              />
            </div>

            <div className="bg-white flex flex-col rounded-md overflow-hidden h-full max-h-64vh lg:max-h-[550px]">
              <Scrollbar className="os-host-flexbox">
                <div className="h-full">
                  {isLoading ? (
                    <div className="p-5 border-b border-gray-300 border-opacity-30 last:border-b-0">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <SearchResultLoader
                          key={idx}
                          uniqueKey={`top-search-${idx}`}
                        />
                      ))}
                    </div>
                  ) : (
                    filterArray?.map((item: any, index: any) => {

                      return (
                        <div
                          className=" p-5 border-b border-gray-150 relative last:border-b-0"
                          onClick={closeSearch}
                        >
                          <SearchProduct item={item} key={index} />
                        </div>
                      );

                    })
                  )}
                </div>
              </Scrollbar>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
