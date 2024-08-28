"use client";
import styled, { keyframes } from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axiosInstance from "@/public/network/axios";
import { DefaultLayout } from "@/app/components/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandType } from "@/public/utils/types";
import Back from "@/app/components/back";
import { CallBackProps, STATUS, Step } from 'react-joyride';
import { Loading } from "@/app/components/loading";
import CustomJoyride from "@/app/components/tour/CustomJoyride";
import { TourContainer } from "@/app/components/tour/TourStyle";
import { IconFollow } from "@/app/components/icons";
import { Follow, FormatFollowers } from "@/public/utils/function";
import Image from "next/image";

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

interface StampState {
  step1: StampStep;
  step2: StampStep;
  step3: StampStep;
  step4: StampStep;
  step5: StampStep;
}

interface StampStep {
  status: boolean;
  url: string;
  name: string;
}


const OnlinePopUpOpenningPage: React.FC<{ params: { storeId: string } }> = ({
  params,
}) => {
  const { storeId } = params;
  const joyride2StatusKey = `joyride2_status_${storeId}_openning`;
  const joyrideStatusKey = `joyride_status_${storeId}_openning`;
  const router = useRouter();
  const brandRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLAnchorElement>(null);

  const [openingData, setOpeningData] = useState<BrandType>();


  const [joyrideRun, setJoyrideRun] = useState<boolean>(false);
  const [joyrideRun2, setJoyrideRun2] = useState<boolean>(false);


  const [steps, setSteps] = useState<Step[]>([]);
  const [steps2, setSteps2] = useState<Step[]>([]);


  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimatingComp, setIsAnimatingComp] = useState<boolean>(false);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const [stampState, setStampState] = useState<StampState>({
    step1: { status: false, url: '', name: '팝업스토어 입장' },
    step2: { status: false, url: '', name: '소개' },
    step3: { status: false, url: 'play/timing-challenge', name: '타이밍을 잡아라!' },
    step4: { status: false, url: 'play/ox-quiz', name: 'OX 퀴즈' },
    step5: { status: false, url: '', name: '인스타그램 방문' },
  });
  const [stampModalName, setStampModalName] = useState<string>();

  const [showModal, setShowModal] = useState(false);


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
    BrandDataGetAPI();
    const storedStatus = localStorage.getItem(joyrideStatusKey);
    if (storedStatus === "finished" || storedStatus === "skipped") {
      setJoyrideRun(false);
    } else {
      setJoyrideRun(true);
    }
  }, [router]);

  useEffect(() => {
    if (!joyrideRun) {
      // Chained timeout operations
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimatingComp(true);
        }, 1000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [joyrideRun]);

  useEffect(() => {
    if (isAnimatingComp) {
      const storedStatus = localStorage.getItem(joyride2StatusKey);
      if (storedStatus === "finished" || storedStatus === "skipped") {
        setJoyrideRun2(false);
        if (!localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step1`)) {
          showStampModal(stampState.step1.name);
          setStampState((prevState) => ({
            ...prevState,
            step1: {
              ...prevState.step1,
              status: true,
            },
          }));
          const value = JSON.stringify({ status: true, view: true });
          localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step1`, value);
        } else {
          setStampState((prevState) => ({
            ...prevState,
            step1: {
              ...prevState.step1,
              status: true,
            },
          }));
        }
        const LocalStep2 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step2`)
        const LocalStep3 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step3`)
        const LocalStep4 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step4`)
        const LocalStep5 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step5`)

        let parsedValue = LocalStep2 ? JSON.parse(LocalStep2) : {};
        if (parsedValue.status) {
          if (!parsedValue.view) {
            showStampModal(stampState.step2.name);
          }
          setStampState((prevState) => ({
            ...prevState,
            step2: {
              ...prevState.step2,
              status: true,
            },
          }));
          const value = JSON.stringify({ status: true, view: true });
          localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step2`, value);
        }

        parsedValue = LocalStep3 ? JSON.parse(LocalStep3) : {};
        if (parsedValue.status) {
          if (!parsedValue.view) {
            showStampModal(stampState.step3.name);
          }
          setStampState((prevState) => ({
            ...prevState,
            step3: {
              ...prevState.step3,
              status: true,
            },
          }));
          const value = JSON.stringify({ status: true, view: true });
          localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step3`, value);
        }

        parsedValue = LocalStep4 ? JSON.parse(LocalStep4) : {};
        if (parsedValue.status) {
          if (!parsedValue.view) {
            showStampModal(stampState.step4.name);
          }
          setStampState((prevState) => ({
            ...prevState,
            step4: {
              ...prevState.step4,
              status: true,
            },
          }));
          const value = JSON.stringify({ status: true, view: true });
          localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step4`, value);
        }

        parsedValue = LocalStep5 ? JSON.parse(LocalStep5) : {};
        if (parsedValue.status) {
          if (!parsedValue.view) {
            showStampModal(stampState.step5.name);
          }
          setStampState((prevState) => ({
            ...prevState,
            step5: {
              ...prevState.step5,
              status: true,
            },
          }));
          const value = JSON.stringify({ status: true, view: true });
          localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step5`, value);
        }
      } else {
        setJoyrideRun2(true);
      }
    }
  }, [isAnimatingComp])

  useEffect(() => {
    if (!joyrideRun2 && isAnimatingComp) {
      // Chained timeout operations
      if (!localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step1`)) {
        showStampModal(stampState.step1.name);
        setStampState((prevState) => ({
          ...prevState,
          step1: {
            ...prevState.step1,
            status: true,
          },
        }));
        const value = JSON.stringify({ status: true, view: true });
        localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step1`, value);
      } else {
        setStampState((prevState) => ({
          ...prevState,
          step1: {
            ...prevState.step1,
            status: true,
          },
        }));
      }
      const LocalStep2 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step2`)
      const LocalStep3 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step3`)
      const LocalStep4 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step4`)
      const LocalStep5 = localStorage.getItem(`${storeId.toUpperCase()}_Stamp_step5`)

      let parsedValue = LocalStep2 ? JSON.parse(LocalStep2) : {};
      if (parsedValue.status) {
        if (!parsedValue.view) {
          showStampModal(stampState.step2.name);
        }
        setStampState((prevState) => ({
          ...prevState,
          step2: {
            ...prevState.step2,
            status: true,
          },
        }));
        const value = JSON.stringify({ status: true, view: true });
        localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step2`, value);
      }

      parsedValue = LocalStep3 ? JSON.parse(LocalStep3) : {};
      if (parsedValue.status) {
        if (!parsedValue.view) {
          showStampModal(stampState.step3.name);
        }
        setStampState((prevState) => ({
          ...prevState,
          step3: {
            ...prevState.step3,
            status: true,
          },
        }));
        const value = JSON.stringify({ status: true, view: true });
        localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step3`, value);
      }

      parsedValue = LocalStep4 ? JSON.parse(LocalStep4) : {};
      if (parsedValue.status) {
        if (!parsedValue.view) {
          showStampModal(stampState.step4.name);
        }
        setStampState((prevState) => ({
          ...prevState,
          step4: {
            ...prevState.step4,
            status: true,
          },
        }));
        const value = JSON.stringify({ status: true, view: true });
        localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step4`, value);
      }

      parsedValue = LocalStep5 ? JSON.parse(LocalStep5) : {};
      if (parsedValue.status) {
        if (!parsedValue.view) {
          showStampModal(stampState.step5.name);
        }
        setStampState((prevState) => ({
          ...prevState,
          step5: {
            ...prevState.step5,
            status: true,
          },
        }));
        const value = JSON.stringify({ status: true, view: true });
        localStorage.setItem(`${storeId.toUpperCase()}_Stamp_step5`, value);
      }
    }
  }, [joyrideRun2]);

  const storeFollowHandler = () => {
    if (openingData) {
      const updatedSaved = isFollowed
        ? openingData.saved - 1
        : openingData.saved + 1;
      Follow("Brands", openingData.id, router);
      setOpeningData({
        ...openingData,
        saved: updatedSaved,
      });
      setIsFollowed(!isFollowed);
    }
  };

  useEffect(() => {
    if (brandRef.current) {
      setSteps([
        {
          target: 'body',
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: '온라인 팝업스토어',
          placement: 'center',
        },
        {
          target: brandRef.current,
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: `${storeId.toUpperCase()} STORE`,
          placement: 'top',
        },
        {
          target: 'body',
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: `${storeId.toUpperCase()} STORE`,
          placement: 'center',
        },
      ]);
    }
  }, [brandRef.current]);

  useEffect(() => {
    if (stampRef.current && enterRef.current) {
      setSteps2([
        {
          target: 'body',
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: '온라인 팝업스토어',
          placement: 'center',
        },
        {
          target: stampRef.current,
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: `${storeId.toUpperCase()} STORE`,
          placement: 'top',
        },
        {
          target: enterRef.current,
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: `${storeId.toUpperCase()} STORE`,
          placement: 'top',
        },
        {
          target: 'body',
          content: (
            <TourContainer>
              <h3>안녕하세요!</h3>
              <p><strong>{storeId.toUpperCase()} STORE</strong> 입니다.</p>
            </TourContainer>
          ),
          title: `${storeId.toUpperCase()} STORE`,
          placement: 'center',
        },
      ]);
    }
  }, [stampRef.current, enterRef.current]);



  const showStampModal = (name: string) => {
    setShowModal(true);
    setStampModalName(name);
    setTimeout(() => {
      const stampElement = document.getElementById('stamp-image');
      if (stampElement) {
        stampElement.classList.add('stamp-animation');
      }
    }, 100); // Delay to ensure the modal is visible
  };


  const BrandDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/popup/brand/store/main/${storeId}`
      );
      if (response.status === 200) {
        setOpeningData(response.data.brand);
        setIsFollowed(response.data.brand.isSaved);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        alert("없음");
      }
    }
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setJoyrideRun(false);
      localStorage.setItem(joyrideStatusKey, status);
    }
  };

  const handleJoyride2Callback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setJoyrideRun2(false);
      localStorage.setItem(joyride2StatusKey, status);
    }
  };

  if (!openingData) return <Loading />;
  return (
    <DefaultLayout top={0} left={0} right={0} bottom={0} >

      {isAnimatingComp ?
        <>
          <Container className={isAnimatingComp ? "fade-in" : ""} >
            <CustomJoyride steps={steps2} runStatus={joyrideRun2} callback={handleJoyride2Callback} />
            <div style={{ position: "absolute", top: 16, left: 20 }}>
              <Back url={"/online-popup"} color={undefined} />
            </div>
            <StoreThumbnailContainer
              src={openingData.thumbnail}
              height={parentWidth}
            />
            <StoreMainPageContainer>
              <StoreInfoContainer>
                <StoreInfoHeader>
                  <StoreName>{storeId.toUpperCase()} STORE</StoreName>
                  <StoreDesc>{openingData.description}</StoreDesc>
                </StoreInfoHeader>

                <StoreSave onClick={() => storeFollowHandler()}>
                  {isFollowed ? (
                    <IconFollow
                      color={COLORS.mainColor}
                      width={undefined}
                      height={30}
                    />
                  ) : (
                    <IconFollow
                      color={COLORS.greyColor}
                      width={undefined}
                      height={30}
                    />
                  )}
                  <span>{FormatFollowers(openingData.saved)}</span>
                </StoreSave>
              </StoreInfoContainer>


              <StoreStampContainer ref={stampRef}>
                <Title>입장 스탬프</Title>
                <Stemps>
                  {Object.entries(stampState).map(([key, value], index) => (
                    <Stamp key={key} status={value.status}>
                      {!value.status && index === 1 && (
                        <EnterButton href={value.url} ref={enterRef}>
                          참가하기
                        </EnterButton>)}
                      {!value.status && index !== 1 && (<EnterButton href={value.url} >
                        참가하기
                      </EnterButton>)}
                      <Image
                        src={`/images/참여완료_POPPING.svg`}
                        alt="test"
                        width={84}
                        height={84}
                      />
                      <StampTitle>{value.name}</StampTitle>
                    </Stamp>
                  ))}
                </Stemps>
              </StoreStampContainer>

              <StoreStampContainer>
                <Title>유의사항 안내</Title>
                <Caption>
                  Lorem ipsum dolor sit amet consectetur. Leo enim ut eros
                  euismod id nisl enim. Et mauris scelerisque phasellus egestas
                  nibh velit. Orci vestibulum nisl est risus at tellus ipsum est.
                </Caption>
              </StoreStampContainer>
              {Object.values(stampState).every(step => step.status === true) ? (
                // 모든 step들의 status가 true일 때 표시할 내용
                <div>All steps are completed!</div>
              ) : (
                <DisabledBottomButton>입장하기</DisabledBottomButton>
              )}

            </StoreMainPageContainer>
          </Container>
        </>
        :
        <ContentContainer className={isAnimating ? "fade-out" : ""} ref={containerRef}>
          <OpeningImage src={openingData.thumbnail} />
          <div style={{ position: 'absolute', left: 20, top: 16, zIndex: 2 }}>
            <Back url={'/online-popup'} />
          </div>
          <Overlay />
          <CustomJoyride steps={steps} runStatus={joyrideRun} callback={handleJoyrideCallback} />
          <OpeningPageContainer>
            <OpeningPageContentsContainer>
              <BrandInfo ref={brandRef}>
                <BrandIcon src={openingData.logo} alt="Brand Icon" />
                <BrandName>{storeId.toUpperCase()}</BrandName>
                <BrandDesc>{openingData.description}</BrandDesc>
              </BrandInfo>
            </OpeningPageContentsContainer>
          </OpeningPageContainer>
        </ContentContainer>
      }

      {showModal && (
        <StampModal>
          <StampImage
            id="stamp-image"
            src="/images/참여완료_POPPING.svg"
            alt="참여완료 스탬프"
            width={150}  // Adjust size as needed
            height={150} // Adjust size as needed
          />
          <StampDescription>{stampModalName} 스탬프 획득!</StampDescription>
          <ConfirmButton onClick={() => setShowModal(false)}>확인</ConfirmButton>
        </StampModal>
      )}

    </DefaultLayout>
  );
}

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  transition: opacity 1s ease-in-out;
  &.fade-out {
    animation: ${fadeOut} 1s forwards;
  }
`;

const OpeningImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(25, 25, 25, 0.8) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
`;

const OpeningPageContainer = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
`;

const OpeningPageContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 40px;
`;

const BrandInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  color: ${COLORS.greyColor};
`;

const BrandIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const BrandName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${COLORS.primaryColor};
`;

const BrandDesc = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 550;
  line-height: 160%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  background-color: ${COLORS.primaryColor};
  &.fade-in {
    animation: ${fadeIn} 1s forwards;
  }
`;

const StoreThumbnailContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StoreMainPageContainer = styled.div`
  height: 100%;
  width: calc(100% - 40px);

  padding: 0 20px;
  padding-bottom: 80px;
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  gap: 8px;
  padding-top: 20px;
`;

const StoreInfoHeader = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const StoreName = styled.h2`
  font-size: 32px;
  font-weight: 600;
`;

const StoreSave = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;
  font-size: 12px;
  font-weight: 500;

  & > span {
    font-weight: 600;
  }
`;

const StoreDesc = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

const Title = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const StoreStampContainer = styled.div`
  gap: 12px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Stemps = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  flex-grow: 1;
  flex-wrap: wrap;

  gap: 40px 0;

  align-items: center;
  justify-content: center;
  background-color: ${COLORS.lightGreyColor};
  padding: 20px 0;

  border-radius: 16px;

`

const Stamp = styled.div<{ status: boolean }>`
  width: 30%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 8px;

  position: relative;
  ${(props) => (!props.status &&
    `
      & > img {
        opacity: .5;
      }
    `
  )}
`
const EnterButton = styled(Link)`
  cursor: pointer;
  position: absolute; /* 변경: absolute 위치 조정 */
  top: -34px; /* 조정: 이미지 위에 8px 위에 위치하도록 함 */
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;

  color: ${COLORS.primaryColor};
  background-color: ${COLORS.mainColor};
  padding: 4px 12px;

  font-size: 12px;
  font-style: normal;
  font-weight: 600;

  z-index: 2;
  word-break: keep-all;

  &:after {
    content: "";
    position: absolute;
    border-top: 6px solid ${COLORS.mainColor};
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 0px solid transparent;
    bottom: -6px; /* 조정: 꼬리 부분이 본체에 붙도록 함 */
    left: 50%; /* 조정: 꼬리 부분이 중앙에 위치하도록 함 */
    transform: translateX(-50%); /* 조정: 꼬리 부분이 정확히 중앙에 위치하도록 함 */
  }
`;


const StampTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`

const Caption = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const DisabledBottomButton = styled.div`
  width: calc(100% - 40px);

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;

  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 100%); /* 시작 위치를 아래로 설정 */
  z-index: 4;

  background-color: ${COLORS.greyColor};
  padding: 16px 0;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.primaryColor};

  /* 애니메이션 추가 */
  animation: slide-up 0.5s ease-out forwards;
  @keyframes slide-up {
    from {
      transform: translate(-50%, 100%); /* 아래에서 시작 */
    }
    to {
      transform: translate(-50%, 0); /* 원래 위치로 이동 */
    }
  }
`;






const stampAnimation = keyframes`
  0% {
    transform: scale(2);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StampModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;

  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

// Styled component for the stamp image
const StampImage = styled(Image)`
  animation: ${stampAnimation} 0.5s ease-in-out;
`;

const StampDescription = styled.span`
  font-size: 14px;
  font-weight: 600;

  color: ${COLORS.primaryColor};

`

const ConfirmButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${COLORS.mainColor};
  color:  ${COLORS.primaryColor};
  border: none;
  border-radius: 8px;
`;

export default OnlinePopUpOpenningPage;
