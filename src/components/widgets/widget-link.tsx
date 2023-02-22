import { FC, useContext } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { footer } from "./../layout/footer/data";
import { Context } from "src/pages/_app";

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { t } = useTranslation("footer");
  const { domain }: any = useContext(Context);
  // console.log(domain);
  
  const [faceLink, setFaceLink] = useState("#");
  const [instaLink, setInstaLink] = useState("#");
  //  const [aboutUs, setAboutUs] = useState("#");
  //  const [privacyPolicy, setPrivacyPolicy] = useState("#");
  // const [termCondition, setTermCondition] = useState("#");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  // const [_domainData, setDomainData] = useState({});
  //business_location
  // console.log("sdljkfsldfk", domain.business_location);

  useEffect(() => {
    if (domain.facebook != null && domain.instagram != null) {
      setFaceLink(domain.facebook);
      setInstaLink(domain.instagram);
    }
    /*    if (domain.about_us != null) {
      setAboutUs(domain.about_us);
    }
    if (domain.privacy_policy != null) {
      setPrivacyPolicy(domain.privacy_policy);
    }
    if (domain.term_condition != null) {
      setTermCondition(domain.term_condition);
    } */
    {
      domain.business_location && setEmail(domain.business_location.email);
    }
if(domain?.whatsapp_no!=null){
  setMobile(domain?.whatsapp_no);
}
   
  }, [domain]);
  // console.log(">>>>>>>>>>>", lists);

  footer.widgets[0].lists[0].path = instaLink;
  footer.widgets[0].lists[1].path = faceLink;
  //footer.widgets[2].lists[0].path = aboutUs;
  // footer.widgets[3].lists[0].path = privacyPolicy;
  // footer.widgets[3].lists[1].path = termCondition;
    footer.widgets[1].lists[0].title = email;
  footer.widgets[1].lists[1].title = mobile;
  return (
    <div className={`${className}`}>
      <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
        {t(`${widgetTitle}`)}
      </h4>
      <ul
        id="mylist"
        className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5"
      >
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                {list.icon}
              </span>
            )}
            <Link href={list.path ? list.path : "#!"}>
              <a className="transition-colors duration-200 hover:text-black">
                {t(`${list.title}`)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
