import { notification, Modal } from 'antd';
export function decodeURLParams(search) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
      const split = hash.indexOf("=");

      if (split < 0) {
          return Object.assign(params, {
              [hash]: null
          });
      }

      const key = hash.slice(0, split);
      const val = hash.slice(split + 1);

      return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
};

export const showSuccess = (msg) => {
  notification.success({
    message: 'Success',
    description: msg,
  });
};

export const showError = (error) => {
  let desc = error;
  if (error instanceof Error) {
    desc = error.message;
  }
  notification.error({
    message: 'Error',
    description: desc,
    duration: 0,
  });
};

export const showWarning = (warning) => {
  notification.warning({
    message: 'Warning',
    description: warning,
  });
};

export const showWarningModal = ({ title, content }) => {
  Modal.warning({
    title,
    content,
    okText: 'Ok',
    centered: true
  });
};

export const showConfirm = ({ title, content, onConfirm }) => {
  Modal.confirm({
    title,
    content,
    onOk: onConfirm,
    okText: 'Confirm',
    cancelText: 'Cancel',
    centered: true,
  });
};

export const noopReject = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
}

const supportSaveAs = (!!Blob && ('download' in document.createElement('a'))) || !!(window.navigator && window.navigator.msSaveBlob);
export function saveAs(data, filename) {
  if (!data) {
    return;
  }
  if (!supportSaveAs) {
    notification['error']({
      message: 'Error',
      description: 'Current browser don\'t support download.'
    });
  }
  const blob = new Blob([data]);
  // for IE11 browser saving file content
  if (window.navigator && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  const aEle = document.createElement('a');
  aEle.download = filename;
  aEle.style.display = 'none';
  aEle.href = URL.createObjectURL(blob);
  document.body.appendChild(aEle);
  aEle.click();
  document.body.removeChild(aEle);
  URL.revokeObjectURL(aEle.href);
}

export const formatNumber = (number, config) => {
  const {
    style = 'decimal', // 'decimal', 'currency',
    minIntDigits = 1,
    minFracDigits = 2,
    maxFracDigits = 2,
    currency = 'USD'
  } = config || {};
  if (!(Intl && Intl.NumberFormat)) {
    return `${number}`;
  }
  return (new Intl.NumberFormat('en-US', {
    style,
    minimumIntegerDigits: minIntDigits,
    minimumFractionDigits: minFracDigits,
    maximumFractionDigits: maxFracDigits,
    currency,
  })).format(number);
};

export const getCurrTime = () => {
  const curr = new Date();
  return {
    year: curr.getFullYear(),
    month: ('0' + (curr.getMonth() + 1)).slice(-2),
  }
};

export const convertNumberLabel = (val) => {
  let labelValue = val || 0;
  // Nine Zeroes for Billions
  return labelValue >= 1.0e+9
    ? Math.round(labelValue / 1.0e+9 * 100) / 100 + 'B'
    // Six Zeroes for Millions 
    : labelValue >= 1.0e+6
      ? Math.round(labelValue / 1.0e+6 * 100) / 100 + 'M'
      // Three Zeroes for Thousands
      : labelValue >= 1.0e+3
        ? Math.round(labelValue / 1.0e+3 * 100) / 100 + 'K'
        : labelValue + '';
}

export const looseUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}