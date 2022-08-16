import React, { useEffect, useRef } from "react";
import Button from "../component/FormElements/Button";
import Input from "../component/FormElements/Input";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => props.keep && "column"};
  gap: ${(props) => props.keep && "1rem"};

  a {
    color: var(--color-secondary);
    font-weight: 500;
  }
`;
const FormAdmin = ({ handleLogin, isLoading, keep, setFormdata, formdata }) => {
  const userRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((s) => ({
      ...s,
      controls: {
        ...s.controls,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  return (
    <form
      autoComplete="Off"
      autoSave="Off"
      autoCorrect="Off"
      onSubmit={handleLogin}
    >
      <Input
        type="email"
        label="Email"
        name="email"
        height={"50px"}
        focusColor={"var(--color-secondary)"}
        focusBg="#fefeff"
        value={formdata.controls.email}
        onChange={handleInputChange}
        inputref={userRef}
        autoComplete="off"
      />
      <Input
        type="password"
        label="Password"
        name="password"
        height={"50px"}
        focusColor={"var(--color-secondary)"}
        focusBg="#fefeff"
        onChange={handleInputChange}
      />
      <ButtonWrapper keep={keep}>
        <Button
          text={isLoading ? "Loading..." : "Login"}
          height="50px"
          width={"100%"}
          disabled={isLoading}
          background={"var(--color-main)"}
          boxShadow={keep && "none !important"}
          borderRadius={keep && "50px"}
        />
      </ButtonWrapper>
    </form>
  );
};

export default FormAdmin;
