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

  const [faceLink, setFaceLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
const[isLoading,setIsLoading]=useState(false)
  //  const [aboutUs, setAboutUs] = useState("#");
  //  const [privacyPolicy, setPrivacyPolicy] = useState("#");
  // const [termCondition, setTermCondition] = useState("#");

  // const [_domainData, setDomainData] = useState({});
  //business_location
  // console.log("sdljkfsldfk", domain.business_location);

  useEffect(() => {
    setIsLoading(true)
    if (domain.instagram != null) {
      setInstaLink(domain.instagram);
    }
    if (domain.facebook != null ) {
      setFaceLink(domain.facebook);
     ;
    }
    {
      domain?.business_location?.email && setEmail(domain.business_location.email);
    }
    {
      domain?.business_location?.mobile && setMobile(domain.business_location.mobile);
    }
    setIsLoading(false)
    /*    if (domain.about_us != null) {
      setAboutUs(domain.about_us);
    }
    if (domain.privacy_policy != null) {
      setPrivacyPolicy(domain.privacy_policy);
    }
    if (domain.term_condition != null) {
      setTermCondition(domain.term_condition);
    } */
  
    // if (domain?.whatsapp_no != null) {
    //   setMobile(domain?.whatsapp_no);
    // }

  }, [domain]);
  ;

  footer.widgets[0].lists[0].path = instaLink;
  footer.widgets[0].lists[1].path = faceLink;
  //footer.widgets[2].lists[0].path = aboutUs;
  // footer.widgets[3].lists[0].path = privacyPolicy;
  // footer.widgets[3].lists[1].path = termCondition;
  footer.widgets[1].lists[0].title = email;
  footer.widgets[1].lists[1].title = mobile;
  if(isLoading){
    return <div></div>
  }

  
  return (
    <div className={`${className} bg-white rounded-md shadow-md p-4 lg:p-6`}>
    <h4 className="text-heading text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-4 lg:mb-6">
      {t(`${widgetTitle}`)}
    </h4>
    <ul
      id="mylist"
      className="text-xs md:text-sm text-body flex flex-col space-y-3 lg:space-y-4"
    >
      {lists.map((list) => (
      <li key={`widget-list--key${list.id}`} className="flex items-center whitespace-normal md:whitespace-nowrap lg:whitespace-normal">
      {list?.path && (
        <>
          <span className="mr-2 md:mr-3 lg:mr-4 relative top-0.5 text-sm lg:text-base">
            {list.icon}
          </span>
          <Link href={list.path}>
            <a className="transition-colors duration-200 hover:text-black break-all">
              {t(`${list.title}`)}
            </a>
          </Link>
        </>
      )}
    </li>
        
      ))}
    </ul>
  </div>
  );
};

export default WidgetLink;
