"use client";
import styled from "styled-components";
import { DefaultLayout } from "@/app/components/layout";
import { useRouter, useSearchParams } from "next/navigation";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "@/app/components/icons";
import { useEffect } from "react";

const MapSearchResultPage: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    console.log(params.get("search"));
    console.log(params.get("location"));
  }, [params]);
  return (
    <DefaultLayout top={0} bottom={0} left={0} right={0}>
      <Container>
        <ResultHeader>
          <ResultHeaderContents>
            <div
              onClick={() => {
                router.push("/popup-map");
              }}
            >
              <IconChevronLeft
                width={9}
                height={16}
                color={COLORS.secondaryColor}
              />
            </div>
            <p>
              {params.get("location")}의 &quot;{params.get("search")}&quot; 검색
              결과
            </p>
          </ResultHeaderContents>
        </ResultHeader>
      </Container>
    </DefaultLayout>
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
  position: absolute;
  z-index: 1;
  top: 16px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;
  width: calc(100% - 40px);
  height: 32px;

  & > p {
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ResultHeaderContents = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  gap: 50px;
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
export default MapSearchResultPage;
