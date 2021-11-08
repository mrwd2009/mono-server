import React, { memo } from 'react';
import { Modal, Button } from 'antd';

const ModelContainer = ({
  modelContainer = {},
  maxWidth = 768,
  title = 'Edit',
  okText = 'Save',
  okVisible = true,
  cancelVisible = true,
  cancelText = 'Cancel',
  loading = false,
  footer = null,
  children,
  onOk,
}) => {
  const {
    visible,
    loading: innerLoading,
    handleClose,
    handleOk,
  } = modelContainer;
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onCancel={handleClose}
      width="100%"
      destroyOnClose
      style={{ maxWidth }}
      footer={footer || [
        cancelVisible && <Button key="cancel" onClick={handleClose}>{cancelText}</Button>,
        okVisible && <Button key="ok" type="primary" loading={loading || innerLoading} onClick={onOk || handleOk}>{okText}</Button>
      ]}
    >
      {children}
    </Modal>
  );
};

export default memo(ModelContainer);
