import { Metadata } from "next";
// import logoImg from "@public/logo-ozip.png";
// import logoIconImg from "@public/logo-ozip.png";
import logoImg from "@public/ic_launcher.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { LAYOUT_OPTIONS } from "./enums";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Attend Smart Admin",
  description: `Attend Smart Admin`,
  logo: logoImg,
  icon: logoImg,
  // logo: "/logo.png",
  // icon: "/logo-short.png",
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Attend Smart Admin` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Attend Smart Admin` : title,
      description,
      siteName: "Attend Smart Admin", // https://developers.google.com/search/docs/appearance/site-names
      locale: "id_ID",
      type: "website",
      // url: "https://isomorphic-furyroad.vercel.app",
      // images: {
      //   url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png",
      //   width: 1200,
      //   height: 630,
      // },
    },
  };
};
