import Container from "@components/ui/container";
import { siteSettings } from "@settings/site-settings";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext } from "react";
//import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { Context } from "src/pages/_app";
interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
//{ payment } copyright props
const Copyright: React.FC<CopyrightProps> = () => {
  const { t } = useTranslation("footer");
  const { domain }: any = useContext(Context);
  // const [faceLink, setFaceLink] = useState("#");
  // const [instaLink, setInstaLink] = useState("#");
  // const [domainData, setDomainData] = useState<any>({});

  /*   useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
  }, []); */
  /*   useEffect(() => {
    if (domain.facebook != null && domain.instagram != null) {
      setFaceLink(domain.facebook);
      setInstaLink(domain.instagram);
    }
  }, [domain]); */

  return (
    <div className="border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container className="flex flex-col-reverse md:flex-row text-center md:justify-between">
        <div className="flex flex-row">
          <p className="text-body text-xs lg:text-sm leading-6 ">
            {t("text-copyright")} &copy; {year}&nbsp;
            <a
              className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
              href={siteSettings.author.websiteUrl}
              style={{ color: domain.theme_color }}
            >
              {domain.name}
            </a>
            &nbsp; {t("text-all-rights-reserved")}.
          </p>
          {/*   <div className="px-2 text-2xl">
            <Link href={instaLink}>
              <a target="_blank">
                <IoLogoInstagram
                  className="rounded"
                  style={{
                    color: "white",
                    background: "linear-gradient(#1a2a6c, #b21f1f,#fdbb2d)",
                  }}
                />
              </a>
            </Link>
          </div>
          <div className="px-2 text-2xl">
            <Link href={faceLink}>
              <a target="_blank">
                {" "}
                <IoLogoFacebook style={{ color: "#1d48fd" }} />
              </a>
            </Link>
          </div> */}
        </div>
        <div>
          {t("powered-by")}{" "}
          <Link href="https://www.ignitehq.io/">
            <a
              className=" font-bold"
              target="_blank"
              style={{ color: domain.theme_color }}
            >
              {" "}
              Ignite Commerce Cloud
            </a>
          </Link>
        </div>

        {/*   {payment && (
          <ul className="hidden md:flex flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 md:mb-0 transition hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : "/#"} target="_blank">
                  <img
                    src={item.image}
                    alt={t(`${item.name}`)}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )} */}
      </Container>
    </div>
  );
};

export default Copyright;
