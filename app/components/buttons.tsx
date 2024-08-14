import styled from "styled-components";

type ButtonTypes = {
  text: string;
  backgroundColor: string;
  textColor: string;
  onClick: () => void;
};

type ButtonStyleTypes = {
  backgroundColor: string;
  textColor: string;
};

const Button = styled.div<ButtonStyleTypes>`
  width: 100%;
  border-radius: 8px;
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

export const ButtonSingle = ({
  text,
  backgroundColor,
  textColor,
  onClick,
}: ButtonTypes) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
    >
      <p>{text}</p>
    </Button>
  );
};
