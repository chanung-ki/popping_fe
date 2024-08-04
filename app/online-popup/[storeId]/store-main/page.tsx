"use client";
import styled from "styled-components";
import FOLLOW from "@/public/icons/store_follow.svg";

const StoreMainPage: React.FC = () => {
  return (
    <StoreMainPageContainer>
      <StoreInfoContainer>
        <StoreThumbnailContainer></StoreThumbnailContainer>

        <StoreDescriptionContainer>
          <StoreNameContainer>
            <StoreName>일릭서 스토어</StoreName>
            <FOLLOW />
          </StoreNameContainer>
          <StoreDescription>
            <p>
              일어나라 노예들이여 이 텍스트는 무한정 늘릴 수 있긴 한데 여기
              Horizontal Margin 20px을 넘기 면 안대여 아~ 진짜?
            </p>
          </StoreDescription>
        </StoreDescriptionContainer>
      </StoreInfoContainer>
    </StoreMainPageContainer>
  );
};

const StoreMainPageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreThumbnailContainer = styled.div`
  width: 100%;
  height: 215px;

  background-image: url("/images/dummy_sky.jpeg");
  background-size: cover;
`;

const StoreDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: calc(100% - 40px);
  padding: 0px 20px;
`;

const StoreNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StoreName = styled.p`
  font-size: 32px;
  font-weight: 500;
`;

const StoreDescription = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  font-size: 14px;

  & > p {
    flex: 1;
    margin-right: 20px;
  }
`;

export default StoreMainPage;
