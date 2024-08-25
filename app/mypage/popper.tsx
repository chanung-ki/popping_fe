"use client";

import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconGear } from "../components/icons";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";
import { ProfileImage } from "../components/main/componenets";
import { ButtonSmall } from "../components/buttons";
import { useRouter } from "next/navigation";

type MyPagePopperProps = {
  nickname: string;
  profileImage: string;
  signOutApi: () => void;
};

export const MyPagePopper: React.FC<MyPagePopperProps> = ({
  nickname,
  profileImage,
  signOutApi,
}) => {
  const router = useRouter();

  return (
    <>
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
              <ProfileImage image={profileImage} width={60} height={60} />
              <ProfileNickname>{nickname}</ProfileNickname>
              {/* <ProfileBottomText>
                팔로워 <span>{0}</span>
              </ProfileBottomText> */}
              <ButtonSmall
                text={"프로필 설정"}
                buttonColor={COLORS.mainColor}
                textColor={COLORS.whiteColor}
                onClick={() => {
                  router.push("/setting-profile");
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
    </>
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
