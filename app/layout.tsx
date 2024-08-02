import type { Metadata } from "next";
import React from "react";
import GlobalStyle from "@/public/styles/global";

export const metadata: Metadata = {
  title: "Popping!",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <GlobalStyle />
    <body>{children}</body>
  </html>
);

export default RootLayout;
