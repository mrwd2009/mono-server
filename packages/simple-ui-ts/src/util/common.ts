import { notification, Modal } from 'antd';

export const showSuccess = (msg: string) => {
  notification.success({
    message: 'Success',
    description: msg,
  });
};

export const showError = (error: Error | string,  key = '__global_error__') => {
  let desc = error;
  if (error instanceof Error) {
    desc = error.message;
  }
  notification.error({
    key,
    message: 'Error',
    description: desc,
    duration: 0,
  });
};

export const showWarning = (warning: string) => {
  notification.warning({
    message: 'Warning',
    description: warning,
  });
};

export const showWarningModal = ({ title, content }: { title: string, content: string }) => {
  Modal.warning({
    title,
    content,
    okText: 'Ok',
    centered: true
  });
};

export const showConfirm = ({ title, content, onConfirm }: { title: string, content: string, onConfirm: () => void }) => {
  Modal.confirm({
    title,
    content,
    onOk: onConfirm,
    okText: 'Confirm',
    cancelText: 'Cancel',
    centered: true,
  });
};