import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useRouter } from "next/router";
import { IconHeart } from "../icons";
import {
  GeoData,
  LocationData,
  PopupStoreData,
} from "@/app/popup-map/placeMap/page";

//TODO : 재희님과 협의 후 Props 정의
interface StoreInformationProps {
  store: PopupStoreData;
}

const StoreInformation: React.FC = () => {
  return (
    <EachLocationContainer>
      <div
        style={{
          width: "100%",
          height: "166px",
          backgroundColor: `${COLORS.greyColor}`,
          borderRadius: "8px",
        }}
      >
        <div className={"heart-icon"}>
          <IconHeart
            width={16}
            height={16}
            color={COLORS.mainColor}
            //색 처리 해야됨.
          />
        </div>
      </div>
      <div className={"store-description-container"}>
        <p className={"store-name"}>일릭서 스토어</p>
        <p className={"store-description"}>
          일어나라 노예들이여 이 텍스트는 두줄까지만 가능
        </p>
      </div>
    </EachLocationContainer>
  );
};

const EachLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 166px;

  & .heart-icon {
    position: relative;
    top: 138px;
    left: 138px;
  }

  & .store-description-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & .store-name {
      font-size: 16px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
    }

    & .store-description {
      width: 100%;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

export default StoreInformation;
