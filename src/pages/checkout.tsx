//import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
//import Subscription from "@components/common/subscription";
//import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
//import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
//import { useUI } from "@contexts/ui.context";
import { useState, useEffect } from "react";
//import { useTranslation } from "next-i18next";
//import axios from "axios";

export default function CheckoutPage() {
  //const { isAuthorized, openModal, setModalView } = useUI();
  // const [isLogin, setIsLogin] = useState();
  //const [user, setUser] = useState(false);
  const [_domainData, setDomainData] = useState<any>({});
  //const [userName, setUserName] = useState(value.name);
  // const { t } = useTranslation();
  // console.log(isAuthorized);

  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
  }, []);
  /*   useEffect(() => {
    setUser(isAuthorized);
  }, [isAuthorized]);
 */
  return (
    <>
      {/*  <PageHeader pageHeader="text-page-checkout" /> */}
      <>
        <CheckoutForm />
      </>
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
