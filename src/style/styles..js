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
`;

export const InputStyles = css`
  display: block;
  width: 100%;
  height: ${(props) =>
    props.height ? props.height : "calc(1.5em + 0.75rem + 2px)"};

  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => (props.color ? props.color : "#495057")};
  background-color: #fff;
  background-clip: padding-box;
  border: ${(props) => (props.border ? props.border : "1px solid #ced4da")};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-color: #e4e6fc;
  outline: 0;
  -webkit-appearance: none;
  border-top-right-radius: ${(props) => props.topRightBorderRadius} !important;
  border-bottom-right-radius: ${(props) => props.topLeftBorderRadius};
  :focus {
    border-color: ${(props) => props.focusColor && props.focusColor};
    background-color: ${(props) => props.focusBg && props.focusBg};
  }
`;

export const LableStyles = css`
  font-weight: 600;
  color: var(--color-header);
  font-size: var(--font-Smaller);
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;
