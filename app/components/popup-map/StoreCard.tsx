"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconHeart } from "../icons";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PopupStoreSimpleData, PopupStoreDataType } from "@/public/utils/types";
import axiosInstance from "@/public/network/axios";
import { Follow } from "@/public/utils/function";

interface StoreCardProps {
  store: PopupStoreDataType;
  isPopper: boolean;
}

//TODO : Props interface 정의 필요
const StoreCard: React.FC<StoreCardProps> = ({
  store,
  isPopper,
}: StoreCardProps) => {
  const router = useRouter();
  const [saved, setSaved] = useState<boolean>(store.isSaved);
  const [popupData, setPopupData] = useState<PopupStoreDataType>(store);



  const onClickHandler = (popupId: string) => {
    router.push(`/popup-map/${popupId}`);
  };

  const handleBookmarkClick = async (id: string) => {
    setSaved(!saved);
    if (saved) {
      setPopupData({
        ...popupData,
        saveCount: popupData.saveCount - 1,
      });
    } else {
      setPopupData({
        ...popupData,
        saveCount: popupData.saveCount + 1,
      });
    }
    Follow("Popup", id, router);
  };

  return (
    <StoreCardContainer onClick={() => onClickHandler(store.id)}>
      <StoreThumbnail>
        <Image
          loading="lazy"
          src={`data:image/webp;base64,${store.image}`}
          alt={`thumbnail-${store.id}`}
          fill
        />
        {isPopper || (
          <div className={"icon"} onClick={(event) => {
            event.stopPropagation(); // 부모 요소로의 이벤트 전파를 막음
            handleBookmarkClick(store.id);
          }}>
            <IconHeart
              color={saved ? COLORS.mainColor : COLORS.greyColor}
              width={16}
              height={15}
            />
          </div>
        )}
      </StoreThumbnail>
      <div className={"store-name"}>{store.title}</div>
      <div className={"store-desc"}>{store.description[0]}</div>
    </StoreCardContainer>
  );
};

const StoreCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 166px;

  cursor: pointer;

  .store-name {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .store-desc {
    width: 100%;

    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;

const StoreThumbnail = styled.div`
  position: relative;
  width: 166px;
  height: 166px;

  border-radius: 8px;
  background-color: ${COLORS.greyColor};
  overflow: hidden;

  .icon {
    position: absolute;
    z-index: 1;
    top: 138px;
    left: 138px;

    cursor: pointer;
  }
`;

export default StoreCard;
