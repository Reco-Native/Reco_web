import React from "react";
import styled from "styled-components";
import IconsMain from "../Icon"; 

const Btn = styled.button`
  color: ${(props) => (props.color ? props.color : "#fff")};
  box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : "0 2px 6px #acb5f6"};
  background-color: ${(props) =>
    props.background ? props.background : "#6777ef"};
  border-color: #6777ef;
  display: ${(props) => props.display && props.display};
  align-items: ${(props) => props.alignItems && props.alignItems};
  justify-content: ${(props) => props.justify && props.justify};
  padding: ${(props) => (props.padding ? props.padding : "0.55rem 1.5rem")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  height: ${(props) => props.height && props.height};
  line-height: 24px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  letter-spacing: 0.5px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0.3rem"};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  text-transform: none;
  width: ${(props) => props.width && props.width};

  border: ${(props) => (props.border ? props.border : "1px solid transparent")};
  cursor: pointer;
  border-top-left-radius: ${(props) => props.borderTopLeftRadius};
  border-bottom-left-radius: ${(props) => props.borderTopRightRadius};
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }
`;
const Button = ({
  text,
  onClick,
  background,
  color,
  padding,
  fontWeight,
  fontSize,
  border,
  height,
  icon,
  display,
  align,
  justify,
  iconstyle,
  borderRadius,
  borderTopRightRadius,
  borderTopLeftRadius,
  boxShadow,
  width,
  disabled,
  loader,
}) => {
  return (
    <Btn
      background={background}
      color={color}
      padding={padding}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      height={height}
      display={display}
      alignItems={align}
      justify={justify}
      borderRadius={borderRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderTopLeftRadius={borderTopLeftRadius}
      boxShadow={boxShadow}
      onClick={onClick}
      width={width}
      disabled={disabled}
    >
      {icon && <IconsMain icon={icon} style={iconstyle} />}
      {loader && loader}
      {text}
    </Btn>
  );
};

export default Button;
