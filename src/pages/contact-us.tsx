import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
//import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
//import ContactForm from "@components/common/form/contact-form";
//import ContactInfoBlock from "@containers/contact-info";
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { Context } from "./_app";
import { useContext } from "react";
//import parse from "html-react-parser";
export default function ContactUsPage() {
  const { domain }: any = useContext(Context);

  return (
    <>
      <PageHeader pageHeader="text-page-about-us" />
      <div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row">
            {/*   {domain && <p>{domain.about_us}</p>} */}

            {domain.about_us && (
              <div dangerouslySetInnerHTML={{ __html: `${domain.about_us}` }} />
            )}
            {/* <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
							<ol className="sticky md:top-16 lg:top-28 z-10">
								{termsAndServices?.map((item, index) => (
									<li key={item.id}>
										<Link
											spy={true}
											offset={-120}
											smooth={true}
											duration={500}
											to={makeTitleToDOMId(item.title)}
											activeClass="text-heading font-semibold"
											className="block cursor-pointer py-3 lg:py-3.5 text-sm lg:text-base  text-gray-700 uppercase"
										>
											{(index <= 9 ? "0" : "") +
												index +
												" " +
												t(`${item.title}`)}
										</Link>
									</li>
								))}
							</ol>
						</nav> */}
            {/* End of section scroll spy menu */}

            {/* <div className="md:w-9/12 md:ps-8 ">
							{termsAndServices?.map((item) => (
								// @ts-ignore
								<Element
									key={item.title}
									id={makeTitleToDOMId(item.title)}
									className="mb-10"
								>
									<h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
										{t(`${item.title}`)}
									</h2>
									<div
										className="text-heading text-sm leading-7 lg:text-base lg:leading-loose"
										dangerouslySetInnerHTML={{
											__html: t(`${item.description}`),
										}}
									/>
								</Element>
							))}
						</div> */}
            {/* End of content */}
          </div>
        </Container>
      </div>
    </>
  );
}

ContactUsPage.Layout = Layout;

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
