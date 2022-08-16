import React from "react";
import styled from "styled-components";
import IconsMain from "../Icon";

const NavBar = styled.nav`
  width: 100%;
  height: 80px;
  background-color: var(--color-main);
  /* overflow: hidden; */

  .navbar {
    height: 70px;
    background-color: transparent;
    display: flex;
    display: -webkit-flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1em 2em;
    transition: all 0.5s;
  }

  .icon {
    color: #fff;
    font-size: var(--font-Small);
    cursor: pointer;
  }

  .avatarWrapper,
  .avartarContent {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .avartarContent {
    position: relative;
    margin: 0 2em;

    .firstChildPic {
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }
    .firstChild {
      background: #333;
      border-radius: 50%;
      padding: 5px;
      width: 40px;
      height: 34px;
    }
  }
`;

const Nav = () => {
  return (
    <>
      <NavBar>
        <div className="navbar">
          <div>
            <IconsMain icon="fa-solid:bars" styles="icon" />
          </div>
          <div className="avatarWrapper">
            <IconsMain icon="dashicons:admin-home" />
            <div className="avartarContent">
              <div className="firstChild">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default Nav;
