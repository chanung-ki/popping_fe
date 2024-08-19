import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconChevronRight, IconGear } from "../components/icons";
import DummyProfile from "@/public/images/dummy/dummy_profile.jpg";
import DummyStore from "@/public/images/dummy/dummy_store.jpg";
import { DefaultLayout, Spacer } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";
import { ProfileImage } from "../components/main/componenets";
import { ButtonSmall } from "../components/buttons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/public/network/axios";
import { useEffect, useRef, useState } from "react";
import { removeCookie } from "@/public/network/cookie";
import { initUser } from "../redux/reducers/poppingUser";

export const MyPagePopper: React.FC = () => {
  // type myPageTypes = {
  //   followingNum: number;
  //   point: string;
  //   gradeInfo: {
  //     grade: string;
  //     minOrderAmount: number;
  //     maxOrderAmount: number;
  //     earnRate: number;
  //     discountRate: number;
  //   };
  // };
  const dispatch = useDispatch();
  const router = useRouter();

  const hasAlerted = useRef<boolean>(false);
  const { isLogin, nickname } = useSelector(
    (state: any) => state.poppingUser.user
  );

  // const [myPageData, setMyPageData] = useState<myPageTypes>({
  //   followingNum: 0,
  //   point: "",
  //   gradeInfo: {
  //     grade: "",
  //     minOrderAmount: 0,
  //     maxOrderAmount: 0,
  //     earnRate: 0,
  //     discountRate: 0,
  //   },
  // });

  const cleanUserData = () => {
    dispatch(initUser());
    removeCookie("csrftoken");
    removeCookie("sessionid");
  };

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
      alert("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
    }
  };

  const getMyPageDataApi = async () => {
    try {
      const response = await axiosInstance.get(`/api/user/mypage`);
      if (response.status === 200) {
        // setMyPageData(response.data);
      }
    } catch (error: any) {
      if (error.response.statue === 403) {
        cleanUserData();
        alert("로그인 세션이 만료되었습니다. 재로그인 후 이용해주세요.");
        router.push("/member/signin");
      } else {
        alert("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
      }
      router.push("/");
    }
  };

  useEffect(() => {
    if (!isLogin && !hasAlerted.current) {
      alert("로그인 후 이용가능합니다.");
      hasAlerted.current = true; // alert 호출 후 true로 설정
      router.push("/member/signin");
    }
    if (isLogin) {
      getMyPageDataApi();
    }
  }, [isLogin, router]);

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavLogoContainer>
          <LogoLettersMain width={undefined} height={24} />
        </TopNavLogoContainer>
        <TopNavRightContainer>
          <IconGear color={COLORS.secondaryColor} width={20} height={20} />
        </TopNavRightContainer>
      </TopNavigation>
      <Container>
        <MyInfo>
          <MyProfile>
            <MyProfileContainer>
              <ProfileImage image={DummyProfile.src} width={60} height={60} />
              {/* <ProfileNickname>{nickname}님</ProfileNickname> */}
              <ProfileNickname>{nickname}</ProfileNickname>
              <ProfileBottomText>
                팔로워 <span>{300}</span>
              </ProfileBottomText>
              <ButtonSmall
                text={"프로필 설정"}
                backgroundColor={COLORS.mainColor}
                textColor={COLORS.whiteColor}
                onClick={() => {
                  // router.push("/setting-profile");
                }}
              />
            </MyProfileContainer>
          </MyProfile>

          <MyActivities>
            <MyActivitiesContainer>
              <Activity>
                <p>{0}</p>
                <p>{"주문"}</p>
              </Activity>
              <Activity>
                <p>{0}</p>
                <p>{"리뷰"}</p>
              </Activity>
            </MyActivitiesContainer>
          </MyActivities>
        </MyInfo>

        <MenuContainer>
          <p>스토어 관리</p>
          <p>공지사항</p>
          <p>고객센터</p>
          <p>1:1 문의 내역</p>
          <div onClick={signOutApi}>
            <p>로그아웃</p>
          </div>
        </MenuContainer>
      </Container>
    </DefaultLayout>
  );
};

const TopNavLogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;
  height: 24px;

  cursor: pointer;
`;

const TopNavRightContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);

  width: auto;
  height: 20px;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};

  padding-bottom: 80px;
`;

const MyInfo = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  justify-content: center;
`;

const MyProfile = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${COLORS.greyColor} inset;
  background: ${COLORS.primaryColor};
`;

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 16px;
`;

const ProfileNickname = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ProfileBottomText = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  span {
    color: ${COLORS.mainColor};
    font-weight: 600;
  }
`;

const MyActivities = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${COLORS.greyColor} inset;
  background: ${COLORS.primaryColor};
`;

const MyActivitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;

  padding: 12px 0;
`;

const Activity = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p:last-child {
    color: ${COLORS.secondaryColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-bottom: 80px;

  p {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    cursor: pointer;
  }
`;
