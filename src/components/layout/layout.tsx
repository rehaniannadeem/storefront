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
        title=""
        description="myIgnite Solutions"
        canonical="https://spnbxmyignite.netlify.app/"
        openGraph={{
          url: "https://spnbxmyignite.netlify.app/",
          title: "myIgnite solution",
          description: "myIgnite Solutions",
          images: [
            {
              url: "/assets/images/Ignite-Vertical.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/Ignite-Vertical.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
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
        (<div className="bottom-0 right-0 fixed w-12 mr-8 mb-20 z-10">
          <a href={`https://wa.me/${domain.whatsapp_no}`} target="_blank">
            <img
              src="/assets/images/whatsapp.png"
              alt="whatsapp"
              className="rounded-full drop-shadow-2xl"
            />
          </a>
        </div>):(null)}
      </main>
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
