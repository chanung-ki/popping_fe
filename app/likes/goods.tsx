import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconBookmark } from "../components/icons";

type goodsTypes = {
  image: string;
  brand: string;
  name: string;
  isLiked: boolean;
};

type goodsType = {
  values: goodsTypes[];
};

const Goods = ({ values }: goodsType) => {
  return (
    <Grid>
      {values.map((value: goodsTypes, index: number) => {
        return (
          <Stuff key={index}>
            <StuffImage image={value.image}>
              <IsLiked>
                <IconBookmark
                  color={value.isLiked ? COLORS.mainColor : COLORS.greyColor}
                  width={undefined}
                  height={16}
                />
              </IsLiked>
            </StuffImage>

            <StuffDesc>
              <p>{value.brand}</p>
              <p>{value.name}</p>
            </StuffDesc>
          </Stuff>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 열 */
  column-gap: 8px;
  row-gap: 20px;
`;

const Stuff = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  cursor: pointer;
`;

const StuffImage = styled.div<{ image: string | null }>`
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

const StuffDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
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

export default Goods;
