import React from "react";
import { TooltipRenderProps } from "react-joyride";
import styled, { keyframes } from "styled-components";

// Custom fade-in animation for the tooltip
const fadeInSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Tooltip container with custom animation
const CustomTooltipContainer = styled.div`
  animation: ${fadeInSlideUp} 0.4s ease-in-out;
  background-color: #2e3b4e;
  color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  text-align: left;
`;

// Styled components for the Tooltip structure
const TooltipTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 18px;
  color: #ffcc00;
`;

const TooltipContent = styled.p`
  margin: 0 0 15px;
  font-size: 14px;
  line-height: 1.5;
`;

const TooltipFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #ffcc00;
  color: #2e3b4e;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffd700;
  }

  &:first-child {
    margin-right: 10px;
  }
`;

// Custom Tooltip Component
const CustomTooltip: React.FC<TooltipRenderProps> = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => (
  <CustomTooltipContainer {...tooltipProps}>
    {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
    <TooltipContent>{step.content}</TooltipContent>
    <TooltipFooter>
      {index > 0 && (
        <Button {...backProps}>
          Back
        </Button>
      )}
      {continuous && (
        <Button {...primaryProps}>
          Next
        </Button>
      )}
      {!continuous && (
        <Button {...closeProps}>
          Close
        </Button>
      )}
    </TooltipFooter>
  </CustomTooltipContainer>
);

export default CustomTooltip;
