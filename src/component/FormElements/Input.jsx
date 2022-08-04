import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: ${(props) => (props.WrapperMargin ? "0" : "25px")};
  flex: ${(props) => props.flex && props.flex};
  position: relative;

  .valid {
    position: absolute;
    right: 0;
    bottom: 15px;
    right: 15px;
    font-size: 20px;
  }
  .hide {
    display: none;
  }

  .invalid {
    color: red !important;
    bottom: 17px;
    right: 15px;
    font-size: 17px;
  }
`;
const InputStyle = styled.input`
  display: block;
  width: 100%;
  height: ${(props) =>
    props.height ? props.height : "calc(1.5em + 0.75rem + 2px)"};

  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => (props.color ? props.color : "#495057")};
  background-color: #fff;
  background-clip: padding-box;
  border: ${(props) => (props.border ? props.border : "1px solid #ced4da")};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-color: #e4e6fc;
  outline: 0;
  -webkit-appearance: none;
  border-top-right-radius: ${(props) => props.topRightBorderRadius} !important;
  border-bottom-right-radius: ${(props) => props.topLeftBorderRadius};
  :focus {
    border-color: ${(props) => props.focusColor && props.focusColor};
    background-color: ${(props) => props.focusBg && props.focusBg};
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-header);
  font-size: var(--font-Smaller);
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;
const Input = ({
  label,
  type,
  placeholder,
  onChange,
  name,
  value,
  height,
  color,
  border,
  focusColor,
  focusBg,
  flex,
  topRightBorderRadius,
  topLeftBorderRadius,
  WrapperMargin,
  required,
  onFocus,
  onBlur,
  inputref,
  ariaDescribedBy,
  ariaInvalid,
  autoComplete,
  readOnly,
}) => {
  return (
    <Wrapper flex={flex} WrapperMargin={WrapperMargin}>
      {label && <Label>{label}</Label>}
      <InputStyle
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        height={height}
        color={color}
        border={border}
        focusColor={focusColor}
        focusBg={focusBg}
        topRightBorderRadius={topRightBorderRadius}
        topLeftBorderRadius={topLeftBorderRadius}
        required={required}
        ariaInvalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onFocus={onFocus && onFocus}
        onBlur={onBlur && onBlur}
        ref={inputref}
        readOnly={readOnly}
      />
    </Wrapper>
  );
};

export default Input;
