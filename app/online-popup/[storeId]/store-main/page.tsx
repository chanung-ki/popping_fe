"use client";
import styled from "styled-components";
import FOLLOW from "@/public/icons/store_follow.svg";
import GO_BACK from "@/public/icons/gt_white.svg";
import FOLLOWED from "@/public/icons/store_follow_active.svg";
import Link from "next/link";
import { useState } from "react";
import { COLORS } from "@/public/styles/colors";

const StoreMainPage: React.FC = () => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const storeFollowHandler = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <StoreMainPageContainer>
      <CartButton></CartButton>
      <StoreInfoContainer>
        <StoreThumbnailContainer>
          <StoreThumbnailNav>
            <Link href={"/online-popup/1/store-openning"}>
              <GO_BACK />
            </Link>
          </StoreThumbnailNav>
        </StoreThumbnailContainer>

        <StoreDescriptionContainer>
          <StoreNameContainer>
            <StoreName>일릭서 스토어</StoreName>
            <FollowButtonContainer onClick={storeFollowHandler}>
              {isFollowed ? <FOLLOWED /> : <FOLLOW />}
            </FollowButtonContainer>
          </StoreNameContainer>
          <StoreDescription>
            <p>
              일어나라 노예들이여 이 텍스트는 무한정 늘릴 수 있긴 한데 여기
              Horizontal Margin 20px을 넘기 면 안대여 아~ 진짜?
            </p>
            <p>
              <span>999,999</span>명이 팔로우합니다.
            </p>
          </StoreDescription>
        </StoreDescriptionContainer>
      </StoreInfoContainer>

      <StoreItemsContainer>
        <StoreItem>
          <div
            style={{
              width: "170px",
              height: "160px",
              backgroundColor: `${COLORS.secondaryColor}`,
              borderRadius: "8px",
            }}
          />
          <div id={"product_name"}>Elixir 1st Anniversary T-S hirt</div>
          <div id={"product_options"}>BLACK/GREEN</div>
          <div id={"product_options"}>M/L/XL/</div>
          <div id={"product_price"}>32,000 KRW</div>
        </StoreItem>

        <StoreItem>
          <div
            style={{
              width: "170px",
              height: "160px",
              backgroundColor: `${COLORS.secondaryColor}`,
              borderRadius: "8px",
            }}
          />
          <div id={"product_name"}>Elixir 1st Anniversary Cup</div>
          <div id={"product_options"}>BLACK/GREEN</div>
          <div id={"product_options"}>M/L/XL/</div>
          <div id={"product_price"}>32,000 KRW</div>
        </StoreItem>

        <StoreItem>
          <div
            style={{
              width: "170px",
              height: "160px",
              backgroundColor: `${COLORS.secondaryColor}`,
              borderRadius: "8px",
            }}
            id={"product_image"}
          />
          <div id={"product_name"}>Elixir 1st Anniversary T-S hirt</div>
          <div id={"product_options"}>BLACK/GREEN</div>
          <div id={"product_options"}>M/L/XL/</div>
          <div id={"product_price"}>32,000 KRW</div>
        </StoreItem>
      </StoreItemsContainer>
    </StoreMainPageContainer>
  );
};

const StoreMainPageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const CartButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${COLORS.mainColor};
  right: 21px;
  bottom: 112px;
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StoreThumbnailContainer = styled.div`
  width: 100%;
  height: 215px;

  background-image: url("/images/dummy_sky.jpeg");
  background-size: cover;
`;

const StoreThumbnailNav = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 0px 20px;
`;

const StoreDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 40px);
  padding: 0px 20px;
`;

const StoreNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const StoreName = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const FollowButtonContainer = styled.div``;

const StoreDescription = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 14px;

  & > p {
    display: flex;
    margin-right: 20px;
    margin-bottom: -5px;
  }

  & > p > span {
    font-weight: 900;
  }
`;

const StoreItemsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 0px 0px 20px;
`;

const StoreItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  height: 300px;

  & > div {
    width: 170px;
  }

  & > div#product_name {
    font-size: 14px;
    font-weight: 900;
    margin-top: 9px;
  }

  & > div#product_options {
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
  }

  & > div#product_price {
    font-size: 16px;
    font-weight: 900;
    margin-top: 9px;
  }
`;

export default StoreMainPage;
