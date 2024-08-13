import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconChevronLeft } from "../icons";
import React from "react";

interface ChildrenType {
  children: React.ReactNode;
}

interface ProgressType {
  value: number;
}

interface FormType {
  children: React.ReactNode;
}

const Title = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-bottom: 52px;
`;

const ChevronLeftContainer = styled.div`
  margin-bottom: 40px;
`;

const Progress = styled.progress`
  width: 100%;
  height: 16px;
  appearance: none;
  margin-bottom: 20px;

  &::-webkit-progress-bar {
    height: 100%;

    border-radius: 16px;
    border: 1px solid ${COLORS.mainColor};
    background-color: ${COLORS.primaryColor};
    overflow: hidden;
  }

  &::-webkit-progress-value {
    height: 100%;
    border-radius: 16px;

    background-color: ${COLORS.mainColor};
    transition: width 0.3s ease;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;
`;

export const MemberTitle = ({ children }: ChildrenType) => {
  return <Title>{children}</Title>;
};

export const MemberChevronLeft = () => {
  return (
    <ChevronLeftContainer>
      <IconChevronLeft
        color={COLORS.secondaryColor}
        width={undefined}
        height={16}
      />
    </ChevronLeftContainer>
  );
};

export const MemberProgressBar = ({ value }: ProgressType) => {
  return <Progress value={value} max="100" />;
};

export const MemberForm = ({ children }: FormType) => {
  return <Form>{children}</Form>;
};
