import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import { getDirection } from "@utils/get-direction";
import Head from "next/head";
//import { siteSettings } from "@settings/site-settings";
import React from "react";
import axios from "axios";

export const Context = React.createContext({
  user: {},
  setUser: (_p: object) => {},
  order: {},
  setOrder: (_p: object) => {},
  domain: {},
  setDomain: (_p: object) => {},
  products: {},
  setProducts: (_p: object) => {},
});
function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}
const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  // const { isAuthorized } = useUI();
  const router = useRouter();

  const dir = getDirection(router.locale);
  const [title, setTitle] = useState("");
  const [fav_icon, setFav_icon] = useState("");
  const [user, setUser] = useState({});
  const [order, setOrder] = useState({});
  const [domain, setDomain] = useState<any>({});
  const [products, setProducts] = useState<any>({});
  const [business, setBusiness] = useState<any>();
  let connector_base_url=process.env.NEXT_PUBLIC_IGNITE_CONNECTOR_BASE_URL
  let storefront_base_url=process.env.NEXT_PUBLIC_IGNITE_STOREFRONT_BASE_URL
  useEffect(() => {
    let host = window.location.host;
    let parts = host.split(".");
    setBusiness(parts[0]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        connector_base_url+`/business/${business}`,
        {
          method: "get",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTitle(data.data[0].name);
          setFav_icon(data.data[0].fav_icon);
          setDomain(data.data[0]);
          localStorage.setItem("domainData", JSON.stringify(data.data[0]));
          localStorage.setItem("user_token", data.data[0].token);
        })
        .catch((_error) => {
          //console.log(error);
        });
    };
{business!=undefined&& fetchData(); }

   
    /*    const localData = JSON.parse(localStorage.getItem("domainData")!);

    setDomain((prev) => ({ ...prev, ...localData })); */
  }, [business]);

  useEffect(() => {
    const getProduct = () => {
      axios({
        method: "get",
        url: storefront_base_url+"/products",
        // data: bodyFormData,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${domain.token}`,
        },
      })
        .then((response: any) => {
          // console.log(response.data, "this is product detail");
          setProducts(response.data);
        })
        .catch(function (err: any) {
          //handle error
          console.log(err);
        });
    };
  {Object.keys(domain).length!=0 &&   getProduct();}
   
  
  }, [domain]);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  //console.log(order, "orders");
  //console.log(user, "user Data");
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Context.Provider
        value={{
          user,
          setUser,
          order,
          setOrder,
          domain,
          setDomain,
          products,
          setProducts,
        }}
      >
        <Head>
          <title>{title}</title>

          <link rel="icon" href={fav_icon} />
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          ></meta>
        </Head>

        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <ManagedUIContext>
                <Layout pageProps={pageProps}>
                  <DefaultSeo />
                  <Component {...pageProps} key={router.route} />
                  <ToastContainer />
                </Layout>
                <ManagedModal />
                <ManagedDrawer />
              </ManagedUIContext>
            </Hydrate>
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </AnimatePresence>
      </Context.Provider>
    </>
  );
};

export default appWithTranslation(CustomApp);
