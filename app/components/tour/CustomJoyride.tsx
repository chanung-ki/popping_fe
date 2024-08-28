import React from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface FloaterStyles {
  floater?: React.CSSProperties;
  arrow?: React.CSSProperties;
  [key: string]: React.CSSProperties | undefined;
}

interface FloaterProps {
  disableAnimation?: boolean;
  styles?: FloaterStyles;
  [key: string]: any; // 추가적인 속성을 허용하도록 설정
}

interface CustomJoyrideProps {
  steps: Step[];
  runStatus: boolean;
  callback: (data: CallBackProps) => void;
  continuous?: boolean;
  showSkipButton?: boolean;
  showProgress?: boolean;
  locale?: {
    back?: string;
    close?: string;
    last?: string;
    next?: string;
    skip?: string;
  };
}

const CustomJoyride: React.FC<CustomJoyrideProps> = ({
  steps,
  runStatus,
  callback,
  continuous = true,
  showSkipButton = true,
  showProgress = true,
  locale = {
    back: 'Back',
    close: 'Close',
    last: 'Last',
    next: 'Next',
    skip: 'Skip',
  },
}) => {
  const defaultFloaterProps: FloaterProps = {
    disableAnimation: true,
    styles: {
      floater: {
        transform: 'none !important', // 모든 투어에 고정 위치 적용
        position: 'fixed',
      },
      arrow: {
        display: 'none', // 모든 투어에 화살표 제거
      },
    },
  };

  const customSteps = steps.map(step => ({
    ...step,
    floaterProps: {
      ...defaultFloaterProps,
      ...step.floaterProps, // 개별 step에서 추가 설정이 있으면 덮어쓰기
    },
  }));

  return (
    <Joyride
      steps={customSteps}
      run={runStatus}
      callback={callback}
      continuous={continuous}
      showSkipButton={showSkipButton}
      showProgress={showProgress}
      locale={locale}
    />
  );
};

export default CustomJoyride;
