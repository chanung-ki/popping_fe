"use client";

import { useState } from "react";
import { BottomNavigation } from "./navigation/bottomnavigation";
import { DefaultLayout } from "./components/layout";
import HomePage from "./home/home";
import MyPage from "./mypage/mypage";
import LikesPage from "./likes/likes";

const MainPage = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <DefaultLayout top={"0"} right={"0"} bottom={"0"} left={"0"}>
      {pageIndex === 0 && <HomePage />}
      {pageIndex === 3 && <LikesPage />}
      {pageIndex === 4 && <MyPage />}
      <BottomNavigation
        onClick={(index: number) => {
          setPageIndex(index);
        }}
        currentIndex={pageIndex}
      />
    </DefaultLayout>
  );
};

export default MainPage;
