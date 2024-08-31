import styled from "styled-components";
import { PlaceDataType } from "@/public/utils/types";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";

interface SurroundRestaurantCardProps {
  restaurantData: PlaceDataType;
}

const SurroundRestaurantCard: React.FC<SurroundRestaurantCardProps> = ({
  restaurantData,
}) => {
  const cardClickHandler = () => {
    //card click handler
    const userConfirmed = window.confirm(
      "해당 위치를 네이버 지도에서 검색하시겠습니까?"
    );
    if (userConfirmed) {
      const naverMapUrl = `https://map.naver.com/v5/search/${restaurantData.title} ${restaurantData.loadAddr}`;
      // const naverMapUrl = `https://map.naver.com/v5/search/${restaurantData.geoData.coordinates[1]},${restaurantData.geoData.coordinates[0]}`;
      window.open(naverMapUrl, "_blank");
    }
  };

  return (
    <RestaurantCard onClick={cardClickHandler}>
      <RestaurantImage>
        <Image
          src={`data:image/webp;base64,${restaurantData.image}`}
          alt={restaurantData.title}
          fill
        />
        <Distance>{(restaurantData.distance / 1000).toFixed(2)} km</Distance>
      </RestaurantImage>

      <RestaurantInfo>
        <div className={"restaurant-title"}>{restaurantData.title}</div>
        <RestaurantTags>
          {restaurantData.bestMenu.map(
            (menu, index) =>
              index < 4 && (
                <RestaurantTag>
                  <span>#</span> <span className={"menu-title"}>{menu}</span>
                </RestaurantTag>
              )
          )}
        </RestaurantTags>
      </RestaurantInfo>
    </RestaurantCard>
  );
};

const RestaurantCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 8px;

  width: 166px;

  cursor: pointer;
`;

const RestaurantImage = styled.div`
  position: relative;

  width: 166px;
  height: 166px;
  border-radius: 8px;
  overflow: hidden;
`;

const RestaurantOverlay = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 5;
  width: 100%;
  height: 50px;
  background: linear-gradient(to top, rgba(103, 102, 102, 0.5), transparent);
`;

const Distance = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  font-size: 12px;
  font-weight: 700;

  padding: 4px 8px;
  background-color: ${COLORS.whiteColor};
  border-radius: 8px;

  color: ${COLORS.secondaryColor};
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

  .restaurant-title {
    width: 100%;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    font-size: 14px;
    font-weight: 700;
    font-style: normal;
    line-height: normal;
    color: ${COLORS.secondaryColor};
  }
`;

const RestaurantTags = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
  overflow: hidden;
`;

const RestaurantTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  gap: 2px;

  max-width: 80px;
  padding: 4px 8px;
  border: 1px solid ${COLORS.greyColor};
  border-radius: 16px;

  background-color: ${COLORS.whiteColor};

  font-size: 12px;
  font-style: normal;
  line-height: normal;

  .menu-title {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    color: ${COLORS.secondaryColor};
  }

  & > span {
    color: ${COLORS.mainColor};
    font-weight: 700;
  }
`;

export default SurroundRestaurantCard;
