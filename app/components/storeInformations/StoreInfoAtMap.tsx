import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { IconHeart } from "../icons";
import { useSelector } from "react-redux";
import { user } from "@/public/utils/types";
import { ButtonLarge, ButtonLargeSingle, ButtonSmall } from "../buttons";
import { IconChevronLeft } from "../icons";
import { SetStateAction } from "react";

interface StoreInfoAtMapProps {
  setStore: React.Dispatch<SetStateAction<string>>;
}

//TODO : Props 구체화 필요함.
const StoreInfoAtMap: React.FC<StoreInfoAtMapProps> = ({ setStore }) => {
  const userData: user = useSelector((state: any) => state.poppingUser.user);

  const backButtonClickhandler = () => {
    setStore("");
  };

  return (
    <PopupStoreInfoContainer>
      <PopupStoreImage>
        <div className={"back-button"} onClick={backButtonClickhandler}>
          <IconChevronLeft width={9} height={16} color={COLORS.primaryColor} />
        </div>
      </PopupStoreImage>
      <PopupStoreDescContainer>
        <div className={"slider-desc-header"}>
          <p className={"slider-store-name"}>일릭서 스토어</p>
          <div className={"slider-store-like"}>
            <IconHeart width={32} height={30} color={COLORS.mainColor} />
            <p>99만</p>
          </div>
        </div>

        <div className={"slider-store-desc"}>
          일어나라 노예들이여 이 텍스트는 무한정 늘릴 수 있긴 한데
          여어어어어어어어어어어어어기까지 가면 안대여
        </div>
        <p className={"slider-store-address"}>
          서울시 용산구 한강대로 109 17층
        </p>
        <p className={"slider-store-address"}>2024.07.24 ~ 2024. 08. 15</p>
      </PopupStoreDescContainer>
      <ButtonContainer>
        {userData.isPopper ? (
          <>
            <ButtonLarge
              text={"방문하기"}
              backgroundColor={COLORS.mainColor}
              textColor={COLORS.primaryColor}
              onClick={() => {
                console.log("router 처리 필요");
              }}
            />
            <ButtonLarge
              text={"통계"}
              backgroundColor={COLORS.primaryColor}
              textColor={COLORS.mainColor}
              onClick={() => {
                console.log("router 처리 필요");
              }}
              border={`2px solid ${COLORS.mainColor}`}
            />
          </>
        ) : (
          <>
            <ButtonLargeSingle
              text={"방문하기"}
              backgroundColor={COLORS.mainColor}
              textColor={COLORS.primaryColor}
              onClick={() => {
                console.log("router 처리 필요");
              }}
            />
          </>
        )}
      </ButtonContainer>
    </PopupStoreInfoContainer>
  );
};

const PopupStoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 0px;
  width: 100%;
`;

//TODO : 추후 이미지로 삽입
const PopupStoreImage = styled.div`
  width: 100%;
  height: 215px;
  background-color: ${COLORS.greyColor};

  & .back-button {
    position: relative;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }
`;

const PopupStoreDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden;
  padding: 16px 20px;
  width: calc(100% - 40px);

  .slider-desc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .slider-store-like {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    margin-left: 30px;

    & > p {
      font-family: "Pretendard";
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .slider-store-name {
    font-family: "Pretendard";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .slider-desc-container {
    display: flex;
    flex-direction: column;
  }

  .slider-store-desc {
    padding-right: 70px;
    font-family: "Pretendard";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 32px;
  }

  .slider-store-address {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 95%;
`;

export default StoreInfoAtMap;
