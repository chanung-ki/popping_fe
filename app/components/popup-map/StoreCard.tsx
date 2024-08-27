"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconHeart } from "../icons";
import { useState } from "react";

//TODO : Props interface 정의 필요
const StoreCard: React.FC = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <StoreCardContainer>
      {/*StoreThumbnail에 이미지가 들어가도록 변경 필요*/}
      <StoreThumbnail>
        <div className={"icon"} onClick={() => setIsLiked(!isLiked)}>
          <IconHeart
            color={isLiked ? COLORS.mainColor : COLORS.lightGreyColor}
            width={16}
            height={15}
          />
        </div>
      </StoreThumbnail>
      <p className={"store-name"}>일릭서 스토어</p>
      <p className={"store-desc"}>
        일어나라 노예들이여 이 텍스트는 두줄까지만 가능
      </p>
    </StoreCardContainer>
  );
};

const StoreCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 166px;

  .store-name {
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .store-desc {
    width: 100%;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

const StoreThumbnail = styled.div`
  position: relative;
  width: 166px;
  height: 166px;

  border-radius: 8px;
  background-color: ${COLORS.greyColor};

  .icon {
    position: absolute;
    z-index: 1;
    top: 138px;
    left: 138px;

    cursor: pointer;
  }
`;

export default StoreCard;
