"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

//버튼이 아니라 Link로 하는게 나을듯? 

const OnlinePopUpOpenningPage: React.FC = () => {
  return (
    <OpenningPageContainer>
      <OpenningPageContentsContainer>
        <Button>입장하기</Button>
      </OpenningPageContentsContainer>
    </OpenningPageContainer>
  );
};

const OpenningPageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("/images/dummy_sky.jpeg");
  background-size: cover;
`;

const OpenningPageContentsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 15px 0px;
  width: 353px;
  background-color: ${COLORS.mainColor};
  color: ${COLORS.primaryColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 60px;
`;

export default OnlinePopUpOpenningPage;
