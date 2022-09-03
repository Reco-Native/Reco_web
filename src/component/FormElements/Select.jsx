import React from "react";
import styled from "styled-components";
import { InputStyles, LableStyles } from "../../style/styles.";

const Wrapper = styled.div`
  margin-bottom: ${(props) => (props.WrapperMargin ? "0" : "25px")};
  flex: ${(props) => props.flex && props.flex};
`;
const Select = styled.select`
  ${InputStyles}
`;

const Label = styled.label`
  ${LableStyles}
`;
const Selects = ({
  label,
  onChange,
  name,
  value,
  height,
  color,
  border,
  focusColor,
  focusBg,
  option,
  flex,
    WrapperMargin,
  defaults
}) => {
  return (
    <Wrapper flex={flex} WrapperMargin={WrapperMargin}>
      {label && <Label>{label}</Label>}
      <Select
        onChange={onChange}
        name={name}
        value={value}
        height={height}
        color={color}
        border={border}
        focusColor={focusColor}
        focusBg={focusBg}
      >
        <option defaultChecked >
        {defaults}
        </option>
        {option?.map((item) => (
          <option value={item.name} key={item.name}>
            {item?.name}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default Selects;
