"use client";

import { BottomNavigation } from "./navigation/bottomnavigation";
import { DefaultLayout } from "./components/layout";
import HomePage from "./home/home";
import MyPage from "./mypage/mypage";
import LikesPage from "./likes/likes";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const MainPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLogin } = useSelector((state: any) => state.poppingUser.user);

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

  const loginValid = (index: number) => {
    if (isLogin) {
      if (index === 3) {
        router.replace("/?page=likes");
      } else {
        // index가 4일 경우
        router.replace("/?page=mypage");
      }
    } else {
      alert("로그인 후 이용가능합니다.");
      router.push(
        `/member/signin?redirect=${encodeURIComponent(
          window.location.pathname
        )}`
      );
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
              loginValid(3);
              break;
            case 4:
              loginValid(4);
              break;
          }
        }}
        currentIndex={getPageIndex(searchParams.get("page")) ?? 5}
      />
    </DefaultLayout>
  );
};

export default MainPage;
