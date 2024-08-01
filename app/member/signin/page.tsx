"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

const SignInPage: React.FC = () => {
  return (
    <SigninContainer>
      <SignInFormContainer>
        <h1>POPPING</h1>
        <SignInForm></SignInForm>
      </SignInFormContainer>
    </SigninContainer>
  );
};

const SigninContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInFormContainer = styled.div`
  & > h1 {
    font-family: "GmarketSansTTFBold";
    color: ${COLORS.mainColor};
  }
`;

const SignInForm = styled.form``;

export default SignInPage;
