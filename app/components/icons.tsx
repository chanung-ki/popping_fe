import React from "react";
import styled from "styled-components";

type SVGTypes = {
  color: string;
  width: number | undefined;
  height: number | undefined;
};

const SVG = styled.svg`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;

export const IconChevronLeft = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill="none"
    >
      <path
        d="M8.6528 13.946C9.11592 14.4163 9.11592 15.1777 8.6528 15.648C8.18968 16.1176 7.43928 16.1183 6.97547 15.648L0.347827 8.85132C-0.115291 8.38105 -0.115291 7.61895 0.347827 7.14868L6.97547 0.352703C7.43928 -0.117568 8.18899 -0.117568 8.6528 0.352703C9.11592 0.822974 9.11592 1.58438 8.6528 2.05465L3.21757 8.00017L8.6528 13.946Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconChevronRight = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 5 11"
      fill="none"
    >
      <path
        d="M0.192973 1.83861C-0.0643245 1.54529 -0.0643245 1.07038 0.192974 0.777057C0.450271 0.484171 0.867178 0.483737 1.12486 0.777057L4.80703 5.01631C5.06432 5.30963 5.06432 5.78498 4.80703 6.0783L1.12486 10.3171C0.867177 10.6104 0.450655 10.6104 0.192973 10.3171C-0.0643253 10.0238 -0.0643252 9.54889 0.192973 9.25557L3.21266 5.5472L0.192973 1.83861Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconHeart = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 15"
      fill="none"
    >
      <path
        d="M0.00761684 4.97261C0.00761684 4.84509 0.00761684 4.71757 0.00761684 4.59004C0.00761684 4.55254 0.0228505 4.51503 0.0304674 4.47752C0.0533179 4.29749 0.0609347 4.10996 0.0914021 3.92993C0.45701 1.77705 2.22412 0.149261 4.3873 0.0142371C5.66693 -0.0682775 6.80946 0.299287 7.83011 1.08693C7.89105 1.13944 7.95198 1.18444 8.01292 1.23695C8.02815 1.22195 8.03577 1.22195 8.04338 1.21445C8.85077 0.524327 9.78002 0.119256 10.8311 0.0217384C11.8213 -0.0682775 12.7582 0.119256 13.6265 0.621844C15.4546 1.67203 16.3381 3.7724 15.8811 5.91778C15.6983 6.78043 15.3251 7.55306 14.8528 8.28069C14.2435 9.21086 13.5047 10.036 12.7277 10.8236C11.3796 12.1964 9.94759 13.4716 8.53086 14.7693C8.19572 15.0769 7.80726 15.0769 7.47212 14.7693C6.97703 14.3118 6.48193 13.8542 5.98684 13.3966C4.84431 12.3464 3.70178 11.2962 2.65066 10.1485C1.99561 9.4359 1.38626 8.69327 0.898787 7.85312C0.472244 7.11799 0.16757 6.33785 0.0533179 5.4902C0.0304674 5.31767 0.0152337 5.14514 0 4.97261H0.00761684Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconBookmark = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6364 2.6665C11.6364 1.95925 11.3578 1.28102 10.8618 0.780629C10.3656 0.280917 9.69296 0 8.99157 0H2.64446C1.94306 0 1.27044 0.280917 0.774178 0.780629C0.278596 1.28102 0 1.95959 0 2.6665V15.4665C0 15.6819 0.128973 15.8768 0.326326 15.9594C0.524017 16.042 0.751498 15.9962 0.902813 15.8437L5.81801 10.8875L10.7332 15.8437C10.8845 15.9962 11.112 16.042 11.3097 15.9594C11.5071 15.8768 11.636 15.6819 11.636 15.4665V2.6665H11.6364Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconRoundTriangle = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
    >
      <path
        d="M4.13397 0.5C4.51887 -0.166667 5.48113 -0.166666 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8H1.5359C0.766098 8 0.284973 7.16667 0.669873 6.5L4.13397 0.5Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconX = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M17 1L1 17L17 1Z" fill={color} />
      <path
        d="M17 1L1 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M1 1L17 17L1 1Z" fill={color} />
      <path
        d="M1 1L17 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SVG>
  );
};

export const IconGear = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.4846 11.0553C17.4846 10.7538 17.5866 10.4523 17.5866 10.0503C17.5866 9.64824 17.5866 9.34673 17.4846 9.04523L19.6269 7.33668C19.831 7.13568 19.831 6.93467 19.729 6.73367L17.6887 3.21608C17.5866 3.11558 17.3826 3.01508 17.0766 3.11558L14.5262 4.1206C14.0161 3.71859 13.404 3.41709 12.7919 3.11558L12.3839 0.502513C12.4859 0.201005 12.1798 0 11.9758 0H7.89519C7.69116 0 7.38512 0.201005 7.38512 0.40201L6.97706 3.11558C6.36497 3.31658 5.85489 3.71859 5.2428 4.1206L2.79443 3.11558C2.48839 3.01508 2.28436 3.11558 2.08033 3.31658L0.0400211 6.83417C-0.0619942 6.93467 0.0400211 7.23618 0.244052 7.43719L2.38637 9.04523C2.38637 9.34673 2.28436 9.64824 2.28436 10.0503C2.28436 10.4523 2.28436 10.7538 2.38637 11.0553L0.244052 12.7638C0.0400211 12.9648 0.0400211 13.1658 0.142036 13.3668L2.18234 16.8844C2.28436 16.9849 2.48839 17.0854 2.79443 16.9849L5.34481 15.9799C5.85489 16.3819 6.46698 16.6834 7.07907 16.9849L7.48713 19.598C7.48713 19.799 7.69116 20 7.99721 20H12.0778C12.2818 20 12.5879 19.799 12.5879 19.598L12.996 16.9849C13.608 16.6834 14.2201 16.3819 14.7302 15.9799L17.2806 16.9849C17.4846 17.0854 17.7907 16.9849 17.8927 16.7839L19.933 13.2663C20.035 13.0653 20.035 12.7638 19.831 12.6633L17.4846 11.0553ZM9.9355 13.5678C7.99721 13.5678 6.36497 11.9598 6.36497 10.0503C6.36497 8.1407 7.99721 6.53266 9.9355 6.53266C11.8738 6.53266 13.506 8.1407 13.506 10.0503C13.506 11.9598 11.8738 13.5678 9.9355 13.5678Z"
        fill={color}
      />
    </SVG>
  );
};
