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
    borderRadius?: string;
  };
  onChangeHandler: any;
}

const StyledSelect: React.FC<SelectOptionProps> = ({
  options,
  placeholder,
  styles,
  onChangeHandler,
}) => {
  return (
    <>
      <SelectStyled
        className="react-select-container"
        options={options}
        placeholder={placeholder}
        classNamePrefix="react-select"
        styles={styles}
        onChange={onChangeHandler}
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
  & .react-select {
    &__control {
      display: flex;
      align-items: center;
      justify-content: center;

      width: calc(${(props) => props.styles.width} - 4px);
      min-height: calc(${(props) => props.styles.height} - 8px);
      max-height: ${(props) => props.styles.height};
      border-radius: ${(props) =>
        props.styles.borderRadius ? props.styles.borderRadius : "16px"};
      border: none;
      font-size: 12px;
      font-family: "Pretendard";
      font-weight: 400;
      white-space: nowrap;

      &--menu-is-open {
      }
    }

    &__value-container {
      height: 100%;
    }

    &__input-container {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    &__indicators {
    }

    &__indicator {
      &-separator {
        display: none;
      }

      & > svg {
        width: 8px;
        height: 8px;
      }
    }
  }
`;

export default StyledSelect;
