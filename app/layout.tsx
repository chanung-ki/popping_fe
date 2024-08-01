"use client";
import type { Metadata } from "next";
import React from "react";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "Popping!",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <SaftyArea>{children}</SaftyArea>
  </html>
);

const SaftyArea = styled.body`
  padding: 60px 0px 35px 0px;
`;

export default RootLayout;
