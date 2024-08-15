import Select from "react-select";

import styled from "styled-components";

export interface SelectOptionProps {
  options: { value: string; label: string }[];
  placeholder: string;
  styles: {
    width: string;
    height: string;
    color: string;
    backgroundColor: string;
    border?: boolean;
    shadow?: boolean;
    borderRadius?: string;
  };
}

const StyledSelect: React.FC<SelectOptionProps> = ({
  options,
  placeholder,
  styles,
}) => {
  return (
    <>
      <SelectStyled
        className="react-select-container"
        options={options}
        placeholder={placeholder}
        classNamePrefix="react-select"
        styles={styles}
      />
    </>
  );
};

const SelectStyled = styled(Select)<{
  styles: {
    width: string;
    height: string;
    color: string;
    backgroundColor: string;
    border?: boolean;
    shadow?: boolean;
    borderRadius?: string;
  };
}>`
  width: ${(props) => props.styles.width};
  /* height: ${(props) => props.styles.height}; */
  border-radius: ${(props) =>
    props.styles.borderRadius ? props.styles.borderRadius : "16px"};
  color: ${(props) => props.styles.color};

  ${(props) =>
    props.styles.shadow ? "box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)" : ""};

  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-family: "Pretendard";

  .react-select__indicator {
    text-align: center;
    color: ${(props) => props.styles.color};
  }

  .react-select__control {
    width: ${(props) => props.styles.width};
    height: ${(props) => props.styles.height};
    background-color: ${(props) => props.styles.backgroundColor};
    border: none;
    border-radius: ${(props) =>
      props.styles.borderRadius ? props.styles.borderRadius : "16px"};
    color: ${(props) => props.styles.color};
    ${(props) => (props.styles.border ? "border: 1px solid #757575;" : "")}
  }

  .react-select__placeholder {
    padding: 0;
    width: 78px;
    height: ${(props) => props.styles.height};
    padding-left: 0px;
    text-align: left;
    color: ${(props) => props.styles.color};
  }

  .react-select__single-value {
    padding: 0;
    color: ${(props) => props.styles.color};
  }

  .react-select__indicator {
    padding: 0;
    color: ${(props) => props.styles.color};

    &-separator {
      padding: 0;
      background-color: ${(props) => props.styles.backgroundColor};
    }
  }
  .react-select__input-container {
    padding: 0;
    color: ${(props) => props.styles.color};
  }

  .react-select__menu {
    /* margin-top: -18px; */
    padding: 0;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.3);
    ${(props) =>
      props.styles.shadow ? "box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)" : ""};
    backdrop-filter: blur(31px);

    color: #9e9e9e;
    ${(props) => (props.styles.border ? "border: 1px solid #757575;" : "")}
  }

  .react-select__option {
    &--is-focused {
      color: ${(props) => props.styles.color};
      background: transparent;
      padding: 0;
    }

    &--is-selected {
      color: ${(props) => props.styles.color};
      background-color: transparent;
      padding: 0;
    }
  }
`;

export default StyledSelect;
