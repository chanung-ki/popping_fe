정민
suggestion06580
온라인



세진
 님이 파티에 참가하셨어요.
 — 2024.05.02. 오후 9:39
Harenkei
 님이 파티에 참가하셨어요.
 — 2024.05.02. 오후 9:54
[오후 9:54]Harenkei: 👍
[오후 10:09]정민:
[오후 10:09]정민:
[오후 10:13]정민: 걍 이거말고
[오후 10:13]Harenkei: 학교버려 쓸까?
[오후 10:13]정민: slack으로 할껄 그랬나
[오후 10:13]Harenkei: 헉
[오후 10:13]Harenkei: 슬(랙)스
[오후 10:14]정민: 그렇지
오셨군요, 
곰곰
 님!
 — 2024.05.03. 오전 5:55
[오전 9:55]정민:
얼굴 보니 좋네요, 
노래하는하리보
 님.
 — 2024.05.04. 오후 10:14
[오전 12:26]정민: @Harenkei ㅇㅎ
[오전 1:32]정민: Today Coding 은 여기까지 .
[오전 1:32]정민: 그럼 20000 30000 40000
[오전 1:32]Harenkei: bye bye..
[오전 1:32]정민: i buy
[오전 1:33]Harenkei: i bought
앗! 야생의 
태은
이(가) 나타났다!
 — 2024.08.18. 오후 2:27
만나서 반가워요, 
기찬웅
 님.
 — 2024.08.18. 오후 2:27
[오후 2:40]태은:
이미지
[오후 12:00]정민: @everyone 코딩할사람 모여랴
[오후 2:09]태은: 하....
나다힝
 님이 서버에 막 등장하셨어요.
 — 어제 오후 11:16
[오전 2:17]태은: git reset HEAD^
[오전 2:17]태은: git stash
[오전 2:17]태은: git pull origin main
[오전 2:17]태은: git stash pop
[오전 11:29]정민: 떳다떳다비행기
[오전 11:29]정민: 어서모여롸
[오후 1:25]정민: 태은아
[오후 1:25]정민: ㅇㅇ
[오후 1:25]정민: 굳
[오후 5:48]태은: height: 100%;
  max-height: calc(
    100% - (${(props) => props.top} + ${(props) => props.bottom})
  );
[오후 5:56]태은:
import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconGear } from "../components/icons";
import { DefaultLayout, Spacer } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";
import { ProfileImage } from "../components/main/componenets";
import { ButtonSmall } from "../components/buttons";
import { useRouter } from "next/navigation";

type MyPagePopperProps = {
  nickname: string;
  profileImage: string;
  signOutApi: () => void;
};

export const MyPagePopper: React.FC<MyPagePopperProps> = ({ nickname, profileImage, signOutApi }) => {
  const router = useRouter();

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

... (122줄 남음)
접기
message.txt
5KB
[오후 5:56]태은:
import { COLORS, gradeColors } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconChevronRight, IconGear } from "../components/icons";
import DummyStore from "@/public/images/dummy/dummy_store.jpg";
import { DefaultLayout, Spacer } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
확장
message.txt
11KB
﻿
import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconGear } from "../components/icons";
import { DefaultLayout, Spacer } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";
import { ProfileImage } from "../components/main/componenets";
import { ButtonSmall } from "../components/buttons";
import { useRouter } from "next/navigation";

type MyPagePopperProps = {
  nickname: string;
  profileImage: string;
  signOutApi: () => void;
};

export const MyPagePopper: React.FC<MyPagePopperProps> = ({ nickname, profileImage, signOutApi }) => {
  const router = useRouter();

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
message.txt
5KB