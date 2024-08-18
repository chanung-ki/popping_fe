"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "@/app/components/icons";
import { useRouter } from "next/navigation";
import StoreInformation from "@/app/components/storeInformations/StoreInformation";

//TODO: params 넘길지? 어떻게 검색 결과 표출할지.

const SearchResultPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <ResultHeader>
        <ResultHeaderContents>
          <div
            onClick={() => {
              router.push("/papup-map/palceMap");
            }}
          >
            <IconChevronLeft
              width={9}
              height={16}
              color={COLORS.secondaryColor}
            />
          </div>
          <p>서울 용산구의 &quot;일릭서&quot; 검색 결과</p>
        </ResultHeaderContents>
      </ResultHeader>

      <LocationContainer>
        <StoreInformation storeId="123" />
        <StoreInformation storeId="123"/>
        <StoreInformation storeId="123"/>
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
  align-items: flex-start;
  padding: 13px 20px;
  width: calc(100% - 40px);
`;

const ResultHeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 0px 20px;
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
