import { COLORS } from "@/public/styles/colors";
import { MobileMaxWidth, MobileMinWidth } from "@/public/styles/size";
import { styled } from "styled-components";

type LayoutTypes = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  children: React.ReactNode;
};

type ContainerPaddingTypes = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const Layout = styled.div`
  position: relative;

  min-width: ${MobileMinWidth}px;
  max-width: ${MobileMaxWidth}px;
  width: 100%;
  height: 100dvh;
  background-color: ${COLORS.primaryColor};

  border: 0;
`;

const Container = styled.div<ContainerPaddingTypes>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  height: calc(
    100% - (${(props) => props.top}px + ${(props) => props.bottom}px)
  );

  padding: ${(props) => props.top}px ${(props) => props.right}px
    ${(props) => props.bottom}px ${(props) => props.left}px;

  background: ${COLORS.primaryColor};

  overflow-x: hidden;
  overflow-y: scroll;

  @media (min-width: ${MobileMaxWidth + 1}px) {
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1), 2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const SpacerContainer = styled.div`
  flex-grow: 1;
`;

export const DefaultLayout = ({
  top,
  right,
  bottom,
  left,
  children,
}: LayoutTypes) => {
  return (
    <Layout>
      <Container top={top} right={right} bottom={bottom} left={left}>
        <>{children}</>
      </Container>
    </Layout>
  );
};

export const Spacer = () => {
  return <SpacerContainer />;
};

const BottomPaddingBox = styled.div`
  display: block;
  width: 100%;
  height: 80px;

  background: transparent;
`;

export const BottomBox = () => {
  return <BottomPaddingBox />;
};
