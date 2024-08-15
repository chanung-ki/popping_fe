import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconHeart } from "../components/icons";
import { Spacer } from "../components/layout";

type followingTypes = {
  image: string;
  isLiked: boolean;
  brand: string;
};

type followingType = {
  values: followingTypes[];
};

const Following = ({ values }: followingType) => {
  return (
    <Container>
      {values.map((value: followingTypes) => {
        return (
          <Store>
            <StoreImage image={value.image}>
              <BrandText>{value.brand}</BrandText>

              <IsLiked>
                <IconHeart
                  color={value.isLiked ? COLORS.mainColor : COLORS.greyColor}
                  width={undefined}
                  height={16}
                />
              </IsLiked>
            </StoreImage>
          </Store>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Store = styled.div`
  display: flex;
  flex-direction: row;

  gap: 24px;
`;

const StoreImage = styled.div<{ image: string | null }>`
  position: relative;
  width: 100%;
  height: 90px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  border-radius: 8px;
  object-position: center;
  object-fit: cover;
`;

const BrandText = styled.span`
  position: absolute;
  left: 12px;
  bottom: 8px;

  color: ${COLORS.primaryColor};
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const IsLiked = styled.div`
  position: absolute;
  right: 12px;
  bottom: 8px;
`;

export default Following;
