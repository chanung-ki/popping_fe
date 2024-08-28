import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";

type PlayModalProps = {
  isSuccess: boolean;
  url: string;
}

const TimePlayModal: React.FC<PlayModalProps> = ({ isSuccess, url }) => {

  const router = useRouter();
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    if (seconds === 0) {
      router.push(url);
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, url]);

  
  return (
    <Background>
      <ModalContainer>
        {isSuccess ? (
          <Card>
            <TitleText>성공!</TitleText>
            <DescriptionText>축하드립니다! 상품을 드리겠습니다.</DescriptionText>
            <CountdownText>페이지가 {seconds}초 후에 이동합니다.</CountdownText>
          </Card>
        ) : (
          <Card>
            <TitleText>실패!</TitleText>
            <DescriptionText>아쉽게 실패하셨습니다.</DescriptionText>
            <CountdownText>페이지가 {seconds}초 후에 이동합니다.</CountdownText>
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
  width: 350px;
  height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const CountdownText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.secondaryColor}; 
`;

export default TimePlayModal;