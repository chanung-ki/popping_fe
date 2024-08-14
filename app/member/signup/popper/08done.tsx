import { ButtonSingle } from "@/app/components/buttons";
import { Spacer } from "@/app/components/layout";
import { COLORS } from "@/public/styles/colors";
import Image from "next/image";
import { styled } from "styled-components";

import LogoDone from "@/public/images/logo_done.png";

type StepType = {
  onNext: CallableFunction;
};

const StepDone = ({ onNext }: StepType) => {
  return (
    <Container>
      <MiddleContainer>
        <Image src={LogoDone} alt={"완료 로고"} width={100} height={100} />
        <p>
          팝퍼 신청이 완료되었습니다.
          <br />
          신청 결과를 메일로 보내드리겠습니다.
        </p>
      </MiddleContainer>

      <Spacer />

      <ButtonSingle
        text="로그인"
        backgroundColor={COLORS.mainColor}
        textColor={COLORS.primaryColor}
        onClick={() => {
          onNext();
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const MiddleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  img {
    width: 100px;
    height: 100px;
  }

  p {
    color: ${COLORS.secondaryColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export default StepDone;
