import React from 'react';
import { Modal as Mod } from 'antd';

const Modal = (props) => {
  return (
    <Mod
      title={props.title}
      open={props.open}
      onOk={props.handleSumbit}
      onCancel={props.handleCancel}
      confirmLoading={props.loading}
    >
      {props.children}
    </Mod>
    // <>
    //   {props.show && (
    //     <Backdrop onClick={() => props.setShow(false)} theme={props.theme} />
    //   )}
    //   <AnimatePresence>
    //     {props.show && (
    //       <ModalOverLay
    //         ButtonBG={props.ButtonBG}
    //         justifyButton={props.justifyButton}
    //         boxshadow={props.boxshadow}
    //         borderradius={props.borderradius}
    //         height={props.height}
    //         background={props.background}
    //         right={props.right}
    //         exit={props.exit}
    //         overFlow={props.overFlow}
    //         show={props.show}
    //         btn={props.btn}
    //         transition={props.transition}
    //         animate={props.animate}
    //         initial={props.initial}
    //         setShow={props.setShow}
    //         top={props.top}
    //         width={props.width}
    //         left={props.left}
    //         padding={props.padding}
    //       >
    //         {props.children}
    //       </ModalOverLay>
    //     )}
    //   </AnimatePresence>
    // </>
  );
};

export default Modal;
