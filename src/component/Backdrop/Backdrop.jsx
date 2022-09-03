import React from "react";
import ReactDOM from "react-dom";
import "../../style/utilities.css";
import styled from "styled-components";
import { motion } from "framer-motion";

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "10")};
  opacity: 1;
`;

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <Back
      onClick={props.onClick}
      theme={props.theme}
      zindex={props.zindex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      as={motion.div}
    ></Back>,
    document.getElementById("backdrop-protal")
  );
};

export default Backdrop;
