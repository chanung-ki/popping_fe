import styled from "styled-components";

type ButtonTypes = {
  text: string;
  backgroundColor: string;
  textColor: string;
  onClick: () => void;
  border?: string;
};

type ButtonStyleTypes = {
  backgroundColor: string;
  textColor: string;
  border?: string;
};

export const ButtonLargeSingle = ({
  text,
  backgroundColor,
  textColor,
  onClick,
  border,
}: ButtonTypes) => {
  return (
    <LargeButtonSingle
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
      border={border}
    >
      <p>{text}</p>
    </LargeButtonSingle>
  );
};

export const ButtonLarge = ({
  text,
  backgroundColor,
  textColor,
  onClick,
  border,
}: ButtonTypes) => {
  return (
    <LargeButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
      border={border}
    >
      <p>{text}</p>
    </LargeButton>
  );
};

export const ButtonSmall = ({
  text,
  backgroundColor,
  textColor,
  onClick,
  border,
}: ButtonTypes) => {
  return (
    <SmallButton
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
      border={border}
    >
      <p>{text}</p>
    </SmallButton>
  );
};

const LargeButtonSingle = styled.div<ButtonStyleTypes>`
  width: 100%;
  border-radius: 8px;
  background: ${(props) => props.backgroundColor};
  border: ${(props) => (props.border ? props.border : "none")};

  cursor: pointer;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  p {
    padding: 14px 0;

    color: ${(props) => props.textColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const LargeButton = styled.div<ButtonStyleTypes>`
  width: 100%;
  border-radius: 8px;
  background: ${(props) => props.backgroundColor};
  border: ${(props) => (props.border ? props.border : "none")};

  cursor: pointer;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  p {
    padding: 16px 0;

    color: ${(props) => props.textColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const SmallButton = styled.div<ButtonStyleTypes>`
  border-radius: 4px;
  background: ${(props) => props.backgroundColor};

  cursor: pointer;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  p {
    padding: 8px 12px;

    color: ${(props) => props.textColor};
    text-align: center;
    font-family: "Pretendard";
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
