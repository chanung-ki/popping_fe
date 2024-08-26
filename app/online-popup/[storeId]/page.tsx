"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";

const StorePage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const router = useRouter();
  const { storeId } = params;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInStoreName, setIsInStoreName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const characterRef = useRef<HTMLImageElement>(null);
  const storeNameRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
  };

  const checkCollision = useCallback(() => {
    const characterRect = characterRef.current?.getBoundingClientRect();
    const storeNameRect = storeNameRef.current?.getBoundingClientRect();

    if (characterRect && storeNameRect) {
      const isColliding =
        characterRect.left < storeNameRect.right &&
        characterRect.right > storeNameRect.left &&
        characterRect.top < storeNameRect.bottom &&
        characterRect.bottom > storeNameRect.top;

      setIsInStoreName(isColliding);
    }
  }, []);

  useEffect(() => {
    const handleAnimationFrame = () => {
      checkCollision();
      requestAnimationFrame(handleAnimationFrame);
    };

    requestAnimationFrame(handleAnimationFrame);

    return () => {
      // Cleanup code here if needed
    };
  }, [position, checkCollision]);

  useEffect(() => {
    if (isInStoreName) {
      setIsLoading(true);
      setProgress(0); // Reset progress to 0

      const startTime = Date.now();
      const duration = 2000; // 2 seconds duration

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min((elapsed / duration) * 100, 100); // Calculate progress percentage
        setProgress(progressPercent);

        if (elapsed >= duration) {
          clearInterval(timer);
          setProgress(100); // Ensure progress is set to 100%
          // Delay page transition until after progress bar is hidden
          setTimeout(() => {
            setIsLoading(false);
            router.push(`/`);
          }, 500); // Delay to allow for fade out effect
        }
      }, 100); // Update every 100ms

      setTimerId(timer);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      setIsLoading(false);
    }
  }, [isInStoreName, router]);

  return (
    <Container onClick={handleClick}>
      <CharacterImage
        ref={characterRef}
        src="/images/logo_done.png"
        alt="Character"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <StoreName ref={storeNameRef}>
        <span>{storeId}</span>
        <p>STORE</p>
      </StoreName>
      {isLoading && (
        <LoadingOverlay>
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
            <ProgressText>{Math.round(progress)}%</ProgressText>
          </ProgressBarContainer>
          <OverlayText>Moving to new page...</OverlayText>
        </LoadingOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${COLORS.mainColor};
  position: relative;
  overflow: hidden;
`;

const StoreName = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.primaryColor};
  padding: 15px 30px;
  border-radius: 100px;
  z-index: 1;  // StoreName 컴포넌트를 다른 요소보다 위에 표시
  
  & > span {
    font-size: 28px;
    font-weight: 700;
  }

  & > p {
    font-size: 25px;
    font-weight: 600;
  }
`;

const CharacterImage = styled.img`
  position: absolute;
  width: 50px;  // 필요에 따라 조정
  height: 50px; // 필요에 따라 조정
  z-index: 2;  // 캐릭터 이미지를 StoreName보다 위에 표시
  transition: left 0.2s, top 0.2s; // 부드러운 이동을 위한 전환 효과
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // 반투명한 검은색 배경
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3; // 가장 위에 표시
  pointer-events: none; // 클릭 방지
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.2); // 반투명한 배경
  border-radius: 25px;
  margin-bottom: 20px;
  position: relative;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 10px;
  width: ${({ progress }) => progress}%;
  background-color: ${COLORS.mainColor};
  border-radius: 25px;
  transition: width 0.1s ease-out;
`;

const ProgressText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OverlayText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export default StorePage;
