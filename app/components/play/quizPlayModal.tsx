import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { ButtonSmall } from "../buttons";

type PlayModalProps = {
  explanation: string;
  isCorrect: boolean;
  currentQuestionIndex: number;
  correctCount: number;
  redirectPath: string;
  onNext: () => void;
}

const QuizPlayModal: React.FC<PlayModalProps> = ({ explanation, isCorrect, currentQuestionIndex, correctCount, redirectPath, onNext }) => {

  const router = useRouter();
  
  return (
    <Background>
      <ModalContainer>
      {currentQuestionIndex === 4 ? (
        <Card>
          <TitleText>5문제 중 {correctCount}문제 정답</TitleText>
          <DescriptionText>축하드립니다! 정답 갯수에 따른 상품을 지급해드리겠습니다 :)</DescriptionText>
          <ButtonSmall
            text="확인"
            buttonColor={COLORS.mainColor}
            textColor={COLORS.primaryColor}
            onClick={()=>{
              localStorage.setItem("isPlayQuizGame", JSON.stringify(true));
              router.push(redirectPath);
            }}
          />
        </Card>
      ) : (
        <Card>
          <TitleText>(아이콘 필요) {isCorrect ? "정답입니다!" : "오답입니다!"}</TitleText>
          <DescriptionText>해설 : {explanation}</DescriptionText>
          <ButtonSmall
            text="다음 문제"
            buttonColor={COLORS.mainColor}
            textColor={COLORS.primaryColor}
            onClick={onNext}
          />
        </Card>
      )}
      </ModalContainer>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  left: 0;
  top: 0;

  z-index: 10;

  overflow: hidden;
`;

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
`;

const Card = styled.div`
  background: ${COLORS.primaryColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 32px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

export default QuizPlayModal;