import { DefaultSeo as NextDefaultSeo } from "next-seo";
import { siteSettings } from "@settings/site-settings";
import { useContext } from "react";
import { Context } from "src/pages/_app";

export const DefaultSeo = () => {
  const { domain }: any = useContext(Context);


const meta_title:string=domain?.meta_title;
const meta_description:string=domain?.meta_description;
const manifest:any={
  name: "Myignite",
  short_name: "myignite",
  theme_color: "#ffffff",
  background_color: "#004740",
  display: "fullscreen",
  orientation: "portrait",
  scope: "/",
  start_url: "/",
  icons: [
    {
      src: "icons/manifest-icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable any"
    },
    {
      src: "icons/manifest-icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable any"
    }
  ],
  "splash_pages": null
}

//console.log('>>>>>>>>>>>',meta_description )
//sconst fav_icon:string=domain?.fav_icon;
  return (
    <NextDefaultSeo
      title={meta_title===null || meta_title===undefined ? "": meta_title}
      description={meta_description===null || meta_description===undefined ? "": meta_description}
      openGraph={{
        type: "website",
        locale: "en_IE",
        site_name: siteSettings.name,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "mafifest",
          href: manifest,
        },
       
        // {
        //   rel: "manifest",
        //   href: "/manifest.json",
        // },
      ]}
    />
  );
};
