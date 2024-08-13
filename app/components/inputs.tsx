"use client";

import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";

interface InputTypes {
  value: string;
  placeholder: string;
  type: string;
  maxLength: number | undefined;
  status: boolean | null;
  bottomText: string;
  bottomTextClickable: boolean;
  bottomTextOnClick: () => void;
  onChange: CallableFunction;
  onFocus: () => void;
  onBlur: () => void;
  disabled: boolean;
}

interface InputFlatStatusTypes {
  color: string;
  clickable: boolean;
}

const InputFlatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputFlatInput = styled.input`
  width: 100%;

  padding: 2px 0;

  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border: none;
  border-bottom: 2px solid ${COLORS.greyColor};
  outline: none;

  caret-color: ${COLORS.mainColor};

  transition: border 0.3s ease;

  &:focus {
    border-bottom: 2px solid ${COLORS.mainColor};
  }

  &::placeholder {
    color: ${COLORS.greyColor};
  }
`;

const InputFlatStatus = styled.p<InputFlatStatusTypes>`
  color: ${(props) => props.color};
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: ${(props) => (props.clickable ? "pointer" : "text")};
`;

export const InputFlat = ({
  value,
  placeholder,
  type,
  maxLength,
  status,
  bottomText,
  bottomTextClickable,
  bottomTextOnClick,
  onChange,
  onFocus,
  onBlur,
  disabled,
}: InputTypes) => {
  return (
    <InputFlatContainer>
      <InputFlatInput
        value={value}
        placeholder={placeholder}
        required
        type={type}
        maxLength={maxLength}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {bottomText != "" ? (
        <InputFlatStatus
          color={
            status != null
              ? status == true
                ? COLORS.mainColor
                : COLORS.statusNegativeColor
              : COLORS.greyColor
          }
          clickable={bottomTextClickable}
          onClick={bottomTextOnClick}
        >
          {bottomText}
        </InputFlatStatus>
      ) : null}
    </InputFlatContainer>
  );
};
