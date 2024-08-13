"use client";

import { ButtonSingle } from "@/app/components/buttons";
import { DefaultLayout, Spacer } from "@/app/components/layout";
import {
  MemberChevronLeft,
  MemberTitle,
} from "@/app/components/member/components";
import { COLORS } from "@/public/styles/colors";
import { useState } from "react";
import { styled } from "styled-components";

const SignUpPage: React.FC = () => {
  const [isPopper, setIsPopper] = useState<boolean | null>(null);

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        <MemberChevronLeft />
        <MemberTitle>
          팝핑에 오신 것을 환영해요
          <br />
          이용하실 목적이 어떻게 되시나요?
        </MemberTitle>
        <RadioBoxContainer>
          <RadioBox
            isSelect={isPopper === false}
            onClick={() => {
              setIsPopper(false);
            }}
          >
            <p>팝플</p>
            <p>팝업스토어를 이용하려고 가입해요</p>
          </RadioBox>
          <RadioBox
            isSelect={isPopper === true}
            onClick={() => {
              setIsPopper(true);
            }}
          >
            <p>팝퍼</p>
            <p>팝업스토어를 운영하고 관리하려고 가입해요</p>
          </RadioBox>
        </RadioBoxContainer>
        <Spacer />
        <ButtonSingle
          text="다음"
          backgroundColor={
            isPopper !== null ? COLORS.mainColor : COLORS.greyColor
          }
          textColor={COLORS.primaryColor}
          onClick={() => {}}
        />{" "}
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

const RadioBoxContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RadioBox = styled.div<{ isSelect: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 28px 0;

  text-align: center;

  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 8px;
  box-shadow: 0 0 0 ${(props) => (props.isSelect ? "2px" : "1px")}
    ${(props) => (props.isSelect ? COLORS.mainColor : COLORS.greyColor)} inset;
  transition: box-shadow 0.3s ease;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: pointer;

  p:first-child {
    font-size: 24px;
  }

  p:last-child {
    font-size: 14px;
  }
`;

export default SignUpPage;
