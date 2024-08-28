"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { DefaultLayout } from "@/app/components/layout";
import Back from "@/app/components/back";
import VideoPlayerModal from "@/app/components/VideoPlayer";
import { IconHomes, IconInstagram } from "@/app/components/icons";
import { IconHome } from "@/app/navigation/icons";


const urlsData = [
  { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', label: '유튜브' },
  { value: '/videos/sample.mp4', label: '테스트 동영상' },
  { value: 'https://your-bucket-name.s3.amazonaws.com/your-video.mp4', label: '버킷 동영상' },
]

const StorePage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const router = useRouter();
  const { storeId } = params;

  const [position, setPosition] = useState({ x: window.innerWidth * 0.5, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [progressTitle, setProgressTitle] = useState<string>();

  //  BASE REF
  const characterRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  //  SECTION
  const shopRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);

  const [isInStoreName, setIsInStoreName] = useState<boolean>(false);
  const [isInVideoSection, setIsInVideoSection] = useState<boolean>(false);
  const [isInPlaySection, setIsInPlaySection] = useState<boolean>(false);


  const SectionData = [
    { location: { top: 15, left: 10 }, name: '영상', type: 'video' },
    { location: { top: 85, left: 10 }, name: '상점', type: 'shop' },
    { location: { top: 15, left: 90 }, name: '즐길거리', type: 'play' },
    { location: { top: 85, left: 90 }, name: 'test3', type: 'video' },
  ];

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isModalOpen && containerRef.current) {
      const { clientX, clientY } = event;
      const { left, top } = containerRef.current.getBoundingClientRect();
      setPosition({ x: clientX - left, y: clientY - top });
    }
  };


  const checkCollision = useCallback(() => {
    const characterRect = characterRef.current?.getBoundingClientRect();
    const shopRect = shopRef.current?.getBoundingClientRect();
    const videoRect = videoRef.current?.getBoundingClientRect();
    const playRect = playRef.current?.getBoundingClientRect();


    if (characterRect && playRect) {
      const isInPlaySection =
        characterRect.left < playRect.right &&
        characterRect.right > playRect.left &&
        characterRect.top < playRect.bottom &&
        characterRect.bottom > playRect.top;
      setIsInPlaySection(isInPlaySection);
      if (isInPlaySection) setProgressTitle(SectionData[2].name);
    }


    if (characterRect && videoRect) {
      const isInVideoSection =
        characterRect.left < videoRect.right &&
        characterRect.right > videoRect.left &&
        characterRect.top < videoRect.bottom &&
        characterRect.bottom > videoRect.top;

      setIsInVideoSection(isInVideoSection);
      if (isInVideoSection) setProgressTitle(SectionData[0].name);
    }

    if (characterRect && shopRect) {
      const isInStoreName =
        characterRect.left < shopRect.right &&
        characterRect.right > shopRect.left &&
        characterRect.top < shopRect.bottom &&
        characterRect.bottom > shopRect.top;


      setIsInStoreName(isInStoreName);
      if (isInStoreName) setProgressTitle(SectionData[1].name);
    }
  }, []);


  useEffect(() => {
    if (containerRef.current && characterRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      const { height: charHeight } = characterRef.current.getBoundingClientRect();

      setPosition({
        x: (containerRef.current.offsetWidth - charHeight) / 2 + 25, // Center horizontally
        y: height * 0.5 // 20% from the bottom
      });
    }
  }, []);

  useEffect(() => {
    const handleAnimationFrame = () => {
      checkCollision();
      requestAnimationFrame(handleAnimationFrame);
    };
    requestAnimationFrame(handleAnimationFrame);
    return () => {
    };
  }, [position, checkCollision]);

  useEffect(() => {
    if (isInStoreName || isInVideoSection || isInPlaySection) {
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
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            if (isInStoreName) {
              router.push(`store-main`);
            } else if (isInVideoSection) {
              setIsModalOpen(true);
            }
            else if (isInPlaySection) {
              router.push(`/`)
            }
          }, 500);
        }
      }, 100);
      setTimerId(timer);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      setIsLoading(false);
    }
  }, [isInStoreName, isInVideoSection, isInPlaySection, router]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout top={0} left={0} right={0} bottom={0}>
      <Container ref={containerRef} onClick={handleClick}>
        <div style={{ position: 'absolute', left: 20, top: 16, zIndex: 2 }}>
          <Back url={'/online-popup'} color={COLORS.primaryColor} />
        </div>

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

        <StoreName>
          <span>{storeId}</span>
          <p>STORE</p>
        </StoreName>

        <Section
          ref={videoRef}
          top={SectionData[0].location.top}
          left={SectionData[0].location.left}>
          <span>{SectionData[0].name}</span>
        </Section>

        <Section
          ref={shopRef}
          top={SectionData[1].location.top}
          left={SectionData[1].location.left}>
          <span>{SectionData[1].name}</span>
        </Section>

        <Section
          ref={playRef}
          top={SectionData[2].location.top}
          left={SectionData[2].location.left}>
          <span>{SectionData[2].name}</span>
        </Section>

        <Section
          ref={playRef}
          top={SectionData[3].location.top}
          left={SectionData[3].location.left}>
          <span>{SectionData[3].name}</span>
        </Section>

        <SNSSection>
          <SNSIcon>
            <IconInstagram color={COLORS.secondaryColor} width={undefined} height={30} />
          </SNSIcon>

          <SNSIcon>
            <IconHomes color={COLORS.secondaryColor} width={undefined} height={30} />
          </SNSIcon>
        </SNSSection>

        {/* <Section
          key={`section-${index}`}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          top={item.location.top}
          left={item.location.left}
        >
          <span>{item.name}</span>
        </Section>
 */}
        <VideoPlayerModal
          urls={urlsData}
          onClose={handleCloseModal}
          isVisible={isModalOpen}
        />

        {isLoading && (
          <LoadingOverlay>
            <ProgressBarContainer>
              <ProgressBar progress={progress} />
              <ProgressText>{Math.round(progress)}%</ProgressText>
            </ProgressBarContainer>
            <OverlayText>{progressTitle}</OverlayText>
          </LoadingOverlay>
        )}
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  /* background-image: url('https://www.shutterstock.com/shutterstock/photos/2483951389/display_1500/stock-photo-high-resolution-green-soccer-field-grass-texture-background-2483951389.jpg'); */
  background-color: ${COLORS.GradeYellowPop};
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
  padding: 5% 10%;
  border-radius: 100px;
  z-index: 1;  // StoreName 컴포넌트를 다른 요소보다 위에 표시
  
  & > span {
    font-size: 3em;
    font-weight: 700;
  }

  & > p {
    font-size: 2.5em;
    font-weight: 600;
  }
`;

const Section = styled.div<{ top: number, left: number }>`
  position: absolute;
  width: 25%;
  height: 5%;
  top: ${(props) => (props.top)}%;
  left: ${(props) => (props.left)}%;
  transform: translate(-${(props) => (props.left)}%, -${(props) => (props.top)}%);
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${COLORS.primaryColor};
  border-radius: 8px;
  padding: 10px;
  z-index: 1;  // StoreName 컴포넌트를 다른 요소보다 위에 표시
  
  & > span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SNSSection = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;  // StoreName 컴포넌트를 다른 요소보다 위에 표시
`

const SNSIcon = styled.div`
  
`


const CharacterImage = styled.img`
  position: absolute;
  width: 50px;  // 필요에 따라 조정
  height: 50px; // 필요에 따라 조정
  z-index: 2;  // 캐릭터 이미지를 StoreName보다 위에 표시
  transition: left .8s, top 1s; // 부드러운 이동을 위한 전환 효과
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
  background-color: rgba(255, 255, 255, 0.2);
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

