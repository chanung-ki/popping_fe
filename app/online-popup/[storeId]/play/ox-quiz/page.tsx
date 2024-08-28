"use client";
import styled from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { COLORS } from "@/public/styles/colors";
import { DefaultLayout } from "@/app/components/layout";
import Back from "@/app/components/back";
import { useRouter } from "next/navigation";
import { ButtonLarge } from "@/app/components/buttons";
import QuizPlayModal from "@/app/components/play/quizPlayModal";


const tempQuestion = [
  {
    question: "임시 1번 문제 입니다. 임시 1번 문제 입니다. 임시 1번 문제 입니다.",
    explanation: "임시 해설 입니다. 임시 해설 입니다.",
    answer: true,
  },
  {
    question: "임시 2번 문제 입니다. 임시 2번 문제 입니다. 임시 2번 문제 입니다. 임시 2번 문제 입니다. 임시 2번 문제 입니다. 임시 2번 문제 입니다.",
    explanation: "임시 해설 입니다. 임시 해설 입니다.",
    answer: false,
  },
  {
    question: "임시 3번 문제 입니다. 임시 3번 문제 입니다. 임시 2번 문제 입니다. 임시 2번 문제 입니다.",
    explanation: "임시 해설 입니다. 임시 해설 입니다.",
    answer: false,
  },
  {
    question: "임시 4번 문제 입니다. 임시 4번 문제 입니다. 임시 4번 문제 입니다.",
    explanation: "임시 해설 입니다. 임시 해설 입니다.",
    answer: true,
  },
  {
    question: "임시 5번 문제 입니다. 임시 5번 문제 입니다. 임시 5번 문제 입니다. 임시 5번 문제 입니다. 임시 5번 문제 입니다.",
    explanation: "임시 해설 입니다. 임시 해설 입니다.",
    answer: true,
  },
]

const OXQuizPage: React.FC<{ params: { storeId: string } }> = ({
  params,
}) => {

  const router = useRouter();
  const hasAlerted = useRef<boolean>(false);
  const { storeId } = params;
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const redirectPath = `/online-popup/${storeId}/store-opening`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");

  const updateParentWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      if (width > 0) {
        setParentWidth((width / 4) * 3);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isPlayQuizGame") === "true" && !hasAlerted.current) {
      alert("이미 해당 게임에 참여하셨습니다.");
      hasAlerted.current = true;
      router.push(redirectPath)
    }
  }, [router]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      updateParentWidth();
      window.addEventListener("resize", updateParentWidth);
    }
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [containerRef.current]);

  const onNext = () => {
    setCurrentQuestionIndex((prevIndex: number) => prevIndex + 1);
    setShowModal(false);
  }

  const handleClickAnswer = (answer: boolean) => {
    const isCorrect = tempQuestion[currentQuestionIndex].answer === answer
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setCorrectCount((prevCount: number) => prevCount + 1);
    }
    setExplanation(tempQuestion[currentQuestionIndex].explanation);
    setShowModal(true);
  };

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}> 
      {showModal && (
        <QuizPlayModal
          explanation={explanation}
          isCorrect={isCorrect}
          currentQuestionIndex={currentQuestionIndex}
          correctCount={correctCount}
          redirectPath={redirectPath}
          onNext={onNext}
        />
      )}
      <div style={{ position: "absolute", top: 16, left: 20 }}>
        <Back url={"store-opening"} color={undefined} />
      </div>
      <Container ref={containerRef}>
        <PlayContainer>
          <PlayHeaderContainer>
            <PlayTitleText>OX 퀴즈 (임시 제목)</PlayTitleText>
          </PlayHeaderContainer>
          <PlayBodyContainer>
            <QuestionText>{currentQuestionIndex+1}. {tempQuestion[currentQuestionIndex].question}</QuestionText>
          </PlayBodyContainer>
          <PlayButtonContainer>
            <ButtonLarge
              text="O"
              buttonColor={COLORS.mainColor}
              textColor={COLORS.primaryColor}
              onClick={()=>{handleClickAnswer(true)}}
            />
            <ButtonLarge
              text="X"
              buttonColor={COLORS.mainColor}
              textColor={COLORS.primaryColor}
              onClick={()=>{handleClickAnswer(false)}}
            />
          </PlayButtonContainer>
        </PlayContainer>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  background-color: ${COLORS.primaryColor};
`;

const PlayContainer = styled.div`
  height: 100%;
  width: calc(100% - 40px);

  padding: 0 20px;
  padding-bottom: 80px;
`;

const PlayHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;

  gap: 8px;
  padding-top: 40px;
`;

const PlayTitleText = styled.h2`
  font-size: 28px;
  font-weight: 600;
`;

const PlayBodyContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: start;

  gap: 8px;
  padding-top: 40px;
`;

const QuestionText = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 8px;
  padding-top: 40px;
`;

export default OXQuizPage;
