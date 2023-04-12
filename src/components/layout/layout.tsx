import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";

//import CookieBar from "@components/common/cookie-bar";
//import { useAcceptCookies } from "@utils/use-accept-cookies";
//import Button from "@components/ui/button";
//import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { Context } from "src/pages/_app";

const Layout: React.FC = ({ children }) => {
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  //const { t } = useTranslation("common");
  const { domain }: any = useContext(Context);
  //const [domainData, setDomainData] = useState<any>({});
//console.log(domain);

const meta_title:string=domain?.meta_title;
const meta_description:string=domain?.meta_description;
const fav_icon:string=domain?.fav_icon;

  /*  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);

    setDomainData(domainData);
  }, []); */
  //console.log(domainData, "data");
  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title={domain?.meta_title}
      description={domain?.meta_description}
        canonical=""
        openGraph={{
          url: "",
          title: `${meta_title}`,
          description: `${meta_description}`,
          images: [
            {
              url:`${fav_icon}`,
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: `${fav_icon}`,
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
      {/* {domain?.name!=="urbannecessity"?   <Header />:null} */}
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
        {domain?.whatsapp_no!=null?
        (<div className="bottom-0 left-0 fixed w-12 ml-8 mb-20 z-10">
          <a href={`https://wa.me/${domain.whatsapp_no}`} target="_blank">
            <img
              src="/assets/images/whatsapp.png"
              alt="whatsapp"
              className="rounded-full drop-shadow-2xl"
            />
          </a>
        </div>):(null)}
      </main>
      {/* {domain?.name!=="urbannecessity"? <Footer /> : null} */}

      <Footer />
      <MobileNavigation />
      <Search />
      {/* <CookieBar
        title={t("text-cookies-title")}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant="slim">
            {t("text-accept-cookies")}
          </Button>
        }
      /> */}
    </div>
  );
};

export default Layout;
