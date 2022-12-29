import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { useContext } from "react";
//import axios from "axios";
import { Context } from "src/pages/_app";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { domain }: any = useContext(Context);
  // console.log(domain);

  /*  useEffect(() => {
    let host = window.location.host;
    let parts = host.split(".");
    setBusiness(parts[0]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: "get",
        url: `http://pos-dev.myignite.online/connector/api/business/${business}`,
        headers: {
          "Content-Type": "Application/json",
        },
      })
        .then((response) => {
          console.log(response.data.data[0]);
          setFetchLogo(response.data.data[0].logo);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [business]);
 */
  return (
    <div className="flex-1">
      <Link
        href={siteSettings.logo.href}
        className={cn("inline-flex focus:outline-none", className)}
        {...props}
      >
        {domain && domain.logo != null ? (
          <Image
            id="logoImg"
            src={domain.logo}
            alt={siteSettings.logo.alt}
            height={siteSettings.logo.height}
            width={siteSettings.logo.width}
            layout="fixed"
            loading="eager"
          />
        ) : (
          <Image
            id="logoImg"
            src={"/assets/images/default.png"}
            alt={siteSettings.logo.alt}
            height={siteSettings.logo.height}
            width={siteSettings.logo.width}
            layout="fixed"
            loading="eager"
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
