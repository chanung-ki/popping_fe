import { ButtonSingle } from "@/app/components/buttons";
import { InputFlat } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import { MemberForm, MemberTitle } from "@/app/components/member/components";
import { RegexpEmail } from "@/app/components/regexp";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type StepType = {
  onNext: CallableFunction;
};

const StepEmail = ({ onNext }: StepType) => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean | null>(null);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [statusEmail, setStatusEmail] = useState<boolean | null>(null);
  const [bottomTextEmail, setbottomTextEmail] = useState<string>("");

  useEffect(() => {
    if (isEmailFocused === false) {
      if (RegexpEmail.test(valueEmail)) {
        setStatusEmail(null);
        setbottomTextEmail("");
      } else {
        setStatusEmail(false);
        setbottomTextEmail("이메일 서식에 맞지 않습니다.");
      }
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

      <MemberForm>
        <InputFlat
          value={valueEmail}
          placeholder="이메일"
          type="text"
          maxLength={undefined}
          status={statusEmail}
          bottomText={bottomTextEmail}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueEmail(text);
            setIsValidEmail(RegexpEmail.test(text));
          }}
          onFocus={() => {
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsEmailFocused(false);
          }}
          disabled={false}
        />
      </MemberForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={isValidEmail ? COLORS.mainColor : COLORS.greyColor}
        textColor={COLORS.primaryColor}
        onClick={() => {
          if (isValidEmail === true) {
            onNext(valueEmail);
          }
        }}
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
