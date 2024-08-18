import styled from "styled-components"
import { COLORS } from "@/public/styles/colors";
import { IconHeart } from "../icons";

//TODO : Props 구체화 필요함.
const StoreInfoAtMap: React.FC = () => {
  return(
    <PopupStoreInfoContainer>
              <PopupStoreImage />
              <PopupStoreDescContainer>
                <div className={"slider-desc-header"}>
                  <p className={"slider-store-name"}>일릭서 스토어</p>
                  <div className={"slider-store-like"}>
                    <IconHeart
                      width={32}
                      height={30}
                      color={COLORS.mainColor}
                    />
                    <p>99만</p>
                  </div>
                </div>

                <p className={"slider-store-desc"}>
                  일어나라 노예들이여 이 텍스트는 무한정 늘릴 수 있긴 한데
                  여어어어어어어어어어어어어기까지 가면 안대여
                </p>
                <p className={"slider-store-address"}>
                  서울시 용산구 한강대로 109 17층
                </p>
                <p className={"slider-store-address"}>
                  2024.07.24 ~ 2024. 08. 15
                </p>
              </PopupStoreDescContainer>
              <VisitStoreButton>방문하기</VisitStoreButton>
            </PopupStoreInfoContainer>
  )
}

const PopupStoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 0px;
  width: 100%;
`;

//TODO : 이미지로 대체
const PopupStoreImage = styled.div`
  width: 100%;
  height: 215px;
  background-color: ${COLORS.greyColor};
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
    max-width: 292px;
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
  }
`;

const VisitStoreButton = styled.div`
  position: fixed;
  bottom: 16px;
  z-index: 16;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  width: 353px;
  height: 48px;
  border-radius: 8px;
  background-color: ${COLORS.mainColor};

  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${COLORS.primaryColor};
`;

export default StoreInfoAtMap;