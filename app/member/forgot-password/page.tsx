"use client";

import { ButtonSingle } from "@/app/components/buttons";
import { InputRound } from "@/app/components/inputs";
import { DefaultLayout } from "@/app/components/layout";
import {
  MemberAccountForm,
  MemberChevronLeft,
  MemberLogoAndTitle,
} from "@/app/components/member/components";
import {
  RegexpEmail,
  RegexpInputAlphabetAndNumber,
  RegexpInputNumber,
  RegexpPhone,
} from "@/public/utils/regexp";

import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ForgotPasswordPage: React.FC = () => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePhone, setValuePhone] = useState<string>("");
  const [valuePasscode, setValuePasscode] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isValidPasscode, setIsValidPasscode] = useState<boolean>(false);

  const [isSent, setIsSent] = useState<boolean>(false);
  const [isResendable, setIsResendable] = useState<boolean>(false);

  const resendableTime: number = 18;
  const [count, setCount] = useState<number>(resendableTime);

  useEffect(() => {
    if (isResendable === false) {
      const timer = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);

      if (count <= 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
  }, [isResendable]);

  useEffect(() => {
    if (count <= 0) {
      setIsResendable(true);
    }
  }, [count]);

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        <MemberChevronLeft />
        <MemberLogoAndTitle>비밀번호 찾기</MemberLogoAndTitle>

        <MemberAccountForm>
          <InputRound
            value={valueEmail}
            placeholder="이메일"
            type="email"
            maxLength={undefined}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueEmail(text);
              setIsValidEmail(RegexpEmail.test(text));
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />

          <InputRound
            value={valuePhone}
            placeholder="전화번호"
            type="text"
            maxLength={undefined}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValuePhone(text.replace(RegexpInputNumber, ""));
              setIsValidPhone(RegexpPhone.test(text));
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />

          {isSent && (
            <InputRound
              value={valuePasscode}
              placeholder="인증번호"
              type="text"
              maxLength={8}
              status={null}
              bottomText={
                isResendable
                  ? "인증번호 재전송"
                  : `${String(Math.floor(count / 60)).padStart(
                      2,
                      "0"
                    )}:${String(Math.floor(count % 60)).padStart(
                      2,
                      "0"
                    )} 후에 재전송 가능`
              }
              bottomTextClickable={isResendable}
              bottomTextOnClick={() => {
                setCount(resendableTime);
                setIsResendable(false);
              }}
              onChange={(text: string) => {
                setValuePasscode(
                  text.replace(RegexpInputAlphabetAndNumber, "")
                );
                setIsValidPasscode(valuePasscode.length === 8);
              }}
              onFocus={() => {}}
              onBlur={() => {}}
              disabled={false}
            />
          )}
        </MemberAccountForm>

        {isSent ? (
          <ButtonSingle
            text={"확인"}
            backgroundColor={
              isValidEmail && isValidPhone && isValidPasscode
                ? COLORS.mainColor
                : COLORS.greyColor
            }
            textColor={COLORS.primaryColor}
            onClick={() => {}}
          />
        ) : (
          <ButtonSingle
            text={"인증번호 전송"}
            backgroundColor={
              isValidEmail && isValidPhone ? COLORS.mainColor : COLORS.greyColor
            }
            textColor={COLORS.primaryColor}
            onClick={() => {
              setIsSent(true);
            }}
          />
        )}
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

export default ForgotPasswordPage;
