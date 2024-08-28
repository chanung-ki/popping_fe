import React from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";

// Props 인터페이스 정의
interface TourProps {
  steps: Step[];
  runStatus: boolean;
  callback: (data: CallBackProps) => void;
}

const Tour: React.FC<TourProps> = ({ steps, runStatus, callback }) => {
  return (
    <Joyride
      steps={steps}
      run={runStatus}
      continuous={true}
      showSkipButton
      showProgress
      callback={callback}
      styles={{
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          backgroundColor: "green",
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
    />
  );
};

export default Tour;
