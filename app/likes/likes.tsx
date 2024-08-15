import { styled } from "styled-components";
import { DefaultLayout } from "../components/layout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import { TopNavigation } from "../navigation/topnavigation";
import { Taps } from "../components/tabs";
import { useState } from "react";
import Goods from "./goods";
import Stores from "./stores";
import Following from "./follwing";

const LikesPage: React.FC = () => {
  const tabValues: string[] = ["상품", "스토어", "팔로잉"];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <DefaultLayout top={"0"} right={"20px"} bottom={"0"} left={"20px"}>
      <TopNavigation>
        <TopNavCenterContainer>
          <TopNavTitle>관심</TopNavTitle>
        </TopNavCenterContainer>
      </TopNavigation>
      <Container>
        <Taps
          values={tabValues}
          selected={tabValues[selectedIndex]}
          onSelect={(index: number) => {
            setSelectedIndex(index);
          }}
        />
        {selectedIndex === 0 && (
          <Goods
            values={[
              { image: "", brand: "test", name: "test", isLiked: true },
              { image: "", brand: "test", name: "test", isLiked: false },
            ]}
          />
        )}
        {selectedIndex === 1 && (
          <Stores
            values={[
              {
                image: "",
                isLiked: true,
                brand: "test",
                desc: "testtest",
                location: "서울시 용산구",
                date: "2024.7.24 ~ 2024.8.15",
              },
              {
                image: "",
                isLiked: false,
                brand: "test2",
                desc: "testtest",
                location: "서울시 용산구",
                date: "2024.7.24 ~ 2024.8.16",
              },
            ]}
          />
        )}
        {selectedIndex === 2 && (
          <Following
            values={[
              { image: "", isLiked: true, brand: "test" },
              { image: "", isLiked: false, brand: "test" },
            ]}
          />
        )}
      </Container>
    </DefaultLayout>
  );
};

const TopNavCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;

  cursor: pointer;
`;

const TopNavTitle = styled.p`
  color: ${COLORS.secondaryColor};
  text-align: center;
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

export default LikesPage;
