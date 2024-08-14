import { ButtonSingle } from "@/app/components/buttons";
import { InputUnderline } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import {
  MemberSignupForm,
  MemberTitle,
} from "@/app/components/member/components";
import { RegexpNickname } from "@/public/utils/regexp";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type StepType = {
  onNext: CallableFunction;
};

const StepBrand = ({ onNext }: StepType) => {
  const [valueBrand, setValueBrand] = useState<string>("");
  const [isBrandFocused, setIsBrandFocused] = useState<boolean | null>(null);
  const [isValidBrand, setIsValidBrand] = useState<boolean>(false);
  const [statusBrand, setStatusBrand] = useState<boolean | null>(null);
  const [bottomTextBrand, setbottomTextBrand] = useState<string>("");

  useEffect(() => {
    if (isBrandFocused === false) {
      if (RegexpNickname.test(valueBrand)) {
        setStatusBrand(null);
        setbottomTextBrand("");
      } else {
        setStatusBrand(false);
        setbottomTextBrand("입력할 수 없는 문자가 포함되어 있습니다.");
      }
    } else {
      setStatusBrand(null);
      setbottomTextBrand("");
    }
  }, [isBrandFocused]);

  return (
    <Container>
      <MemberTitle>브랜드 이름을 입력해주세요</MemberTitle>

      <MemberSignupForm>
        <InputUnderline
          value={valueBrand}
          placeholder="브랜드명(최대 25자)"
          type="text"
          maxLength={25}
          status={statusBrand}
          bottomText={bottomTextBrand}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueBrand(text);
            setIsValidBrand(RegexpNickname.test(text) && text.length > 1);
          }}
          onFocus={() => {
            setIsBrandFocused(true);
          }}
          onBlur={() => {
            setIsBrandFocused(false);
          }}
          disabled={false}
        />
      </MemberSignupForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={isValidBrand ? COLORS.mainColor : COLORS.greyColor}
        textColor={COLORS.primaryColor}
        onClick={() => {
          if (isValidBrand === true) {
            onNext(valueBrand);
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

export default StepBrand;
