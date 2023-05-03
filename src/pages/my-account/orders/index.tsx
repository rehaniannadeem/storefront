import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import Loader from "@components/ui/loaders/loader/loader";
import { useUI } from "@contexts/ui.context";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrdersTablePage() {
	const {
		isAuthorized,
	  } = useUI();
	
	const [isLoading,setIsLoading]=useState(false)
	const router=useRouter()
	  useEffect(() => {
		setIsLoading(true)
		if(router.asPath.includes("my-account") && !isAuthorized){
		 router.push('/')
		//  setTimeout(() => {
		//   setIsLoading(false)
		// }, 1500);
		}else{
		  setIsLoading(false)
		}
	   
		 
	  }, []);

	  if(isLoading){
		return <Loader/>
	  }
	return (
		<AccountLayout>
			<OrdersTable />
		</AccountLayout>
	);
}

OrdersTablePage.Layout = Layout;

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
