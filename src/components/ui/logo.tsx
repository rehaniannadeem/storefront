import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { useContext } from "react";
//import axios from "axios";
import { Context } from "src/pages/_app";

const Logo = ({ width, height, className, ...props }: any) => {
  const { domain }: any = useContext(Context);

  return (
    <div>
      <Link
        href={siteSettings.logo.href}
        className={cn("inline-flex focus:outline-none p-2", className)}
        {...props}
      >
        {domain && domain.logo != null ? (
          <Image
            id="logoImg"
            src={domain.logo}
            alt={"img"}
            height={width}
            width={height}
            layout="fixed"
            loading="eager"
            className="object-contain "
          />
        ) : (
          <Image
            id="logoImg"
            src={"/assets/images/default.png"}
            alt={"img"}
            height={width}
            width={height}
            layout="fixed"
            loading="eager"
            className="object-cover"
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
