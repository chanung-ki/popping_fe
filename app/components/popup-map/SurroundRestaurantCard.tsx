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
  };

  return (
    <RestaurantCard onClick={cardClickHandler}>
      <RestaurantInfo>
        <div className={"restaurant-distance"}>100m</div>
        <div className={"restaurant-bottom"}>
          <div className={"restaurant-name"}>{restaurantData.title}</div>
          <div className={"restaurant-tags"}>
            {restaurantData.tags.length > 0 &&
              restaurantData.tags.map(
                (tag: string, index: number) =>
                  //최대 태그 3개까지 제한
                  index < 3 && <span key={index}>#{tag}</span>
              )}
          </div>
        </div>
      </RestaurantInfo>
      <RestaurantOverlay />
      <RestaurantImage>
        <Image
          src={"/images/popping-cup.png"}
          alt={restaurantData.title}
          fill
        />
      </RestaurantImage>
    </RestaurantCard>
  );
};

const RestaurantCard = styled.div`
  position: relative;
  width: 166px;
  height: 161px;
  border-radius: 8px;
  background-color: ${COLORS.lightGreyColor};
  overflow: hidden;
  flex: 0 0 auto;

  cursor: pointer;
`;

const RestaurantImage = styled.div``;

const RestaurantOverlay = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  background: linear-gradient(to top, rgba(103, 102, 102, 0.5), transparent);
`;

const RestaurantInfo = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 16px);
  height: calc(100% - 16px);
  padding: 8px;

  .restaurant-info-bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
  }

  .restaurant-distance {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    font-size: 12px;
    font-weight: 300;

    color: ${COLORS.mainColor};
  }

  .restaurant-name {
    font-size: 16px;
    font-weight: 500;

    padding-right: 8px;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: ${COLORS.mainColor};
  }

  .restaurant-tags {
    display: flex;
    align-items: center;
    gap: 4px;

    padding-right: 8px;

    font-size: 12px;
    font-weight: 300;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: ${COLORS.whiteColor};
  }
`;

export default SurroundRestaurantCard;
