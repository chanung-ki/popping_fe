"use client";

import { ButtonLarge } from "@/app/components/buttons";
import { IconChevronLeft } from "@/app/components/icons";
import { BottomBox, DefaultLayout } from "@/app/components/layout";
import { TopNavigation } from "@/app/navigation/topnavigation";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

const AdressListPage: React.FC = () => {
  const router = useRouter();

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>배송지 관리</TopNavTitle>
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
        <ButtonLarge
          text="배송지 추가"
          buttonColor={COLORS.primaryColor}
          borderWidth={1}
          borderColor={COLORS.mainColor}
          textColor={COLORS.mainColor}
          onClick={() => {}}
        />
        <AddressesContainer>
          <AddressBox>
            {true && (
              <BadgeContainer>
                <DefaultBadge>
                  <p>기본</p>
                </DefaultBadge>
              </BadgeContainer>
            )}
            <AddressNickname>
              {"집"}({"김팝플"})
            </AddressNickname>
            <AddressText>010-1234-5678</AddressText>
            <AddressText>({12345})서울특별시 용산구</AddressText>
            <OptionsContainer>
              {false && <SetDefaultText>기본 배송지 선택</SetDefaultText>}
              <OptionText>변경</OptionText>
              <OptionText>삭제</OptionText>
            </OptionsContainer>
          </AddressBox>
        </AddressesContainer>
      </Container>
      <BottomBox />
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
  gap: 32px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const AddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DefaultBadge = styled.div`
  border-radius: 4px;
  background: ${COLORS.mainColor};

  p {
    padding: 4px 12px;

    color: ${COLORS.whiteColor};
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const AddressNickname = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-bottom: 4px;
`;

const AddressText = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SetDefaultText = styled.p`
  color: ${COLORS.mainColor};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
`;

const OptionText = styled.p`
  color: ${COLORS.greyColor};
  font-family: "Pretendard";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
`;

export default AdressListPage;
