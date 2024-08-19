"use client";

import { ButtonLarge } from "@/app/components/buttons";
import { IconChevronLeft, IconX } from "@/app/components/icons";
import { InputRound } from "@/app/components/inputs";
import { DefaultLayout, Spacer } from "@/app/components/layout";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { COLORS } from "@/public/styles/colors";
import { RegexpInputNumber, RegexpPhone } from "@/public/utils/regexp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import DaumPostcode from "react-daum-postcode";

const AddressEditPage: React.FC = () => {
  const [valueNickname, setValueNickname] = useState<string>("");
  const [valueName, setValueName] = useState<string>("");
  const [valuePhone, setValuePhone] = useState<string>("");
  const [isPhoneFocused, setIsPhoneFocused] = useState<boolean | null>(null);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [statusPhone, setStatusPhone] = useState<boolean | null>(null);
  const [bottomTextPhone, setbottomTextPhone] = useState<string>("");

  const [openPostcode, setOpenPostcode] = useState<boolean>(false);

  const [valueZIPCode, setValueZIPCode] = useState<string>("");
  const [valueAddress, setValueAddress] = useState<string>("");
  const [valueAddressDetail, setValueAddressDetail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (isPhoneFocused === false) {
      if (RegexpPhone.test(valuePhone)) {
        setStatusPhone(null);
        setbottomTextPhone("");
      } else {
        setStatusPhone(false);
        setIsValidPhone(false);
        setbottomTextPhone("전화번호 서식에 맞지 않습니다.");
      }
    } else {
      setStatusPhone(null);
      setbottomTextPhone("");
    }
  }, [isPhoneFocused]);

  const handleComplete = (data: any) => {
    setValueZIPCode(data.zonecode);
    setValueAddress(data.address);
  };

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>배송지 추가</TopNavTitle>
        </TopNavCenterContainer>
        <TopNavLeftContainer
          onClick={() => {
            router.push("/?page=mypage");
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
        <InputsContainer>
          <InputRound
            value={valueNickname}
            placeholder="배송지 별칭"
            type="text"
            maxLength={15}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueNickname(text);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />

          <InputRound
            value={valueName}
            placeholder="이름"
            type="text"
            maxLength={12}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueName(text);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />

          <InputRound
            value={valuePhone}
            placeholder="전화번호(숫자만 입력)"
            type="text"
            maxLength={11}
            status={statusPhone}
            bottomText={bottomTextPhone}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValuePhone(text.replace(RegexpInputNumber, ""));
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

          <FindAddressContainer>
            <InputRound
              value={valueZIPCode}
              placeholder="우편번호"
              type="text"
              maxLength={undefined}
              status={null}
              bottomText={""}
              bottomTextClickable={false}
              bottomTextOnClick={() => {}}
              onChange={(text: string) => {}}
              onFocus={() => {}}
              onBlur={() => {}}
              disabled={true}
            />

            <FindAddressButton
              onClick={() => {
                setOpenPostcode(true);
              }}
            >
              <p>주소찾기</p>
            </FindAddressButton>
          </FindAddressContainer>

          <InputRound
            value={valueAddress}
            placeholder="주소"
            type="text"
            maxLength={undefined}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={true}
          />

          <InputRound
            value={valueAddressDetail}
            placeholder="상세주소"
            type="text"
            maxLength={undefined}
            status={null}
            bottomText={""}
            bottomTextClickable={false}
            bottomTextOnClick={() => {}}
            onChange={(text: string) => {
              setValueAddressDetail(text);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            disabled={false}
          />
        </InputsContainer>

        <ButtonLarge
          text={"저장"}
          buttonColor={
            valueNickname !== "" && valueName !== "" && isValidPhone
              ? COLORS.mainColor
              : COLORS.greyColor
          }
          textColor={COLORS.primaryColor}
          onClick={() => {}}
        />
      </Container>

      {openPostcode && (
        <DaumPostBackground>
          <DaumPostcodeContainer>
            <DaumPostcodeClose>
              <Spacer />
              <div
                onClick={() => {
                  setOpenPostcode(false);
                }}
              >
                <IconX
                  color={COLORS.whiteColor}
                  width={undefined}
                  height={20}
                />
              </div>
            </DaumPostcodeClose>
            <DaumPostcode
              onComplete={(data) => {
                handleComplete(data);
                setOpenPostcode(false);
              }}
              autoClose={true}
            />
          </DaumPostcodeContainer>
        </DaumPostBackground>
      )}
    </DefaultLayout>
  );
};

const TopNavCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;
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
  gap: 40px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 12px;
`;

const FindAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const FindAddressButton = styled.div`
  border-radius: 8px;
  background: ${COLORS.mainColor};

  cursor: pointer;

  p {
    padding: 16px 12px;

    color: ${COLORS.whiteColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const DaumPostBackground = styled.div`
  position: absolute;

  left: 0;
  top: 0;

  z-index: 2;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  overflow: hidden;
`;

const DaumPostcodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  width: 100%;
  height: 100%;

  padding: 0 20px;
  box-sizing: border-box;
`;

const DaumPostcodeClose = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
`;

export default AddressEditPage;
