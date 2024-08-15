import type { Metadata } from "next";
import React from "react";
import GlobalStyle from "@/public/styles/global";
import CommonProvider from "./redux/provider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "POPPING",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      {
        url: "/favicons/android-icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      { url: "/favicons/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicons/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicons/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicons/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicons/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicons/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicons/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicons/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180" },
      {
        url: "/favicons/apple-icon.png",
      },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/favicons/manifest.json",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="ko">
    <Head>
      {/* Font */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
      />

      {/* Use async and defer attributes for the script */}
      <script
        type="text/javascript"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=ac2db24dbfbd7f14b74f515ed599011d&libraries=services,clusterer,drawing`}
        async
        defer
      ></script>
    </Head>
    <GlobalStyle />
    <body>
      <CommonProvider>{children}</CommonProvider>
    </body>
  </html>
);

export default RootLayout;
