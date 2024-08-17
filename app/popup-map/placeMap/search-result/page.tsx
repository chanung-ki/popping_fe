"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "@/app/components/icons";
import { useRouter } from "next/navigation";
import StoreInformation from "@/app/components/storeInformations/StoreInformation";

//TODO: params 넘길지? 어떻게 검색 결과 표출할지.

const SearchResultPage: React.FC = () => {
  return (
    <Container>
      <ResultHeader>
        <div>
          <IconChevronLeft
            width={9}
            height={16}
            color={COLORS.secondaryColor}
          />
        </div>
        <p>서울 용산구의 &quot;일릭서&quot; 검색 결과</p>
      </ResultHeader>
      <LocationContainer>
        <StoreInformation />
        <StoreInformation />
        <StoreInformation />
        <StoreInformation />
      </LocationContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
  background-color: ${COLORS.whiteColor};
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 13px 20px;
  width: calc(100% - 40px);
`;

const LocationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 21px;

  margin-top: 32px;
  width: 100%;
`;
export default SearchResultPage;
