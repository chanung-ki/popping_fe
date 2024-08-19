"use client";

import { IconChevronLeft } from "@/app/components/icons";
import { DefaultLayout, Spacer } from "@/app/components/layout";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { ProfileImage } from "../components/main/componenets";

import DummyProfile from "@/public/images/dummy/dummy_profile.jpg";

const BenefitPage: React.FC = () => {
  const router = useRouter();
  const hasAlerted = useRef<boolean>(false);

  const { isLogin } = useSelector((state: any) => state.poppingUser.user);

  // useEffect(() => {
  //   if (!isLogin && !hasAlerted.current) {
  //     alert("로그인 후 이용가능합니다.");
  //     hasAlerted.current = true; // alert 호출 후 true로 설정
  //     router.push(
  //       `/member/signin?redirect=${encodeURIComponent(
  //         window.location.pathname
  //       )}`
  //     );
  //   }
  // }, [isLogin, router]);

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>혜택</TopNavTitle>
        </TopNavCenterContainer>
        <TopNavLeftContainer
          onClick={() => {
            router.push("/?page=mypage");
          }}
        >
          <IconChevronLeft
            color={COLORS.secondaryColor}
            width={undefined}
            height={16}
          />
        </TopNavLeftContainer>
      </TopNavigation>
      <Container>
        <MyInfo>
          <MyProfile>
            <MyProfileContainer>
              <ProfileImage image={DummyProfile.src} width={60} height={60} />
              <ProfileNickname>{"test"}님</ProfileNickname>
              <PointsProgress
                color={COLORS.RankWhitePop}
                value={80}
                max="100"
              />
              <NextGradeContainer>
                <NextGradeText color={COLORS.RankYellowPop}>
                  {"YELLOW POP"}
                </NextGradeText>
                <NextGradeDesc>까지 {30000}원</NextGradeDesc>
                <NextGradeInfo
                  onClick={() => {
                    router.push("/grade");
                  }}
                >
                  ⓘ
                </NextGradeInfo>
              </NextGradeContainer>
            </MyProfileContainer>
          </MyProfile>
        </MyInfo>
        <HistoryTitle>콘 기록</HistoryTitle>
        <HistoryTable>
          {/* 데이터 시작 */}
          <TableRow>
            <TableHeader>
              <TableDataContainer>
                <TableNormalText>신규회원 적립</TableNormalText>
              </TableDataContainer>
            </TableHeader>
            <TableData>
              <TableDataContainer>
                <TableStrongText>+1,500</TableStrongText>
                <Spacer />
                <TableNormalText>2024. 8. 19</TableNormalText>
              </TableDataContainer>
            </TableData>
          </TableRow>
          {/* 데이터 끝 */}
        </HistoryTable>
      </Container>
    </DefaultLayout>
  );
};

const TopNavCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;

  cursor: pointer;
`;

const TopNavTitle = styled.p`
  color: ${COLORS.secondaryColor};
  text-align: center;
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TopNavLeftContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);

  width: auto;
  height: 20px;

  cursor: pointer;
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

const PointsProgress = styled.progress`
  width: 100%;
  height: 28px;
  appearance: none;

  margin-top: 8px;

  &::-webkit-progress-bar {
    height: 100%;
    border-radius: 4px;
    background-color: ${COLORS.lightGreyColor};
    border: 1px solid ${COLORS.lightGreyColor};

    overflow: hidden;
  }

  &::-webkit-progress-value {
    height: 100%;
    border-radius: 4px;

    background-color: ${(props) => props.color};
    transition: width 0.3s ease;
  }
`;

const NextGradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;

  width: 100%;

  justify-content: flex-start;
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

const NextGradeInfo = styled.p`
  margin-left: 4px;

  color: ${COLORS.greyColor};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: inherit;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const HistoryTitle = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
`;

const TableRow = styled.tr`
  border: none;

  &:not(:last-child) td {
    border-bottom: 1px solid ${COLORS.greyColor};
  }
`;

const TableHeader = styled.td`
  width: 120px;
  text-align: left;
`;

const TableData = styled.td`
  width: auto;
`;

const TableDataContainer = styled.div`
  display: flex;
  flex-direction: row;

  p {
    margin: 16px 0;
  }
`;

const TableNormalText = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TableStrongText = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default BenefitPage;
