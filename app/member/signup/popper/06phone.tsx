import { ButtonSingle } from "@/app/components/buttons";
import { InputFlat } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import { MemberForm, MemberTitle } from "@/app/components/member/components";
import { RegexpNumber, RegexpPhone } from "@/app/components/regexp";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type StepType = {
  onNext: CallableFunction;
};

const StepPhone = ({ onNext }: StepType) => {
  const [valuePhone, setValuePhone] = useState<string>("");
  const [isPhoneFocused, setIsPhoneFocused] = useState<boolean | null>(null);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [statusPhone, setStatusPhone] = useState<boolean | null>(null);
  const [bottomTextPhone, setbottomTextPhone] = useState<string>("");

  useEffect(() => {
    if (isPhoneFocused === false) {
      if (RegexpPhone.test(valuePhone)) {
        setStatusPhone(null);
        setbottomTextPhone("");
      } else {
        setStatusPhone(false);
        setbottomTextPhone("전화번호 서식에 맞지 않습니다.");
      }
    } else {
      setStatusPhone(null);
      setbottomTextPhone("");
    }
  }, [isPhoneFocused]);

  return (
    <Container>
      <MemberTitle>
        본인인증을 위해
        <br />
        전화번호를 입력해주세요
      </MemberTitle>

      <MemberForm>
        <InputFlat
          value={valuePhone}
          placeholder="전화번호(숫자만 입력)"
          type="text"
          maxLength={undefined}
          status={statusPhone}
          bottomText={bottomTextPhone}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValuePhone(text.replace(RegexpNumber, ""));
            setIsValidPhone(RegexpPhone.test(text));
          }}
          onFocus={() => {
            setIsPhoneFocused(true);
          }}
          onBlur={() => {
            setIsPhoneFocused(false);
          }}
          disabled={false}
        />
      </MemberForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={isValidPhone ? COLORS.mainColor : COLORS.greyColor}
        textColor={COLORS.primaryColor}
        onClick={() => {
          if (isValidPhone === true) {
            onNext(valuePhone);
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

export default StepPhone;
