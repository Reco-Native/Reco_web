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
      okText={props.okText ? props.okText : 'Ok'}
    >
      {props.children}
    </Mod>
  );
};

export default Modal;
