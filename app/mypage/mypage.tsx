import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import Image from "next/image";
import { TopNavigation } from "@/app/navigation/topnavigation";

import LogoLetters from "@/public/images/logo_letters.png";
import { DefaultLayout, Spacer } from "@/app/components/layout";
import { IconChevronRight, IconGear } from "@/app/components/icons";
import { ButtonSmall } from "../components/buttons";

const MyPage: React.FC = () => {
  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavLogoContainer>
          <TopNavLogo
            src={LogoLetters}
            alt={"로고"}
            width={undefined}
            height={24}
          />
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
                <ProfileImage image={null} />
                <ProfileNickname>{"팝플"}님</ProfileNickname>
                <Spacer />
                <ButtonSmall
                  text={"프로필 설정"}
                  backgroundColor={COLORS.mainColor}
                  textColor={COLORS.whiteColor}
                  onClick={() => {}}
                />
              </ProfileContainer>
              <GradeContainer>
                <CurrentGradeContainer>
                  <p>현재등급</p>
                  <GradeText color={COLORS.mainColor}>{"VIP"}</GradeText>
                  <IconNext
                    color={COLORS.greyColor}
                    width={undefined}
                    height={10}
                  />
                  <Spacer />
                  <p>{"무료배송 · 3% 할인"}</p>
                </CurrentGradeContainer>
                <PointsProgress value={80} max="100" />
                <NextGradeContainer>
                  <NextGradeText color={COLORS.statusNegativeColor}>
                    {"SVIP"}
                  </NextGradeText>
                  <NextGradeDesc>
                    까지 {256}/{300} pts
                  </NextGradeDesc>
                </NextGradeContainer>
              </GradeContainer>
            </MyProfileContainer>
          </MyProfile>

          <MyActivities>
            <MyActivitiesContainer>
              <Activity>
                <p>{"99+"}</p>
                <p>{"팔로잉"}</p>
              </Activity>
              <Activity>
                <p>{"1,000"}</p>
                <p>{"콘 포인트"}</p>
              </Activity>
            </MyActivitiesContainer>
          </MyActivities>
        </MyInfo>

        <Section>
          <p>최근 본 팝업스토어</p>
          <ContentsContainer>
            <StoreContainer>
              <StoreImage image={null} />
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

const TopNavLogo = styled(Image)`
  width: auto;
  height: 100%;
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

const ProfileImage = styled.div<{ image: string | null }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;
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
