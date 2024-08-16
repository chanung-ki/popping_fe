import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconHeart } from "../components/icons";
import { Spacer } from "../components/layout";

type storesTypes = {
  image: string;
  isLiked: boolean;
  brand: string;
  desc: string;
};

type storesType = {
  values: storesTypes[];
};

const Stores = ({ values }: storesType) => {
  return (
    <Grid>
      {values.map((value: storesTypes, index: number) => {
        return (
          <Store key={index}>
            <StoreImage image={value.image}>
              <IsLiked>
                <IconHeart
                  color={value.isLiked ? COLORS.mainColor : COLORS.greyColor}
                  width={undefined}
                  height={16}
                />
              </IsLiked>
            </StoreImage>

            <StoreDesc>
              <p>{value.brand}</p>
              <p>{value.desc}</p>
            </StoreDesc>
          </Store>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 한 줄에 3개의 열 */
  column-gap: 20px;
  row-gap: 20px;
`;

const Store = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  cursor: pointer;
`;

const StoreImage = styled.div<{ image: string | null }>`
  position: relative;
  width: 100%; /* 그리드 셀의 너비에 맞춤 */
  padding-bottom: 100%;
  border-radius: 8px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.secondaryColor};
  object-position: center;
  object-fit: cover;
`;

const IsLiked = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const StoreDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p:last-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export default Stores;
