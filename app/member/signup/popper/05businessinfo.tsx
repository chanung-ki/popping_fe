import { ButtonSingle } from "@/app/components/buttons";
import { InputUnderline } from "@/app/components/inputs";
import { Spacer } from "@/app/components/layout";
import {
  MemberSignupForm,
  MemberTitle,
} from "@/app/components/member/components";
import {
  RegexpHangul,
  RegexpInputNumber,
  RegExpYYYYMMDD,
} from "@/public/utils/regexp";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type StepType = {
  onNext: CallableFunction;
};

const StepBusinessInfo = ({ onNext }: StepType) => {
  // 사업자등록번호
  const [valueBN, setValueBN] = useState<string>("");
  const [isBNFocused, setIsBNFocused] = useState<boolean | null>(null);
  const [statusBN, setStatusBN] = useState<boolean | null>(null);
  const [bottomTextBN, setbottomTextBN] = useState<string>("");
  const [isValidBN, setIsValidBN] = useState<boolean>(false);

  // 사업자등록번호
  const [valueName, setValueName] = useState<string>("");
  const [isNameFocused, setIsNameFocused] = useState<boolean | null>(null);
  const [statusName, setStatusName] = useState<boolean | null>(null);
  const [bottomTextName, setbottomTextName] = useState<string>("");
  const [isValidName, setIsValidName] = useState<boolean>(false);

  // 개업일자
  const [valueDate, setValueDate] = useState<string>("");
  const [isDateFocused, setIsDateFocused] = useState<boolean | null>(null);
  const [statusDate, setStatusDate] = useState<boolean | null>(null);
  const [bottomTextDate, setbottomTextDate] = useState<string>("");
  const [isValidDate, setIsValidDate] = useState<boolean>(false);

  useEffect(() => {
    if (isBNFocused === false) {
      if (valueBN.length === 10) {
        setStatusBN(null);
        setbottomTextBN("");
      } else {
        setStatusBN(false);
        setbottomTextBN("사업자등록번호 형식에 맞지 않습니다");
      }
    } else {
      setStatusBN(null);
      setbottomTextBN("");
    }
  }, [isBNFocused]);

  useEffect(() => {
    if (isNameFocused === false) {
      if (RegexpHangul.test(valueName)) {
        setStatusName(null);
        setbottomTextName("");
      } else {
        setStatusName(false);
        setbottomTextName("한글 이외는 입력할 수 없어요.");
      }
    } else {
      setStatusName(null);
      setbottomTextName("");
    }
  }, [isNameFocused]);

  useEffect(() => {
    if (isDateFocused === false) {
      if (RegExpYYYYMMDD.test(valueDate)) {
        setStatusDate(null);
        setbottomTextDate("");
      } else {
        setStatusDate(false);
        setbottomTextDate("날짜 서식에 맞지 않습니다.");
      }
    } else {
      setStatusDate(null);
      setbottomTextDate("");
    }
  }, [isDateFocused]);

  return (
    <Container>
      <MemberTitle>프로필을 완성해봐요!</MemberTitle>

      <MemberSignupForm>
        <InputUnderline
          value={valueBN}
          placeholder="사업자등록번호"
          type="text"
          maxLength={10}
          status={statusBN}
          bottomText={bottomTextBN}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueBN(text.replace(RegexpInputNumber, ""));
            setIsValidBN(text.length === 10);
          }}
          onFocus={() => {
            setIsBNFocused(true);
          }}
          onBlur={() => {
            setIsBNFocused(false);
          }}
          disabled={false}
        />

        <InputUnderline
          value={valueName}
          placeholder="대표자명"
          type="text"
          maxLength={12}
          status={statusName}
          bottomText={bottomTextName}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueName(text);
            setIsValidName(RegexpHangul.test(text) && text.length > 1);
          }}
          onFocus={() => {
            setIsNameFocused(true);
          }}
          onBlur={() => {
            setIsNameFocused(false);
          }}
          disabled={false}
        />

        <InputUnderline
          value={valueDate}
          placeholder="개업일자(YYYYMMDD)"
          type="text"
          maxLength={8}
          status={statusDate}
          bottomText={bottomTextDate}
          bottomTextClickable={false}
          bottomTextOnClick={() => {}}
          onChange={(text: string) => {
            setValueDate(text.replace(RegexpInputNumber, ""));
            setIsValidDate(RegExpYYYYMMDD.test(text));
          }}
          onFocus={() => {
            setIsDateFocused(true);
          }}
          onBlur={() => {
            setIsDateFocused(false);
          }}
          disabled={false}
        />
      </MemberSignupForm>

      <Spacer />

      <ButtonSingle
        text="다음"
        backgroundColor={
          isValidBN && isValidName && isValidDate
            ? COLORS.mainColor
            : COLORS.greyColor
        }
        textColor={COLORS.primaryColor}
        onClick={() => {
          if (isValidBN && isValidName && isValidDate) {
            onNext({
              businessNumber: valueBN,
              startDate: valueDate,
              participantName: valueName,
            });
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

export default StepBusinessInfo;
