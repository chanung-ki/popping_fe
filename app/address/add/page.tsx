"use client";

import { ButtonLarge } from "@/app/components/buttons";
import { IconChevronLeft } from "@/app/components/icons";
import { InputRound } from "@/app/components/inputs";
import { DefaultLayout } from "@/app/components/layout";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { COLORS } from "@/public/styles/colors";
import { RegexpInputNumber, RegexpPhone } from "@/public/utils/regexp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { styled } from "styled-components";

const AdressAddPage: React.FC = () => {
  const [valueNickname, setValueNickname] = useState<string>("");
  const [valueName, setValueName] = useState<string>("");
  const [valuePhone, setValuePhone] = useState<string>("");
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);

  const [valueZIPCode, setValueZIPCode] = useState<string>("");
  const [valueAddress, setValueAddress] = useState<string>("");
  const [valueAddressDetail, setValueAddressDetail] = useState<string>("");

  const router = useRouter();

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
            placeholder="닉네임"
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

            <FindAddressButton>
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

export default AdressAddPage;
