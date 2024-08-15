import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconHeart } from "../components/icons";
import { Spacer } from "../components/layout";

type storesTypes = {
  image: string;
  isLiked: boolean;
  brand: string;
  desc: string;
  location: string;
  date: string;
};

type storesType = {
  values: storesTypes[];
};

const Stores = ({ values }: storesType) => {
  return (
    <Container>
      {values.map((value: storesTypes) => {
        return (
          <Store>
            <StoreImage image={value.image}>
              <IsLiked>
                <IconHeart
                  color={value.isLiked ? COLORS.mainColor : COLORS.greyColor}
                  width={undefined}
                  height={16}
                />
              </IsLiked>
            </StoreImage>

            <StoreTextContainer>
              <StoreDesc>
                <p>{value.brand}</p>
                <p>{value.desc}</p>
              </StoreDesc>

              <Spacer />

              <StoreInfo>
                <p>{value.location}</p>
                <p>{value.date}</p>
              </StoreInfo>
            </StoreTextContainer>
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
  max-width: 40%;
  width: 100%;
  height: 90px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  border-radius: 8px;
  object-position: center;
  object-fit: cover;
`;

const IsLiked = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const StoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 20px;
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

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${COLORS.greyColor};
    font-family: "Pretendard";
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export default Stores;
