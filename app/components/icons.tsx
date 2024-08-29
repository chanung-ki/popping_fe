import { COLORS } from "@/public/styles/colors";
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

export const IconMarker = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_821_46)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.0037 0C6.27056 0 0 6.32055 0 14.1154C0 23.188 14.0037 40.3276 14.0037 40.3276C14.0037 40.3276 28.0075 23.188 28.0075 14.1154C28 6.32055 21.7369 0 14.0037 0ZM14.0037 19.1507C11.2435 19.1507 9.0008 16.8977 9.0008 14.1078C9.0008 11.318 11.236 9.06501 14.0037 9.06501C16.7715 9.06501 19.0067 11.318 19.0067 14.1078C19.0067 16.8977 16.7715 19.1507 14.0037 19.1507Z"
          fill="#FA8D0E"
        />
        <path
          d="M19.9574 10.7912C19.5334 12.1558 19.7684 13.6397 20.5933 14.8065C21.6146 16.2506 20.5966 18.2479 18.8281 18.2709C17.3992 18.2895 16.0605 18.9715 15.206 20.1167C14.148 21.5341 11.9339 21.1837 11.3659 19.5086C10.9071 18.1555 9.84463 17.093 8.49149 16.6341C6.81648 16.0657 6.46567 13.852 7.88341 12.794C9.02829 11.9394 9.71061 10.6003 9.72917 9.1718C9.75182 7.40321 11.7491 6.38564 13.1935 7.40655C14.3603 8.23145 15.8441 8.46644 17.2088 8.04249C18.8979 7.51755 20.483 9.10275 19.9581 10.7919L19.9574 10.7912Z"
          fill="white"
        />
        <path
          d="M17.0739 9.54188L15.5266 9.95655C14.7946 10.1526 14.5496 11.0677 15.0852 11.6038L16.2179 12.7364C16.7536 13.2721 17.6687 13.0271 17.865 12.295L18.2797 10.7477C18.4757 10.0156 17.806 9.34586 17.0739 9.54188Z"
          fill="#FA8D0E"
        />
      </g>
      <defs>
        <clipPath id="clip0_821_46">
          <rect width="28" height="40.32" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export const IconSearch = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M15.6095 13.7241L12.2248 10.3394C12.9241 9.28543 13.3335 8.02342 13.3335 6.66674C13.3335 2.9907 10.3428 0 6.66674 0C2.9907 0 0 2.9907 0 6.66674C0 10.3428 2.9907 13.3335 6.66674 13.3335C8.02342 13.3335 9.28543 12.9241 10.3394 12.2248L13.7241 15.6095C14.2441 16.1302 15.0895 16.1302 15.6095 15.6095C16.1302 15.0888 16.1302 14.2448 15.6095 13.7241ZM2.00002 6.66674C2.00002 4.09338 4.09338 2.00002 6.66674 2.00002C9.2401 2.00002 11.3335 4.09338 11.3335 6.66674C11.3335 9.2401 9.2401 11.3335 6.66674 11.3335C4.09338 11.3335 2.00002 9.2401 2.00002 6.66674Z"
        fill={color}
      />
    </SVG>
  );
};

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

export const IconTrash = ({ color, width, height }: SVGTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0L15 3V6H0V9H3V54L9 60H36L42 54V9H45V6H30V3L27 0H18ZM19.2422 3H25.7578L27 4.24219V6H18V4.24219L19.2422 3ZM6 9H39V52.7578L34.7578 57H10.2422L6 52.7578V9Z" fill={color} />
    </svg>

  )

}

export const IconX = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M16 2L2 16Z" fill={color} />
      <path
        d="M16 2L2 16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 2L16 16Z" fill={color} />
      <path
        d="M2 2L16 16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4846 11.0553C17.4846 10.7538 17.5866 10.4523 17.5866 10.0503C17.5866 9.64824 17.5866 9.34673 17.4846 9.04523L19.6269 7.33668C19.831 7.13568 19.831 6.93467 19.729 6.73367L17.6887 3.21608C17.5866 3.11558 17.3826 3.01508 17.0766 3.11558L14.5262 4.1206C14.0161 3.71859 13.404 3.41709 12.7919 3.11558L12.3839 0.502513C12.4859 0.201005 12.1798 0 11.9758 0H7.89519C7.69116 0 7.38512 0.201005 7.38512 0.40201L6.97706 3.11558C6.36497 3.31658 5.85489 3.71859 5.2428 4.1206L2.79443 3.11558C2.48839 3.01508 2.28436 3.11558 2.08033 3.31658L0.0400211 6.83417C-0.0619942 6.93467 0.0400211 7.23618 0.244052 7.43719L2.38637 9.04523C2.38637 9.34673 2.28436 9.64824 2.28436 10.0503C2.28436 10.4523 2.28436 10.7538 2.38637 11.0553L0.244052 12.7638C0.0400211 12.9648 0.0400211 13.1658 0.142036 13.3668L2.18234 16.8844C2.28436 16.9849 2.48839 17.0854 2.79443 16.9849L5.34481 15.9799C5.85489 16.3819 6.46698 16.6834 7.07907 16.9849L7.48713 19.598C7.48713 19.799 7.69116 20 7.99721 20H12.0778C12.2818 20 12.5879 19.799 12.5879 19.598L12.996 16.9849C13.608 16.6834 14.2201 16.3819 14.7302 15.9799L17.2806 16.9849C17.4846 17.0854 17.7907 16.9849 17.8927 16.7839L19.933 13.2663C20.035 13.0653 20.035 12.7638 19.831 12.6633L17.4846 11.0553ZM9.9355 13.5678C7.99721 13.5678 6.36497 11.9598 6.36497 10.0503C6.36497 8.1407 7.99721 6.53266 9.9355 6.53266C11.8738 6.53266 13.506 8.1407 13.506 10.0503C13.506 11.9598 11.8738 13.5678 9.9355 13.5678Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconBookmark = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3.66643C16 2.69397 15.6169 1.76141 14.935 1.07337C14.2527 0.386261 13.3278 0 12.3634 0H3.63613C2.67171 0 1.74685 0.386261 1.06449 1.07337C0.383069 1.76141 0 2.69444 0 3.66643V21.2664C0 21.5626 0.177338 21.8306 0.448698 21.9441C0.720524 22.0577 1.03331 21.9948 1.24137 21.785L7.99977 14.9703L14.7582 21.785C14.9662 21.9948 15.279 22.0577 15.5508 21.9441C15.8222 21.8306 15.9995 21.5626 15.9995 21.2664V3.66643H16Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconCart = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_703_291)">
        <path
          d="M19.4444 6.0002L15.9167 6.00026L12.6837 0.403389C12.4732 0.0371395 11.9681 -0.108173 11.5601 0.0840145C11.151 0.274452 10.9927 0.727452 11.2052 1.09464L14.0389 5.99776H5.96181L8.79549 1.09464C9.00694 0.728952 8.85069 0.275889 8.44097 0.085452C8.03125 -0.105954 7.52778 0.038577 7.31597 0.404889L4.08299 6.00176L0.555556 6.0002C0.24875 6.0002 0 6.22408 0 6.47208V7.47208C0 7.7482 0.24875 7.94395 0.555556 7.94395H1.35799L2.94653 14.3783C3.17257 15.3502 4.07292 16.0002 5.11458 16.0002H14.8819C15.8924 16.0002 16.8253 15.3493 17.0514 14.434L18.6399 7.99958H19.4444C19.7513 7.99958 20 7.7757 20 7.5277V6.5277C20 6.2252 19.75 6.0002 19.4444 6.0002ZM6.66667 13.5002C6.66667 13.7763 6.41785 13.9721 6.11111 13.9721C5.80444 13.9721 5.55556 13.7481 5.55556 13.5002V9.5002C5.55556 9.22414 5.80444 9.02833 6.11111 9.02833C6.41785 9.02833 6.66667 9.25226 6.66667 9.5002V13.5002ZM10.5556 13.5002C10.5556 13.7763 10.3067 13.9721 10 13.9721C9.69333 13.9721 9.44444 13.7482 9.44444 13.5002V9.5002C9.44444 9.22414 9.69333 9.02833 10 9.02833C10.3067 9.02833 10.5556 9.25226 10.5556 9.5002V13.5002ZM14.4444 13.5002C14.4444 13.7763 14.1956 13.9721 13.8889 13.9721C13.5822 13.9721 13.3333 13.7481 13.3333 13.5002V9.5002C13.3333 9.22414 13.5822 9.02833 13.8889 9.02833C14.1956 9.02833 14.4444 9.25226 14.4444 9.5002V13.5002Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_703_291">
          <rect width="20" height="16" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export const IconMinus = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 7 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.5" x2="7" y2="0.5" stroke={color} />
    </SVG>
  );
};

export const IconPlus = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="3.5" x2="7" y2="3.5" stroke={color} />
      <line x1="3.5" y1="0" x2="3.5" y2="7" stroke={color} />
    </SVG>
  );
};

export const IconCheck = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33333 7L0 4L1.11111 3L3.33333 5L8.88889 0L10 1L3.33333 7Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconFollow = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.0152337 9.94522C0.0152337 9.69018 0.0152337 9.43513 0.0152337 9.18009C0.0152337 9.10507 0.045701 9.03006 0.0609347 8.95505C0.106636 8.59498 0.121869 8.21992 0.182804 7.85985C0.914021 3.5541 4.44824 0.298522 8.7746 0.0284741C11.3339 -0.136555 13.6189 0.598575 15.6602 2.17385C15.7821 2.27887 15.904 2.36889 16.0258 2.4739C16.0563 2.4439 16.0715 2.4439 16.0868 2.4289C17.7015 1.04865 19.56 0.238511 21.6623 0.0434768C23.6427 -0.136555 25.5164 0.238511 27.2531 1.24369C30.9091 3.34406 32.6762 7.5448 31.7622 11.8356C31.3966 13.5609 30.6502 15.1061 29.7057 16.5614C28.487 18.4217 27.0093 20.072 25.4555 21.6473C22.7591 24.3928 19.8952 26.9432 17.0617 29.5387C16.3914 30.1538 15.6145 30.1538 14.9442 29.5387C13.9541 28.6235 12.9639 27.7083 11.9737 26.7932C9.68862 24.6928 7.40357 22.5924 5.30132 20.297C3.99122 18.8718 2.77253 17.3865 1.79757 15.7062C0.944488 14.236 0.335141 12.6757 0.106636 10.9804C0.0609347 10.6353 0.0304674 10.2903 0 9.94522H0.0152337Z"
        fill={color}
      />
    </SVG>
  );
};

export const IconUser = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={color} />
      <path
        d="M9.97771 10.4C11.1927 10.4 12.1777 9.41503 12.1777 8.2C12.1777 6.98497 11.1927 6 9.97771 6C8.76268 6 7.77771 6.98497 7.77771 8.2C7.77771 9.41503 8.76268 10.4 9.97771 10.4Z"
        fill={COLORS.primaryColor}
      />
      <path
        d="M7.3913 10.3999H12.6087C12.9777 10.3999 13.3316 10.5685 13.5925 10.8685C13.8534 11.1686 14 11.5756 14 11.9999V13.9999H6V11.9999C6 11.5756 6.14658 11.1686 6.4075 10.8685C6.66842 10.5685 7.02231 10.3999 7.3913 10.3999Z"
        fill={COLORS.primaryColor}
      />
    </SVG>
  )
}


export const IconInstagram = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </SVG>
  )
}

export const IconHomes = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6802 0.77723C10.2852 0.356178 9.61666 0.356178 9.22163 0.777231L0.272699 10.3157C-0.314593 10.9417 0.108921 11.9588 0.950686 11.9987C0.950686 11.9991 0.950684 11.9996 0.950684 12V19C0.950684 20.1046 1.84611 21 2.95068 21H6.95068C7.50297 21 7.95068 20.5523 7.95068 20V15C7.95068 14.4477 8.3984 14 8.95068 14H10.9507C11.503 14 11.9507 14.4477 11.9507 15V20C11.9507 20.5523 12.3984 21 12.9507 21H16.9507C18.0553 21 18.9507 20.1046 18.9507 19V12C18.9507 11.9996 18.9507 11.9991 18.9507 11.9987C19.7928 11.9592 20.2165 10.9418 19.6291 10.3157L10.6802 0.77723Z"
        fill={color}
      />
    </SVG>
  );
};


export const IconLocation = ({ color, width, height }: SVGTypes) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      fill={color}
    >
      <g transform="translate(1.41 1.41) scale(2.81 2.81)">
        <path
          d="M45,0C27.395,0,13.123,14.272,13.123,31.877c0,7.86,2.858,15.043,7.573,20.6L45,81.101l24.304-28.624c4.716-5.558,7.573-12.741,7.573-20.6C76.877,14.272,62.605,0,45,0z M45,43.889c-7.24,0-13.11-5.869-13.11-13.11c0-7.24,5.869-13.11,13.11-13.11s13.11,5.869,13.11,13.11C58.11,38.02,52.24,43.889,45,43.889z"
          fill={color}
        />
        <path
          d="M58.958,71.559L45,82.839L31.057,71.556c-9.329,1.65-15.682,4.901-15.682,8.645c0,5.412,13.263,9.8,29.625,9.8c16.361,0,29.625-4.388,29.625-9.8C74.625,76.458,68.278,73.209,58.958,71.559z"
          fill={color}
        />
      </g>
    </SVG>
  );
};


export const IconStamp = ({ width, height }: SVGTypes) => {
  return (
    <SVG width={width} height={height} viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="41.9995" cy="41.9995" r="41.9995" fill="#FA8D0E" />
      <g clip-path="url(#clip0_1125_210)">
        <path d="M10.8867 58.0174L17.0724 64.5889L14.1857 67.3026L8 60.7311L10.8867 58.0174ZM10.5275 61.1169L13.9596 64.7618L14.5449 64.2098L11.1128 60.5649L10.5275 61.1169ZM10.8667 57.4055L12.1039 56.2415C12.9885 57.0397 14.1126 57.0995 14.9706 56.7004L13.474 55.1174L14.658 54L16.2011 55.6362L16.8795 54.9977L18.2896 56.4942L17.6112 57.1328L19.1543 58.769L17.9703 59.8864L16.394 58.2103C16.241 58.2901 16.0814 58.3699 15.9217 58.4431L16.7797 61.363L15.0837 61.7621L14.2323 58.7823C13.0683 58.789 11.8245 58.3699 10.8601 57.4055H10.8667ZM19.6664 63.7841L18.8483 62.9128L17.3318 64.3428L15.9483 62.8729L20.2451 58.8289L21.6286 60.2988L20.2783 61.5692L21.0965 62.4405L19.6664 63.7841Z" fill="white" />
        <path d="M33.2285 71.1866C32.3106 74.4258 30.7077 75.5366 28.8852 75.0178C27.0627 74.5057 26.2646 72.7098 27.1825 69.4773C28.1003 66.2381 29.7166 65.1339 31.5391 65.6461C33.3615 66.1582 34.1464 67.9475 33.2285 71.1866ZM31.3129 70.6412C31.9315 68.4396 31.6588 67.6082 31.0269 67.4286C30.3817 67.2491 29.71 67.8144 29.0914 70.016C28.4662 72.2243 28.7455 73.049 29.3907 73.2353C30.0226 73.4148 30.6944 72.8561 31.3196 70.6479L31.3129 70.6412ZM37.8512 67.3089L35.0709 77.1462L33.162 76.6075L33.8338 74.233L32.7164 73.9203L33.3549 72.1378L34.3459 72.4171L34.8381 70.6745L33.8471 70.3951L34.2329 68.5394L35.3503 68.852L35.9422 66.7702L37.8512 67.3089Z" fill="white" />
        <path d="M51.3732 72.8365L47.1828 73.9605L46.7638 72.3842L49.0651 71.7723L48.8789 71.0805C47.5154 71.1736 46.511 70.6216 46.2184 69.5108C45.8592 68.1672 46.8303 66.9767 48.6927 66.4845C50.555 65.9856 51.9917 66.531 52.3509 67.8746C52.6502 68.9854 52.0582 69.9764 50.8144 70.5684L51.0007 71.2601C51.9186 71.014 52.9096 70.6482 53.4484 70.2225L53.8674 71.7989C53.3286 72.2312 52.3576 72.5904 51.3732 72.8498V72.8365ZM50.2158 74.9982L57.0866 73.1557L57.5323 74.8119L48.6794 77.1798L47.9078 74.2998L49.8833 73.7743L50.2092 74.9982H50.2158ZM49.4908 69.4643C50.2225 69.2714 50.575 68.839 50.4553 68.3801C50.3289 67.9145 49.8101 67.7216 49.0784 67.9145C48.3468 68.1074 47.9943 68.5397 48.1207 69.0053C48.247 69.4709 48.7658 69.6638 49.4975 69.4709L49.4908 69.4643ZM56.4814 66.9101L56.9736 68.7526L55.8362 69.0585L56.7474 72.4706L54.7919 72.9961L52.7832 65.5001L54.7387 64.9746L55.3373 67.2228L56.4747 66.9168L56.4814 66.9101Z" fill="white" />
        <path d="M74.6063 59.2815L75.9166 60.5453L68.7265 67.9814L67.4162 66.7177L68.946 65.1347L68.068 64.2833L66.9373 65.4539L63.9708 62.5806L68.9792 57.3992L68.4804 56.9136L63.452 62.1083L62.1882 60.8845L68.6068 54.2598L71.5732 57.1331L66.5648 62.3145L67.0637 62.8001L72.1586 57.5389L73.4223 58.7627L72.1985 60.0265L73.0764 60.8778L74.6063 59.2948V59.2815ZM70.3494 63.678L71.6664 62.3212L70.7884 61.4698L69.4714 62.8267L70.3494 63.678Z" fill="white" />
      </g>
      <path d="M61.298 27.1264C59.9228 31.5475 60.6875 36.3543 63.3609 40.1392C66.6706 44.8174 63.3738 51.2885 57.6413 51.3657C53.0143 51.4235 48.6764 53.6341 45.9066 57.3484C42.4813 61.943 35.3029 60.8056 33.4649 55.3755C31.9804 50.9929 28.5358 47.5485 24.1529 46.0641C18.7225 44.2262 17.5914 37.0483 22.18 33.6232C25.888 30.8535 28.0988 26.5159 28.163 21.8891C28.2337 16.157 34.7116 12.8604 39.3901 16.1699C43.1689 18.8431 47.9823 19.6014 52.4038 18.2326C57.8791 16.5297 63.0139 21.6706 61.3109 27.1392L61.298 27.1264Z" fill="white" />
      <path d="M38.3608 44.9824L30.6589 38.4839L33.2262 36.3178L38.3608 40.6501L51.1972 29.8193L53.7645 31.9855L38.3608 44.9824Z" fill="#FA8D0E" />
      <defs>
        <clipPath id="clip0_1125_210">
          <rect width="67.91" height="23.1799" fill="white" transform="translate(8 54)" />
        </clipPath>
      </defs>
    </SVG>

  )
}


export const IconViews = ({ color, width, height }: SVGTypes) => {
  return(
    <SVG width={width} height={height} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5 12.5C19.5 14.985 16.366 17 12.5 17C8.634 17 5.5 14.985 5.5 12.5C5.5 10.015 8.634 8 12.5 8C16.366 8 19.5 10.015 19.5 12.5Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.25 12.5C14.2716 13.1393 13.9429 13.7395 13.3925 14.0656C12.8422 14.3917 12.1578 14.3917 11.6075 14.0656C11.0571 13.7395 10.7284 13.1393 10.75 12.5C10.7284 11.8607 11.0571 11.2604 11.6075 10.9344C12.1578 10.6083 12.8422 10.6083 13.3925 10.9344C13.9429 11.2604 14.2716 11.8607 14.25 12.5V12.5Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </SVG>
  )
}

