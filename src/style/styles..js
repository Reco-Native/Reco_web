import { css } from "styled-components/macro";

export const AdminSideBarStyle = css`

  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgb(0 0 0 / 3%);
  padding: 8px max(1.5vh, 1.2em);
  overflow-y: hidden;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 7px;
    padding: 0;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 1px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }

  &:hover,
  &:active,
  &:focus {
    overflow-y: auto;
  }
`;


export const SectionStyles = css`
  background-color: #f9f9f9;
  height: 100%;

`