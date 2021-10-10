import React, { memo } from 'react';
import { Modal, Button, Form, Spin } from 'antd';

const { Item, useForm } = Form;

const Editor = ({ editor, title = ['New', 'Edit'] }) => {
  const {
    loading,
    visible,
    state: {
      type,
      value,
    },
    closeEditor,
    handleOk,
  } = editor;
  const mTitle = type === 'new' ? title[0] : title[1];
  return (
    <Modal
      title={mTitle}
      style={{ top: 20 }}
      visible={visible}
      destroyOnClose
      onCancel={closeEditor}
      cancelText="Cancel"
      onOk={handleOk}
      okText={ type === 'new' ? 'Create' : 'Save' }
      okButtonProps={{
        loading,
      }}
    >
      <Spin spinning={loading}>

      </Spin>
    </Modal>
  );
};

export default memo(Editor);