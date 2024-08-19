import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import Image from "next/image";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { DefaultLayout, Spacer } from "@/app/components/layout";
import { IconChevronRight, IconGear } from "@/app/components/icons";
import { ButtonSmall } from "../components/buttons";
import { useRouter } from "next/navigation";
import { LogoLettersMain } from "../components/logo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileImage } from "../components/main/componenets";
import axiosInstance from "@/public/network/axios";
import { removeCookie } from "@/public/network/cookie";
import { initUser } from "../redux/reducers/poppingUser";

import DummyProfile from "@/public/images/dummy/dummy_profile.jpg";
import DummyStore from "@/public/images/dummy/dummy_store.jpg";

const MyPage: React.FC = () => {

  type myPageTypes = {
    followingNum: number;
    point: string;
    gradeInfo: {
      grade: string;
      minOrderAmount: number;
      maxOrderAmount: number;
      earnRate: number;
      discountRate: number;
    },
  };
  
  const dispatch = useDispatch();
  const router = useRouter();
  const hasAlerted = useRef<boolean>(false); 
  const { isLogin, nickname } = useSelector((state: any) => state.poppingUser.user);
  const [myPageData, setMyPageData] = useState<myPageTypes>({
    followingNum: 0,
    point: '',
    gradeInfo: {
      grade: '',
      minOrderAmount: 0,
      maxOrderAmount: 0,
      earnRate: 0,
      discountRate: 0,
    },
  });

  const cleanUserData = () => {
    dispatch(initUser());
    removeCookie('csrftoken');
    removeCookie('sessionid');
  };

  const signOutApi = async() => {
    try {
      const response = await axiosInstance.post(`/api/user/signout`);
      if (response.status === 200) {
        cleanUserData();
        alert('로그아웃이 완료되었습니다.');
        hasAlerted.current = true;
        router.push('/member/signin');
      };
    } catch (error) {
      alert("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
    }
  }

  const getMyPageDataApi = async() => {
    try {
      const response = await axiosInstance.get(`/api/user/mypage`);
      if (response.status === 200) {
        setMyPageData(response.data);
      };
    } catch (error: any) {
      if (error.response.statue === 403) {
        cleanUserData();
        alert('로그인 세션이 만료되었습니다. 재로그인 후 이용해주세요.');
        router.push('/member/signin');
      } else {
        alert("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
      }
      router.push('/');
    }
  }

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
              <ProfileContainer>
                <ProfileImage image={DummyProfile.src} width={60} height={60} />
                <ProfileNickname>{nickname}님</ProfileNickname>
                <Spacer />
                <ButtonSmall
                  text={"프로필 설정"}
                  backgroundColor={COLORS.mainColor}
                  textColor={COLORS.whiteColor}
                  onClick={() => {
                    router.push("/setting-profile");
                  }}
                />
              </ProfileContainer>
              <GradeContainer>
                <CurrentGradeContainer>
                  <p>현재등급</p>
                  <GradeText color={COLORS.mainColor}>{myPageData.gradeInfo.grade}</GradeText>
                  {/* <IconNext
                    color={COLORS.greyColor}
                    width={undefined}
                    height={10}
                  /> */}
                  <Spacer />
                  <p>{myPageData.gradeInfo.earnRate}% 적립 · {myPageData.gradeInfo.discountRate}% 할인</p>
                </CurrentGradeContainer>
                <PointsProgress value={80} max="100" />
                {/* <NextGradeContainer>
                  <NextGradeText color={COLORS.statusNegativeColor}>
                    {"SVIP"}
                  </NextGradeText>
                  <NextGradeDesc>
                    까지 {256}/{300} pts
                  </NextGradeDesc>
                </NextGradeContainer> */}
              </GradeContainer>
            </MyProfileContainer>
          </MyProfile>

          <MyActivities>
            <MyActivitiesContainer>
              <Activity>
                <p>{myPageData.followingNum}</p>
                <p>{"팔로잉"}</p>
              </Activity>
              <Activity>
                <p>{myPageData.point}</p>
                <p>{"콘 포인트"}</p>
              </Activity>
            </MyActivitiesContainer>
          </MyActivities>
        </MyInfo>

        <Section>
          <p>최근 본 팝업스토어</p>
          <ContentsContainer>
            <StoreContainer>
              <StoreImage image={DummyStore.src} />
              <StoreDesc>
                <p>팝핑스토어</p>
              </StoreDesc>
            </StoreContainer>
          </ContentsContainer>
        </Section>

        <MenuContainer>
          <p>주문 내역</p>
          <p>취소/환불 내역</p>
          <p>리뷰 관리</p>
          <p>공지사항</p>
          <p>고객센터</p>
          <p>1:1 문의 내역</p>
          <div onClick={signOutApi} >
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

  margin-bottom: 80px;
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
  gap: 16px;

  padding: 16px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  align-items: center;
`;

const ProfileNickname = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const GradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CurrentGradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  align-items: center;

  p {
    color: ${COLORS.secondaryColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const GradeText = styled.span`
  color: ${(props) => props.color};
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const IconNext = styled(IconChevronRight)`
  cursor: pointer;
`;

const PointsProgress = styled.progress`
  width: 100%;
  height: 28px;
  appearance: none;

  &::-webkit-progress-bar {
    height: 100%;
    border-radius: 4px;
    background-color: ${COLORS.lightGreyColor};
    overflow: hidden;
  }

  &::-webkit-progress-value {
    height: 100%;
    border-radius: 4px;

    background-color: ${COLORS.mainColor};
    transition: width 0.3s ease;
  }
`;

const NextGradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;

  align-items: center;
`;

const NextGradeText = styled.span`
  color: ${(props) => props.color};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const NextGradeDesc = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  flex-wrap: nowrap;
  overflow-x: scroll;

  div:last-child {
    margin-right: 16px;
  }
`;

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoreImage = styled.div<{ image: string | null }>`
  flex: 0 0 auto;

  width: 82px;
  height: 82px;
  border-radius: 8px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;

  cursor: pointer;
`;

const StoreDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
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

export default MyPage;
