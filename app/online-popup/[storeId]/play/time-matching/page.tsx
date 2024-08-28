"use client";
import styled from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { COLORS } from "@/public/styles/colors";
import { DefaultLayout } from "@/app/components/layout";
import Back from "@/app/components/back";
import { useRouter } from "next/navigation";
import { ButtonLarge } from "@/app/components/buttons";
import TimePlayModal from "@/app/components/play/timePlayModal";

const TimeMatchingPage: React.FC<{ params: { storeId: string } }> = ({
  params,
}) => {

  const router = useRouter();
  const hasAlerted = useRef<boolean>(false);
  const { storeId } = params;
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const [time, setTime] = useState<number>(0); 
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const redirectPath = `/online-popup/${storeId}/store-opening`;

  const updateParentWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      if (width > 0) {
        setParentWidth((width / 4) * 3);
      }
    }
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      updateParentWidth();
      window.addEventListener("resize", updateParentWidth);
    }
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [containerRef.current]);

  useEffect(() => {
    if (localStorage.getItem("isPlayTimeGame") === "true" && !hasAlerted.current) {
      alert("이미 해당 게임에 참여하셨습니다.");
      hasAlerted.current = true;
      router.push(redirectPath)
    }
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => parseFloat((prevTime + 0.01).toFixed(2)));
      }, 10);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true); 
  };

  const handleStop = () => {
    setIsRunning(false); 
    localStorage.setItem("isPlayTimeGame", JSON.stringify(true));
    // 성공 조건을 설정
    if (time === 10) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsFinish(true);
  };

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}>
      {isFinish && (
        <TimePlayModal
          isSuccess={isSuccess}
          url={redirectPath}
        />
      )}
      <div style={{ position: "absolute", top: 16, left: 20 }}>
        <Back url={"store-opening"} color={undefined} />
      </div>
      <Container ref={containerRef}>
        <PlayContainer>
          <PlayHeaderContainer>
            <PlayTitleText>시간초 맞추기 게임 (임시 제목)</PlayTitleText>
          </PlayHeaderContainer>
          <PlayBodyContainer>
            <TimeText>{time.toFixed(2)}</TimeText>
          </PlayBodyContainer>
          <PlayButtonContainer>
            {isRunning ? (
              <ButtonLarge
                text="멈추기"
                buttonColor={COLORS.mainColor}
                textColor={COLORS.primaryColor}
                onClick={handleStop}
              />
            ) : (
              <ButtonLarge
                text="시작"
                buttonColor={COLORS.mainColor}
                textColor={COLORS.primaryColor}
                onClick={handleStart}
              />
            )}
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

  justify-content: center;

  gap: 8px;
  padding-top: 40px;
`;

const TimeText = styled.h2`
  font-size: 32px;
  font-weight: 600;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 8px;
  padding-top: 40px;
`;

export default TimeMatchingPage;
