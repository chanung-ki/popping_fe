import React from "react";
import styled from "styled-components";

interface SVGTypes {
  color: string;
  width: number | undefined;
  height: number | undefined;
}

const SVG = styled.svg`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;

export const IconChevronLeft = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "auto"}
      height={height ?? "auto"}
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

export const IconHeart = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? "auto"}
    height={height ?? "auto"}
    viewBox="0 0 24 24"
    fill={color ?? "none"}
    >
      <path/>
      </SVG>
  )
};

export const IconBookmark = ({ color, width, height }: SVGTypes) => {};
