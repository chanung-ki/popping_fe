import { COLORS } from '@/public/styles/colors';
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
    back: '뒤로',
    close: '닫기',
    last: '마지막',
    next: '다음',
    skip: '건너뛰기',
  },
}) => {
  const defaultFloaterProps: FloaterProps = {
    disableAnimation: true,
    styles: {
      floater: {
        position: 'fixed',

      },
      arrow: {
        display: 'none',
      },
    },
  };

  const customSteps = steps.map(step => ({
    ...step,
    disableBeacon: true,
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
      styles={{
        options: {
          backgroundColor: COLORS.primaryColor,
          overlayColor: 'rgba(22, 22, 22, 0.7)',
          primaryColor: '#000', // 버튼의 기본 색상
          textColor: COLORS.secondaryColor,
        },
        tooltip: {
          padding: '12px',
          borderRadius: '8px',
        },
        tooltipContent: {
          padding: 0,
        },
        buttonNext: {
          backgroundColor: 'none',
          color: COLORS.mainColor,
          fontSize: 13,
          fontWeight: 500,
          borderRadius: '5px',
          padding: '5px 10px',
          outline: 'none',
          boxShadow: 'none',
        },
        buttonBack: {
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.secondaryColor,
          marginRight: 10,
          outline: 'none',
          boxShadow: 'none',
        },
        buttonSkip: {
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.GradeRedPop,
          outline: 'none',
          boxShadow: 'none',
        },
      }}
    />
  );
};

export default CustomJoyride;
