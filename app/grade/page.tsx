"use client";

import { useRouter } from "next/navigation";
import { DefaultLayout } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
import { styled } from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "../components/icons";

const GradePage: React.FC = () => {
  const router = useRouter();

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>등급 안내</TopNavTitle>
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
        <YourGradeContainer>
          <YourGradeText color={COLORS.GradeWhitePop}>
            현재 {}님의 등급은,
            <br />
            <span>{}</span>입니다.
          </YourGradeText>
          <PointsProgress color={COLORS.GradeWhitePop} value={80} max="100" />
          <NextGradeContainer>
            <NextGradeText color={COLORS.GradeYellowPop}>
              {"YELLOW POP"}
            </NextGradeText>
            <NextGradeDesc>까지 {30000}원</NextGradeDesc>
          </NextGradeContainer>
        </YourGradeContainer>
        <GradeInfoTitle>등급 안내</GradeInfoTitle>
        <GradesContainer>
          {/* 등급 안내 시작 */}
          <GradeBox color={COLORS.secondaryColor}>
            <p>
              LV 1. <span>WHITE POP</span>
            </p>
            <div>
              <p>누적 구매금액: {0}원</p>
              <p>추가 적립: 1%</p>
            </div>
          </GradeBox>

          <GradeBox color={COLORS.GradeYellowPop}>
            <p>
              LV 2. <span>YELLOW POP</span>
            </p>
            <div>
              <p>누적 구매금액: {150000}원</p>
              <p>추가 적립: 1%</p>
              <p>추가 할인: 1%</p>
            </div>
          </GradeBox>

          <GradeBox color={COLORS.GradeRedPop}>
            <p>
              LV 3. <span>RED POP</span>
            </p>
            <div>
              <p>누적 구매금액: {2000000}원</p>
              <p>추가 적립: 2%</p>
              <p>추가 할인: 2%</p>
            </div>
          </GradeBox>

          <GradeBox color={COLORS.GradePurplePop}>
            <p>
              LV 4. <span>PURPLE POP</span>
            </p>
            <div>
              <p>누적 구매금액: {5000000}원</p>
              <p>추가 적립: 3%</p>
              <p>추가 할인: 3%</p>
            </div>
          </GradeBox>

          <GradeBox color={COLORS.GradeGoldPop}>
            <p>
              LV 5. <span>GOLD POP</span>
            </p>
            <div>
              <p>추가 적립: 4%</p>
              <p>추가 할인: 4%</p>
            </div>
          </GradeBox>
        </GradesContainer>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const YourGradeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const YourGradeText = styled.p<{ color: string }>`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  span {
    color: ${(props) => props.color};
    font-weight: 600;
  }
`;

const PointsProgress = styled.progress`
  width: 100%;
  height: 28px;
  appearance: none;

  margin-top: 24px;

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
  justify-content: flex-start;
  align-items: center;
  gap: 0px;

  width: 100%;
  margin-top: 8px;
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

const GradeInfoTitle = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const GradesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GradeBox = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  p {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    span {
      color: ${(props) => props.color};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    p {
      color: ${COLORS.secondaryColor};
      font-family: "Pretendard";
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

export default GradePage;
