"use client";

import { styled } from "styled-components";
import { useState } from "react";
import { COLORS } from "@/public/styles/colors";
import { ButtonSingle } from "@/app/components/buttons";
import { InputRound } from "@/app/components/inputs";
import { DefaultLayout } from "@/app/components/layout";
import {
  MemberChevronLeft,
  MemberLogoAndTitle,
  MemberAccountForm,
} from "@/app/components/member/components";
import Image from "next/image";
import LogoKakao from "@/public/images/social/logo_kakao.png";
import LogoGoogle from "@/public/images/social/logo_google.png";

const SignInPage: React.FC = () => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        <MemberChevronLeft />
        <MemberLogoAndTitle>로그인</MemberLogoAndTitle>
        <MemberAccountForm>
          <InputRound
            value={valueEmail}
            placeholder="이메일"
            type="email"
            maxLength={undefined}
            status={null}
            bottomText={"계정을 잊으셨나요?"}
            bottomTextClickable={true}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueEmail(text);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />

          <InputRound
            value={valuePassword}
            placeholder="비밀번호"
            type="password"
            maxLength={8}
            status={null}
            bottomText={"비밀번호를 잊으셨나요?"}
            bottomTextClickable={true}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValuePassword(text);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />
        </MemberAccountForm>

        <ButtonSingle
          text="로그인"
          backgroundColor={
            valueEmail !== "" && valuePassword !== ""
              ? COLORS.mainColor
              : COLORS.greyColor
          }
          textColor={COLORS.primaryColor}
          onClick={() => {}}
        />

        <SignupContainer>
          <SignUpText onClick={() => {}}>계정이 아직 없으신가요?</SignUpText>
        </SignupContainer>

        <SocialSignInContainer>
          <SocialSignInButton
            background={COLORS.kakaoColor}
            borderColor="transparent"
          >
            <Image src={LogoKakao} alt={"카카오 로그인"} />
          </SocialSignInButton>
          <SocialSignInButton
            background={COLORS.whiteColor}
            borderColor="#747775"
          >
            <Image src={LogoGoogle} alt={"구글 로그인"} />
          </SocialSignInButton>
        </SocialSignInContainer>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const SignupContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 12px 0;
`;

const SignUpText = styled.span`
  color: ${COLORS.greyColor};
  text-align: center;
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
`;

const SocialSignInContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 16px;

  margin-top: 28px;
`;

const SocialSignInButton = styled.div<{
  background: string;
  borderColor: string;
}>`
  position: relative;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => props.background};
  box-shadow: 0 0 0 1px ${(props) => props.borderColor} inset;

  cursor: pointer;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: auto;
    height: 20px;
  }
`;

export default SignInPage;
