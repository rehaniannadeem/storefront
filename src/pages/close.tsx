// import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StoreClose from "@components/storeClose/storeClose";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";


export default function ErrorPage() {
    const [business,setBusiness]=useState('')
    useEffect(()=>{
        let host = window.location.host;
        let parts = host.split(".");
        setBusiness(parts[0])
        // console.log(parts[0],'router');
    },[])
  
	return <StoreClose business={business} />;
}

// ErrorPage.Layout = Layout;

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
