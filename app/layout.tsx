import type { Metadata } from "next";
import React from "react";
import GlobalStyle from "@/public/styles/global";

export const metadata: Metadata = {
  title: "POPPING",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="ko">
    <GlobalStyle />
    <body>{children}</body>
  </html>
);

export default RootLayout;
