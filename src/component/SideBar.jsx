import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AdminSideBarStyle } from "../style/styles.";
import IconsMain from "./Icon";

const Aside = styled.aside`
  ${AdminSideBarStyle}
  display: flex;
  background-color: var(--color-secondary);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  ul:not(.list-unstyled),
  ol {
    line-height: 28px;
  }

  li {
    display: block;
    list-style: none;
    --transition-duration: 250ms;
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
    transition: all ease 0.3s;
  }

  .active {
    padding-left: 24px;
    span {
      background-color: var(--color-primary);
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      border-bottom-right-radius: 0.5rem;
      padding: 7px 28px;
    }
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
    font-size: 1.3rem;
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
              className={({ isActive }) =>
                isActive && window.location.pathname === "/dashboard"
                  ? "active"
                  : ""
              }
            >
              <IconsMain icon="fa-solid:fire" styles="icon" />
              <span> Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/currency"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="fa6-solid:money-bill-1-wave" />
              <span> Currency</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/giftcards"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="ic:baseline-card-giftcard" styles={"icon"} />
              <span> GiftCard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="heroicons-outline:user-group" styles={"icon"} />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain icon="fa:exchange" styles={"icon"} />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/wallet"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <IconsMain
                icon="fluent:wallet-credit-card-16-regular"
                styles={"icon"}
              />
              <span>Wallet</span>
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink
            to="#"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <IconsMain icon="icomoon-free:switch" styles={"icon"} />
            Logout
          </NavLink>
        </div>
      </Aside>
    </>
  );
};

export default SideBar;
