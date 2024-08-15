import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import {
  Bubble,
  IconCenter,
  IconHome,
  IconLikes,
  IconMap,
  IconMypage,
} from "./icons";

type BottomNavTypes = {
  onClick: CallableFunction;
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;

  transform: translate(-50%, 0);

  display: flex;
  flex-direction: row;
  gap: 0px;

  border-radius: 20px 20px 0px 0px;

  /* 아래, 위, 왼, 오 */
  box-shadow: 0 0 0 0 ${COLORS.greyColor} inset,
    0 1px 0 0 ${COLORS.greyColor} inset, 1px 0 0 0 ${COLORS.greyColor} inset,
    1px 0 0 0 ${COLORS.greyColor} inset;

  min-width: 320px;
  max-width: 767px;
  width: 100%;
  height: 58px;

  background: ${COLORS.primaryColor};
`;

const Menu = styled.div`
  position: relative;
  flex: 1;
  height: 100%;

  cursor: pointer;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 4px;

  svg {
    width: auto;
    height: 21px;
  }

  p {
    color: ${COLORS.secondaryColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const MenuCenterContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BubbleContainer = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const BottomNavigation = ({ onClick }: BottomNavTypes) => {
  return (
    <Container>
      {/* 홈 */}
      <Menu>
        <MenuContainer
          onClick={() => {
            onClick(0);
          }}
        >
          <IconHome color={COLORS.greyColor} />
          <p>홈</p>
        </MenuContainer>
      </Menu>
      {/* 팝업 지도 */}
      <Menu>
        <MenuContainer
          onClick={() => {
            onClick(1);
          }}
        >
          <IconMap color={COLORS.greyColor} />
          <p>팝업 지도</p>
        </MenuContainer>
      </Menu>
      {/* 중앙 */}
      <Menu>
        <MenuCenterContainer
          onClick={() => {
            onClick(2);
          }}
        >
          <IconCenter />
          <BubbleContainer>
            <Bubble />
          </BubbleContainer>
        </MenuCenterContainer>
      </Menu>
      {/* 관심 */}
      <Menu>
        <MenuContainer
          onClick={() => {
            onClick(3);
          }}
        >
          <IconLikes color={COLORS.greyColor} />
          <p>관심</p>
        </MenuContainer>
      </Menu>
      {/* 마이페이지 */}
      <Menu>
        <MenuContainer
          onClick={() => {
            onClick(4);
          }}
        >
          <IconMypage color={COLORS.greyColor} />
          <p>관심</p>
        </MenuContainer>
      </Menu>
    </Container>
  );
};