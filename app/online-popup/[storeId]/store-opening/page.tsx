"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/public/network/axios";
import { DefaultLayout } from "@/app/components/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandType } from "@/public/utils/types";
import Back from "@/app/components/back";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import Tour from "@/app/components/tour/PoppingTour";
import { Loading } from "@/app/components/loading";
import Tooltip from "@/app/components/tour/PoppingTour";
import CustomJoyride from "@/app/components/tour/CustomJoyride";

const OnlinePopUpOpenningPage: React.FC<{ params: { storeId: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  const [openingData, setOpeningData] = useState<BrandType>();
  const [joyrideRun, setJoyrideRun] = useState<boolean>(true);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRefReady, setIsRefReady] = useState(false); // ref 준비 상태 관리

  const { storeId } = params;

  const joyrideStatusKey = `joyride_status_${storeId}`;

  useEffect(() => {
    BrandDataGetAPI();
    const storedStatus = sessionStorage.getItem(joyrideStatusKey);
    if (storedStatus === "finished" || storedStatus === "skipped") {
      setJoyrideRun(false);
    } else {
      setJoyrideRun(true);
    }
  }, [router]);


  useEffect(() => {
    if (buttonRef.current && brandRef.current) {
      setSteps([
        {
          target: 'body',
          content: '이 버튼을 클릭하여 탐험 페이지로 이동할 수 있습니다!',
          disableBeacon: true,
          placement: 'center',
          title: 'Image Two',
        },
        {
          target: buttonRef.current,
          content: '이 버튼을 클릭하여 탐험 페이지로 이동할 수 있습니다!',
          disableBeacon: true,
        },
        {
          target: brandRef.current,
          content: '이 버튼을 클릭하여 탐험 페이지로 이동할 수 있습니다!',
          disableBeacon: true,
        },
      ]);
      setIsRefReady(true); // ref가 설정되면 준비 상태를 true로 변경
    }
  }, [buttonRef.current, brandRef.current]); // refs가 변경될 때만 실행

  const BrandDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/popup/brand/opening/${storeId}`
      );
      if (response.status === 200) {
        setOpeningData(response.data);
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
      // sessionStorage.setItem(joyrideStatusKey, status);
    }
  };

  if (!openingData) return <Loading />; // 데이터 또는 ref가 준비되지 않았으면 null 반환

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}>
      <>
        <OpeningImage src={openingData.thumbnail} />
        <div style={{ position: 'absolute', left: 20, top: 16, zIndex: 2 }}>
          <Back url={'/online-popup'} />
        </div>
        <CustomJoyride steps={steps} runStatus={joyrideRun} callback={handleJoyrideCallback} />
        <Overlay />
      </>

      <OpeningPageContainer>
        <OpeningPageContentsContainer>
          <BrandInfo ref={brandRef}>
            <BrandIcon src={openingData.logo} alt="Brand Icon" />
            <BrandName>{storeId.toUpperCase()}</BrandName>
            <BrandDesc>{openingData.description}</BrandDesc>
          </BrandInfo>
          <Button ref={buttonRef} id="test" href={`exploration`}>입장하기</Button>
        </OpeningPageContentsContainer>
      </OpeningPageContainer>
    </DefaultLayout>
  );
};



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

const Button = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 16px 0px;
  width: 100%;
  background-color: ${COLORS.mainColor};
  color: ${COLORS.primaryColor};
  font-size: 16px;
  font-weight: 500;
  z-index: 2;
`;

export default OnlinePopUpOpenningPage;
