"use client";
import styled from "styled-components";
import { IconChevronLeft, IconHeart } from "../icons";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Store } from "@/public/utils/types";

interface StoreDescriptionProps {
  store: Store;
  isViewDesc: boolean;
  setIsViewDesc: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreDescription: React.FC<StoreDescriptionProps> = ({
  store,
  isViewDesc,
  setIsViewDesc,
}) => {
  const [isLikedStore, setIsLikedStore] = useState<boolean>(false);

  const onClickBackToList = () => {
    setIsViewDesc(!isViewDesc);
  };

  useEffect(() => {
    console.log(store);
  }, [store]);

  return (
    <StoreDescContainer>
      <StoreDescThumbnail>
        <GradientOverlay />
        {/*실제 데이터용 이미지 */}
        {/* <Image src={`data:image/jpeg;base64,${store.image}`} fill alt={store.title} /> */}
        {/*더미 데이터용 이미지 */}
        <Image src={"/images/popping-banner.png"} fill alt={"썸네일"} />
        <div className={"back-to-list"} onClick={onClickBackToList}>
          <IconChevronLeft width={9} height={16} color={COLORS.whiteColor} />
        </div>
      </StoreDescThumbnail>

      <DescContainer>
        <div className={"store-title-container"}>
          <div className={"store-title"}>{store.title}</div>
          <div className={"store-like"}>
            <div
              className={"icon"}
              onClick={() => {
                setIsLikedStore(!isLikedStore);
              }}
            >
              <IconHeart
                width={32}
                height={30}
                color={isLikedStore ? COLORS.mainColor : COLORS.greyColor}
              />
            </div>
            <div className={"like-count"}>{store.isSaved}만</div>
          </div>
        </div>
        <div className={"store-desc"}>{store.description[1]}</div>

        <div className={"store-info"}>
          <div className={"store-address"}>
            {store.location.address} {store.location.placeName}
          </div>
          {/*response body에 날짜 정보 없음 */}
          <div className={"store-date"}>2024.07.24 ~ 2024.08.15</div>
        </div>
      </DescContainer>
      <VisitButton>방문하기</VisitButton>
    </StoreDescContainer>
  );
};

const StoreDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin: 40px 0px;

  width: 100%;
`;

const StoreDescThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 215px;
  overflow: hidden;

  /* background-color: ${COLORS.greyColor}; */

  & > img {
    position: relative;
    object-fit: cover;
  }

  .back-to-list {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    z-index: 5;
    top: 20px;
    left: 20px;

    cursor: pointer;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, rgba(103, 102, 102, 0.5), transparent);
  z-index: 4; /* 그라데이션이 이미지 위에 오도록 z-index 설정 */
`;

const DescContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 0px 20px;
  width: calc(100% - 40px);
  overflow-y: auto;

  .store-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    .store-like {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .like-count {
      text-align: center;
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .store-title {
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .store-desc {
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    padding-right: 80px;
    margin-top: 8px;
  }

  .store-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    margin-top: 32px;
    padding-right: 80px;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const VisitButton = styled.button`
  all: unset;

  position: absolute;
  bottom: 16px;
  z-index: 4;

  width: calc(100% - 40px);
  height: 48px;

  border-radius: 8px;
  background-color: ${COLORS.mainColor};
  color: ${COLORS.whiteColor};

  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

export default StoreDescription;
