import React, { useEffect, useRef } from 'react';
// import Button from '../component/FormElements/Button';
import { Input, Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => props.keep && 'column'};
  gap: ${(props) => props.keep && '1rem'};

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
      autoComplete='Off'
      autoSave='Off'
      autoCorrect='Off'
      onSubmit={handleLogin}
    >
      <div style={{ margin: '1rem 0' }}>
        <Input
          placeholder='Email'
          value={formdata.controls.email}
          onChange={(data) => handleInputChange(data, 'email')}
          name='email'
          style={{ height: '40px' }}
        />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <Input.Password
          placeholder='Password'
          value={formdata.controls.password}
          onChange={(data) => handleInputChange(data, 'password')}
          name='password'
          style={{ height: '40px' }}
        />
      </div>

      {/* <Input
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
      /> */}

      <ButtonWrapper keep={keep}>
        <Button
          type='primary'
          style={{ width: '100%' }}
          size='large'
          onClick={handleLogin}
          loading={isLoading === 'loading' ? true : false}
        >
          Login{' '}
        </Button>
        {/* <Button
          text={isLoading ? 'Loading...' : 'Login'}
          height='50px'
          width={'100%'}
          disabled={isLoading}
          background={'var(--color-main)'}
          boxShadow={keep && 'none !important'}
          borderRadius={keep && '50px'}
        /> */}
      </ButtonWrapper>
    </form>
  );
};

export default FormAdmin;
