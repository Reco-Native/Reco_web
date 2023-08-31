import React from 'react';
import styled from 'styled-components';
import { Button, Select } from 'antd';

const Container = styled.div`
  position: relative;
  z-index: 1;
  top: -20px;
  width: 95%;
  margin: 0 auto;

  h1 {
    font-family: 'Nunito', sans-serif !important;
    margin-right: auto !important;
    font-weight: 700 !important;
  }

  .head {
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    background-color: #fff;
    border-radius: 3px;
    border: none;
    position: relative;
    margin-bottom: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .icon {
      color: #fff;
      font-size: 25px;
    }
  }

  .backward {
    font-size: 20px;
  }

  .manageUserForm {
    display: flex;
    display: -webkit-flex;
    gap: 15px;
    width: 45%;
  }
`;

const Header = ({ title, Giftcard, handleShowModal, addCurrency, btnTitle, select, options, onChange,onSelect }) => {
  return (
    <Container>
      <div>
        <div className="head">
          <h1>{title}</h1>
          {select && <Select placeholder='Select option' onSelect={onSelect} options={options} onChange={onChange} style={{ width: '10%', height: '40px' }} />}

          {Giftcard && (
            <div>
              <Button
                text={''}
                background="var(--color-main)"
                padding={'10px 15px'}
                onClick={handleShowModal}
                size="large"
                type="primary"
              >
                Add Card
              </Button>
            </div>
          )}
          {addCurrency && (
            <div>
              <Button
                background="var(--color-main)"
                padding={'10px 15px'}
                onClick={handleShowModal}
                size="large"
                type="primary"
              >
                {btnTitle ? btnTitle : 'Add Card'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
