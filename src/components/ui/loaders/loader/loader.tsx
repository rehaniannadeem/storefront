import cn from "classnames";
import styles from "./loader.module.css";
import { useEffect, useState } from "react";
interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

const Loader = (props: Props) => {
  const { className, showText = true, text = "Loading...", simple } = props;
const [domainData,setDomainData]=useState<any>({})
  useEffect(()=>{
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
     
    }

  },[])
  return (
    <>
      {simple ? (
        <div className={cn(className, styles.simple_loading)} />
      ) : (
        <div
          className={cn(
            "w-full flex flex-col items-center justify-center",
            className
          )}
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div  className={styles.loading} 
          style={{
              borderTopColor: domainData.theme_color,
           
             
              
          }}/>

          {showText && (
            <h3 className="text-lg font-semibold text-body italic">{text}</h3>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
