import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyPagePopper } from "./popper";
import { MyPagePopple } from "./popple";
import { removeCookie } from "@/public/network/cookie";
import { initUser } from "../redux/reducers/poppingUser";
import axiosInstance from "@/public/network/axios";
import { myPagePoppleTypes } from "@/public/utils/types";
import { Loading } from "../components/loading";
import { BottomBox, DefaultLayout } from "../components/layout";

const MyPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hasAlerted = useRef<boolean>(false);

  const [isPopple, setIsPopple] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { isLogin, isPopper, nickname, profileImage } = useSelector(
    (state: any) => state.poppingUser.user
  );
  const [myPageData, setMyPageData] = useState<myPagePoppleTypes>({
    followingNum: 0,
    point: "",
    gradeInfo: {
      grade: "",
      minOrderAmount: "",
      maxOrderAmount: "",
      earnRate: 0,
      discountRate: 0,
      gradeRatio: 0,
      nextGradeInfo: {
        nextGrade: "",
        nextMinOrderAmount: "",
      },
    },
  });

  useEffect(() => {
    if (!isLogin && !hasAlerted.current) {
      alert("로그인 후 이용가능합니다.");
      hasAlerted.current = true; // alert 호출 후 true로 설정
      router.push(
        `/member/signin?redirect=${encodeURIComponent(window.location.href)}`
      );
    }
    if (isLogin) {
      setIsPopple(!isPopper);
      if (!isPopper) {
        getMyPageDataApi();
      }
    }
  }, [isLogin, router]);

  // logout Func
  const cleanUserData = () => {
    dispatch(initUser());
    removeCookie("csrftoken");
    removeCookie("sessionid");
  };

  // api
  const signOutApi = async () => {
    try {
      const response = await axiosInstance.post(`/api/user/signout`);
      if (response.status === 200) {
        cleanUserData();
        alert("로그아웃이 완료되었습니다.");
        hasAlerted.current = true;
        router.push("/");
      }
    } catch (error) {
      // 오류가 발생해도 프론트단에서 로그아웃 처리
      cleanUserData();
      alert("로그아웃이 완료되었습니다.");
      hasAlerted.current = true;
      router.push("/");
    }
  };

  // api
  const getMyPageDataApi = async () => {
    try {
      const response = await axiosInstance.get(`/api/user/mypage`);
      if (response.status === 200) {
        setMyPageData(response.data);
        setIsReady(true);
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        cleanUserData();
        alert("로그인 세션이 만료되었습니다. 재로그인 후 이용해주세요.");
        router.push("/member/signin");
      } else {
        alert("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
      }
      router.push("/");
    }
  };
  return (
    <DefaultLayout top={0} right={20} bottom={0} left={20} isScrollable={true}>
      {isLogin && isPopple && myPageData.gradeInfo.grade !== "" && isReady ? (
        <MyPagePopple
          nickname={nickname}
          profileImage={profileImage}
          myPageData={myPageData}
          signOutApi={signOutApi}
        />
      ) : isLogin && !isPopple ? (
        <MyPagePopper
          nickname={nickname}
          profileImage={profileImage}
          signOutApi={signOutApi}
        />
      ) : (
        <Loading />
      )}

      <BottomBox />
    </DefaultLayout>
  );
};

export default MyPage;
