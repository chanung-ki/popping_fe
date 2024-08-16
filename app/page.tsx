"use client";

import { BottomNavigation } from "./navigation/bottomnavigation";
import { DefaultLayout } from "./components/layout";
import HomePage from "./home/home";
import MyPage from "./mypage/mypage";
import LikesPage from "./likes/likes";
import { useRouter, useSearchParams } from "next/navigation";

const MainPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPageIndex = (param: string | null) => {
    switch (param) {
      case null:
        return 0;
      case "likes":
        return 3;
      case "mypage":
        return 4;
    }
  };

  return (
    <DefaultLayout top={"0"} right={"0"} bottom={"0"} left={"0"}>
      {searchParams.get("page") === null && <HomePage />}
      {searchParams.get("page") === "likes" && <LikesPage />}
      {searchParams.get("page") === "mypage" && <MyPage />}
      <BottomNavigation
        onClick={(index: number) => {
          switch (index) {
            case 0:
              router.replace("/");
              break;
            case 1:
              break;
            case 2:
              router.push("/online-popup/Popping/store-openning");
              break;
            case 3:
              router.replace("/?page=likes");
              break;
            case 4:
              router.replace("/?page=mypage");
              break;
          }
        }}
        currentIndex={getPageIndex(searchParams.get("page")) ?? 5}
      />
    </DefaultLayout>
  );
};

export default MainPage;
