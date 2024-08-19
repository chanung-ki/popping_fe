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
      {values.map((value: followingTypes, index: number) => {
        return (
          <Store key={index}>
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
  cursor: pointer;
`;

const StoreImage = styled.div<{ image: string | null }>`
  position: relative;
  width: 100%;
  height: 128px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.secondaryColor};
  border-radius: 8px;
  background-position: center;
  background-size: cover;
`;

const BrandText = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;

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
  bottom: 12px;
`;

export default Following;
