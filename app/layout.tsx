import type { Metadata } from "next";
import React from "react";
import GlobalStyle from "@/public/styles/global";
import CommonProvider from "./redux/provider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "POPPING",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="ko">
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
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