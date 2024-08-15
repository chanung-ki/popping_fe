import { ButtonSingle } from "@/app/components/buttons";
import { InputUnderline } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import {
  MemberSignupForm,
  MemberTitle,
} from "@/app/components/member/components";
import { RegexpEmail } from "@/public/utils/regexp";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { duplicateCheckApi, callEmailAuthApi } from "@/public/utils/function";

type StepType = {
  onNext: CallableFunction;
};

const StepEmail = ({ onNext }: StepType) => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean | null>(null);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [statusEmail, setStatusEmail] = useState<boolean | null>(null);
  const [bottomTextEmail, setbottomTextEmail] = useState<string>("");

  // 이메일 입력시 실행되는 onBlur 핸들러
  const handleEmailValidation = async () => {
    if (RegexpEmail.test(valueEmail)) {
      // 정규식이 유효할 경우 이메일 중복 api를 호출.
      const isExist = await duplicateCheckApi(valueEmail, "email");
      setStatusEmail(!isExist);
      setIsValidEmail(!isExist);
      if (isExist) {
        setbottomTextEmail("현재 사용중인 이메일 입니다.");
      } else {
        setbottomTextEmail("사용가능한 이메일 입니다.");
      }
    } else {
      setStatusEmail(false);
      setIsValidEmail(false);
      setbottomTextEmail("이메일 서식에 맞지 않습니다.");
    }
  };

  // 다음 버튼 클릭 핸들러
  const handleClickNext = async () => {
    if (isValidEmail === true) {
      const authCode = await callEmailAuthApi(valueEmail);
      if (authCode) {
        onNext(valueEmail, authCode);
      } else {
        setStatusEmail(false);
        setbottomTextEmail("인증메일 전송 중 오류가 발생했습니다. 잠시 후 시도해주세요.");
      }
    }
  }

  useEffect(() => {
    if (isEmailFocused === false) {
      handleEmailValidation();
    } else {
      setStatusEmail(null);
      setbottomTextEmail("");
    }
  }, [isEmailFocused]);

  return (
    <Container>
      <MemberTitle>
        본인인증을 위해
        <br />
        이메일을 입력해주세요
      </MemberTitle>

      <MemberSignupForm>
        <InputUnderline
          value={valueEmail}
          placeholder="이메일"
          type="email"
          maxLength={undefined}
          status={statusEmail}
          bottomText={bottomTextEmail}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueEmail(text);
          }}
          onFocus={() => {
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsEmailFocused(false);

          }}
          disabled={false}
        />
      </MemberSignupForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={isValidEmail ? COLORS.mainColor : COLORS.greyColor}
        textColor={COLORS.primaryColor}
        onClick={handleClickNext}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default StepEmail;
