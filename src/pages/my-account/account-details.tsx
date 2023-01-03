import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AccountDetails from "@components/my-account/account-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Loader from "@components/ui/loaders/loader/loader";
import { useTranslation } from "next-i18next";
export default function AccountDetailsPage() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    setLoadingData(true);
    var user = JSON.parse(localStorage.getItem("userData")!);
    if (user) {
      setUserData(user);
    }
    setLoadingData(false);
  }, []);

  if (loadingData) return <Loader text={t("common:text-loading")} />;
  return (
    <AccountLayout>
      <AccountDetails data={userData} />
    </AccountLayout>
  );
}

AccountDetailsPage.Layout = Layout;

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
