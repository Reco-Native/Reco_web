import React, { forwardRef } from "react";
import styled from "styled-components";
import { InputStyles, LableStyles } from "../../style/styles.";

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
  ${InputStyles}
`;

const Label = styled.label`
  ${LableStyles}
`;
const Input = forwardRef((props, ref) => {
  return (
    <Wrapper flex={props.flex} WrapperMargin={props.WrapperMargin}>
      {props.label && <Label>{props.label}</Label>}
      <InputStyle
        autoComplete={props.autoComplete}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        height={props.height}
        color={props.color}
        border={props.border}
        focusColor={props.focusColor}
        focusBg={props.focusBg}
        topRightBorderRadius={props.topRightBorderRadius}
        topLeftBorderRadius={props.topLeftBorderRadius}
        required={props.required}
        ariaInvalid={props.ariaInvalid}
        aria-describedby={props.ariaDescribedBy}
        onFocus={props.onFocus && props.onFocus}
        onBlur={props.onBlur && props.onBlur}
        ref={ref}
        readOnly={props.readOnly}
      />
    </Wrapper>
  );
});

export default Input;
