import React, { useRef, useEffect, useContext, useState } from "react";
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
import { Context } from "src/pages/_app";

export default function Search() {
  const { displaySearch, closeSearch } = useUI();
  const { products }: any = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [productData, setProductData] = useState<any>();
  const [filterArray, setFilterArray] = useState<any>();
  /*   const { data, isLoading } = useSearchQuery({
    text: searchText,
  }); */
  //console.log(data, "search data");
  useEffect(() => {
    setProductData(products);
  }, [products]);

useEffect(()=>{

  if(searchText.length!=0){
  setTimeout(() => {
      let filter=  productData?.filter((item: any) => {
        if (
          item?.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        ) {
          return item;
        }
      })
      setFilterArray(filter)
  }, 1000);
}
 

  if(searchText.length===0){
    setFilterArray([])
  }
  
},[searchText])


  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  // function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
  //   setSearchText(e.currentTarget.value);
  // }
  function clear() {
    setSearchText("");
  }
//console.log('>>>>>>>>>>>', productData)
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
                onChange={(e)=>{setSearchText(e.currentTarget.value)}}
                name="search"
                value={searchText}
                onClear={clear}
                ref={(input) => input && input.focus()}
              />
            </div>
            {filterArray && (
              <div className="bg-white flex flex-col rounded-md overflow-hidden h-full max-h-64vh lg:max-h-[550px]">
                <Scrollbar className="os-host-flexbox">
                  <div className="h-full">
                    {!productData ? (
                      <div className="p-5 border-b border-gray-300 border-opacity-30 last:border-b-0">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        ))}
                      </div>
                    ) : (
                    
                        // ?.filter((item: any) => {
                        //   if (
                        //     item?.name
                        //       .toLocaleLowerCase()
                        //       .includes(searchText.toLocaleLowerCase())
                        //   ) {
                        //     return item;
                        //   }
                        // })
                        filterArray?.map((item: any, index: any) => {
                          // if (
                          //   item.name.toLocaleLowerCase() === "open product"
                          // ) {
                          //   item.visibility = "hidden";
                          // } else {
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
