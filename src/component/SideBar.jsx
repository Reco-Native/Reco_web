import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AdminSideBarStyle } from "../style/styles.";
import IconsMain from "./Icon";

const Aside = styled.aside`
  ${AdminSideBarStyle}
  display: block;
  background-color: var(--color-secondary);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  ul {
    padding: 0;
    margin: 0;
    margin-bottom: 3rem !important;
  }
  ul:not(.list-unstyled),
  ol {
    line-height: 28px;
  }

  li {
    display: block;
    list-style: none;
  }

  a {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    letter-spacing: 0.3px;
    color: var(--color-primary);
    text-decoration: none;
  }

  li.menu-header {
    padding: 3px 15px;
    color: #a1a8ae;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    font-weight: 600;
  }

  .active {
    color: var(--color-main);
    font-weight: 600;
  }

  svg {
    width: 28px;
    margin-right: 20px;
    text-align: center;
  }
`;

const SideBar = () => {
  return (
    <>
      <Aside>
        <ul>
          <li className="menu-header">Dashboard</li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="fa-solid:fire" styles="icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cryptofx/transaction-report"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="fa:exchange" styles={"icon"} />
              Transaction Report
            </NavLink>
          </li>
        </ul>
      </Aside>
    </>
  );
};

export default SideBar;
