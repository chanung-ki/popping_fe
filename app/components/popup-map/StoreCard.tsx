"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconHeart } from "../icons";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PopupStoreSimpleData, PopupStoreDataType } from "@/public/utils/types";
import axiosInstance from "@/public/network/axios";

interface StoreCardProps {
  store: PopupStoreSimpleData;
  // clickedStore: PopupStoreSimpleData | null;
  // setClickedStore: React.Dispatch<React.SetStateAction<PopupStoreDataType | null>>;
  // isViewDesc: boolean;
  // setIsViewDesc: React.Dispatch<React.SetStateAction<boolean>>;
  isPopper: boolean;
}

//TODO : Props interface 정의 필요
const StoreCard: React.FC<StoreCardProps> = ({
  store,
  // clickedStore,
  // setClickedStore,
  // isViewDesc,
  // setIsViewDesc,
  isPopper,
}: StoreCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // const popupStoreAPI = async (popupId:string) => {

  //   await axiosInstance
  //     .get(`/api/maps/popup/${popupId}`)
  //     .then((response: any) => {
  //       setClickedStore(response.data.popupData);
  //     })
  //     .catch((error: any) => {
  //       console.error("There was an error making the GET request!", error);
  //     });
  // };


  // 스토어 클릭시
  const onClickHandler = (popupId: string) => {
    router.push(`/popup-map/${popupId}`)
    // popupStoreAPI(popupId)
    // setIsViewDesc(!isViewDesc);
  };

  return (
    <StoreCardContainer onClick={() => onClickHandler(store.id)}>
      <StoreThumbnail>
        {/*실제 데이터 이미지*/}
        {/* <Image
          src={`data:image/jpeg;base64,${store.image}`}
          width={166}
          height={166}
          alt={store.description[0]}
        /> */}

        {/*더미 데이터 이미지*/}
        <Image
          loading="lazy"
          src={`data:image/webp;base64,${store.image}`}
          alt={"앨랠래"}
          fill
        />
        {isPopper || (
          <div className={"icon"} onClick={() => setIsLiked(!isLiked)}>
            <IconHeart
              color={isLiked ? COLORS.mainColor : COLORS.lightGreyColor}
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
