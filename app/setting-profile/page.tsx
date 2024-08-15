"use client";

import { useState } from "react";
import { DefaultLayout } from "../components/layout";
import { TopNavigation } from "../navigation/topnavigation";
import { styled } from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "../components/icons";
import { ButtonLarge, ButtonSmall } from "../components/buttons";
import { InputRound } from "../components/inputs";
import { RegexpNickname } from "@/public/utils/regexp";
import { SelectBottomSection, SelectRound } from "../components/select";
import { useRouter } from "next/navigation";

import DummyProfile from "@/public/images/dummy/dummy_profile.jpg";

const SettingProfilePage: React.FC = () => {
  const [valueNickname, setValueNickname] = useState<string>("");
  const [isNicknameFocused, setIsNicknameFocused] = useState<boolean | null>(
    null
  );
  const [statusNickname, setStatusNickname] = useState<boolean | null>(null);
  const [bottomTextNickname, setbottomTextNickname] = useState<string>("");
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false);

  // 성별
  const genders: string[] = ["남성", "여성", "비공개"];
  const isMale: { [key: string]: boolean | null } = {
    남성: true,
    여성: false,
    비공개: null,
  };
  const [valueGender, setValueGender] = useState<string | null>(null);
  const [isGenderFocused, setIsGenderFocused] = useState<boolean>(false);
  const [showSelectGender, setShowSelectGender] = useState<boolean>(false);

  const router = useRouter();

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>프로필 설정</TopNavTitle>
        </TopNavCenterContainer>
        <TopNavLeftContainer
          onClick={() => {
            router.push("/");
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
        <ProfileContainer>
          <ProfileImage image={DummyProfile.src} />
          <ButtonSmall
            text={"사진 변경"}
            backgroundColor={COLORS.mainColor}
            textColor={COLORS.primaryColor}
            onClick={() => {}}
          />
        </ProfileContainer>

        <Form>
          <InputRound
            value={valueNickname}
            placeholder="닉네임"
            type="text"
            maxLength={15}
            status={statusNickname}
            bottomText={bottomTextNickname}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueNickname(text);
              setIsValidNickname(RegexpNickname.test(text));
            }}
            onFocus={() => {
              setIsNicknameFocused(true);
            }}
            onBlur={() => {
              setIsNicknameFocused(false);
            }}
            disabled={false}
          />

          <SelectRound
            placeholder="성별"
            value={valueGender}
            isFocus={isGenderFocused}
            onClick={() => {
              setIsGenderFocused(true);
              setShowSelectGender(true);
            }}
          />
        </Form>

        <ButtonLarge
          text={"저장"}
          backgroundColor={
            isValidNickname ? COLORS.mainColor : COLORS.greyColor
          }
          textColor={COLORS.primaryColor}
          onClick={() => {}}
        />

        {showSelectGender && (
          <SelectBottomSection
            title={"성별"}
            onBackgroundClick={() => {
              setShowSelectGender(false);
              setIsGenderFocused(false);
            }}
            onClose={() => {
              setShowSelectGender(false);
              setIsGenderFocused(false);
            }}
            options={genders}
            onClick={(gender: string) => {
              setValueGender(gender);
              setIsGenderFocused(false);
            }}
          />
        )}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.div<{ image: string | null }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 16px;
`;

export default SettingProfilePage;
