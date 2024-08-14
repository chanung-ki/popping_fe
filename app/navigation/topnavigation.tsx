import { COLORS } from "@/public/styles/colors";
import styled from "styled-components";

type TopNavTypes = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;

  position: relative;

  width: 100%;
  height: 68px;

  background: ${COLORS.primaryColor};
`;

export const TopNavigation = ({ children }: TopNavTypes) => {
  return <Container>{children}</Container>;
};
