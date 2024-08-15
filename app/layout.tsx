import type { Metadata } from "next";
import React from "react";
import GlobalStyle from "@/public/styles/global";
import CommonProvider from "./redux/provider";

export const metadata: Metadata = {
  title: "POPPING",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="ko">
    <GlobalStyle />
    <body>
      <CommonProvider>{children}</CommonProvider>
    </body>
  </html>
);

export default RootLayout;
