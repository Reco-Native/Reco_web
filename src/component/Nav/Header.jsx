import React from "react";
import styled from "styled-components";
import Button from "../FormElements/Button";

const Container = styled.div`
  position: relative;
  z-index: 1;
  top: -20px;
  width: 95%;
  margin: 0 auto;

  h1 {
    font-family: "Nunito", sans-serif !important;
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

const Header = ({ title, Giftcard }) => {
  return (
    <Container>
      <div>
        <div className="head">
          <h1>{title}</h1>
          {Giftcard && (
            <div>
              <Button
                text={"Add Card"}
                background="var(--color-main)"
                padding={"10px 15px"}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
