import { ButtonSingle } from "@/app/components/buttons";
import { InputUnderline } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import {
  MemberSignupForm,
  MemberTitle,
} from "@/app/components/member/components";
import { RegexpNickname } from "@/app/components/regexp";
import { SelectBottomSection, SelectFlat } from "@/app/components/select";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type StepType = {
  onNext: CallableFunction;
};

const StepProfile = ({ onNext }: StepType) => {
  // 닉네임
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

  useEffect(() => {
    if (isNicknameFocused === false) {
      if (RegexpNickname.test(valueNickname)) {
        setStatusNickname(null);
        setbottomTextNickname("");
      } else {
        setStatusNickname(false);
        setbottomTextNickname(
          "닉네임은 공백없이 한글, 알파벳, 숫자만 가능해요."
        );
      }
    } else {
      setStatusNickname(null);
      setbottomTextNickname("");
    }
  }, [isNicknameFocused]);

  return (
    <Container>
      <MemberTitle>프로필을 완성해봐요!</MemberTitle>

      <MemberSignupForm>
        <InputUnderline
          value={valueNickname}
          placeholder="닉네임"
          type="text"
          maxLength={12}
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

        <SelectFlat
          placeholder="성별"
          value={valueGender}
          isFocus={isGenderFocused}
          onClick={() => {
            setIsGenderFocused(true);
            setShowSelectGender(true);
          }}
        />
      </MemberSignupForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={
          isValidNickname && valueGender ? COLORS.mainColor : COLORS.greyColor
        }
        textColor={COLORS.primaryColor}
        onClick={() => {
          if (isValidNickname && valueGender) {
            onNext({ nickname: valueNickname, isMale: isMale[valueGender] });
          }
        }}
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
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default StepProfile;
