import ReactDOM from "react-dom";
import React from "react";
import Backdrop from "../Backdrop/Backdrop";

import Button from "../FormElements/Button";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import "../../style/utilities.css";

const MainModal = styled.div`
  z-index: 9991;
  position: fixed;
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  top: ${({ top }) => top};
  margin-right: -50%;
  transform: translate(-50%, -50%);

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ background }) =>
    background ? background : "var(--color-white)"};
  box-shadow: ${({ boxShadow }) =>
    boxShadow ? boxShadow : "0 2px 8px rgba(0, 0, 0, 0.26)"};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "8px")};
  padding: ${({ padding }) => (padding ? padding : "1rem")};
  overflow: ${({ overflow }) => overflow};

  div svg {
    opacity: 1;
    font-size: var(--font-small-screen);
  }
  div svg:hover {
    opacity: 0.5;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  display: -webkit-flex;
  justify-content: ${({ justifyButton }) =>
    justifyButton ? justifyButton : "flex-end"};
  -webkit-box-align: ${({ justifyButton }) =>
    justifyButton ? justifyButton : "end"};
  -webkit-box-pack: ${({ justifyButton }) =>
    justifyButton ? justifyButton : "end"};
  padding: 10px 10px 0px;
`;

const ModalOverLay = ({
  justifyButton,
  ButtonBG,
  boxshadow,
  borderradius,
  padding,
  top,
  exit,
  background,
  width,
  overFlow,
  right,
  height,
  left,
  initial,
  children,
  setShow,
  animate,
  transition,
  btn,
  show,
  setShowMobileReserveModal,
  dispatch,
}) => {
  const content = (
    <>
      <MainModal
        as={motion.div}
        initial={initial}
        animate={animate}
        exit={exit ? exit : { opacity: 0 }}
        transition={transition}
        className="Modal"
        padding={padding}
        top={top}
        width={width}
        left={left}
        overflow={overFlow}
        height={height}
        right={right}
        background={background}
        dispatch={dispatch}
        boxshadow={boxshadow}
        borderradius={borderradius}
      >
        {btn ? (
          ""
        ) : (
          <ButtonContainer justifyButton={justifyButton}>
            <Button
              icon={"ic:baseline-cancel"}
              display="flex"
              align={"center"}
              padding={"0"}
              iconstyle="icon"
              background="transparent"
              boxShadow="none"
              height="none"
              fontSize={"22px"}
              color={"var(--color-secondary)"}
              onClick={() => setShow(false)}
            />
          </ButtonContainer>
        )}
        {children}
      </MainModal>
    </>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-portal")
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && (
        <Backdrop onClick={() => props.setShow(false)} theme={props.theme} />
      )}
      <AnimatePresence>
        {props.show && (
          <ModalOverLay
            ButtonBG={props.ButtonBG}
            justifyButton={props.justifyButton}
            boxshadow={props.boxshadow}
            borderradius={props.borderradius}
            height={props.height}
            background={props.background}
            right={props.right}
            exit={props.exit}
            overFlow={props.overFlow}
            show={props.show}
            btn={props.btn}
            transition={props.transition}
            animate={props.animate}
            initial={props.initial}
            setShow={props.setShow}
            top={props.top}
            width={props.width}
            left={props.left}
            padding={props.padding}
          >
            {props.children}
          </ModalOverLay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
