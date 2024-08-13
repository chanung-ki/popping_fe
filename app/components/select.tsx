import { COLORS } from "@/public/styles/colors";
import { styled } from "styled-components";
import { IconRoundTriangle, IconX } from "./icons";

interface selectTypes {
  placeholder: string;
  value: string | null;
  isFocus: boolean;
  onClick: () => void;
}

interface SelectFlatDivType {
  isFocus: boolean;
}

const SelectFlatDiv = styled.div<SelectFlatDivType>`
  position: relative;
  width: 100%;

  padding: 2px 0;

  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isFocus ? COLORS.mainColor : COLORS.greyColor)};
  outline: none;

  transition: border 0.3s ease;

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

  &:focus {
    border-bottom: 2px solid ${COLORS.mainColor};
  }
`;

const SelectFlatPlaceholder = styled.p`
  color: ${COLORS.greyColor};
`;

const SelectFlatTriangleContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%) rotate(-180deg);
`;

export const SelectFlat = ({
  placeholder,
  value,
  isFocus,
  onClick,
}: selectTypes) => {
  return (
    <SelectFlatDiv isFocus={isFocus} onClick={onClick}>
      {value ? (
        <p>{value}</p>
      ) : (
        <SelectFlatPlaceholder>{placeholder}</SelectFlatPlaceholder>
      )}
      <SelectFlatTriangleContainer>
        <IconRoundTriangle
          color={COLORS.greyColor}
          width={undefined}
          height={10}
        />
      </SelectFlatTriangleContainer>
    </SelectFlatDiv>
  );
};

// 하단 섹션
interface SelectBottomSectionTypes {
  title: string;
  onClose: () => void;
  options: string[];
  onBackgroundClick: () => void;
  onClick: CallableFunction;
}

const BottomSectionBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  left: 0;
  top: 0;

  z-index: 2;

  overflow: hidden;
`;

const BottomSection = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${COLORS.primaryColor};
  border-radius: 16px 16px 0px 0px;
  z-index: 3;
`;

const BottomSectionContainer = styled.div`
  padding: 16px 24px 16px 24px;
`;

const BottomSectionTitleContainer = styled.div`
  position: relative;
  padding: 20px 0;
`;

const BottomSectionTitle = styled.p`
  color: ${COLORS.secondaryColor};
  text-align: center;
  font-family: "Pretendard";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BottomSectionCloseContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0;
`;

const BottomSectionOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;

  max-height: 65dvh;
  overflow-y: scroll;
`;

const BottomSectionOption = styled.p`
  color: ${COLORS.secondaryColor};
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
`;

export const SelectBottomSection = ({
  title,
  onClose,
  options,
  onBackgroundClick,
  onClick,
}: SelectBottomSectionTypes) => {
  return (
    <BottomSectionBackground onClick={onBackgroundClick}>
      <BottomSection>
        <BottomSectionContainer>
          <BottomSectionTitleContainer>
            <BottomSectionTitle>{title}</BottomSectionTitle>
            <BottomSectionCloseContainer onClick={onClose}>
              <IconX
                color={COLORS.secondaryColor}
                width={undefined}
                height={16}
              />
            </BottomSectionCloseContainer>
          </BottomSectionTitleContainer>

          <BottomSectionOptionsContainer>
            {options.map((text: string, index: number) => (
              <BottomSectionOption
                key={index}
                onClick={() => {
                  onClick(text);
                }}
              >
                {text}
              </BottomSectionOption>
            ))}
          </BottomSectionOptionsContainer>
        </BottomSectionContainer>
      </BottomSection>
    </BottomSectionBackground>
  );
};
