import { notification, Modal } from 'antd';
import { select } from 'd3-selection';

export const showSuccess = (msg: string, key = '__global_success__') => {
  notification.success({
    message: 'Success',
    description: msg,
    key,
  });
};

export const showError = (error: Error | string, key = '__global_error__') => {
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

export const showWarning = (warning: string, key = '__global_warning__') => {
  notification.warning({
    message: 'Warning',
    description: warning,
    key,
  });
};

export const showWarningModal = ({ title, content }: { title: string; content: string }) => {
  Modal.warning({
    title,
    content,
    okText: 'Ok',
    centered: true,
  });
};

export const showConfirm = ({
  title,
  content,
  onConfirm,
}: {
  title: string;
  content: string;
  onConfirm: () => void;
}) => {
  Modal.confirm({
    title,
    content,
    onOk: onConfirm,
    okText: 'Confirm',
    cancelText: 'Cancel',
    centered: true,
  });
};

/**
 * Get translate x and y value from transform attribute.
 * @param {Node} node target node.
 * @return {{x: number, y: number}} Value to return.
 */
export const getTranslateAttr = (node: HTMLElement) => {
  const treeNode = select(node);
  const transformText = treeNode.attr('transform');
  // translate css attribute can have \d , . - \s
  const matches = transformText.match(/translate\s*\(([\d,.\-\s]+)\)/);
  if (!matches) {
    return {
      x: 0,
      y: 0,
    };
  }
  // For ie11 the transform attribute maybe translate(292 20).
  let [x, y] = matches[1].split(/[,\s]+/);
  return {
    x: parseFloat(x),
    y: parseFloat(y),
  };
};

/**
 * Calculate ellipsis text for svg text element.
 * @param {Text} textEl svg text element
 * @param {String} rawText the raw text to get ellipsis style.
 * @param {Number} width max text width.
 * @return {{text: String, ellipsis: boolean}} Calculated result.
 */
export const measureSvgText = (textEl: SVGTextElement, rawText: string, width: number) => {
  const textNode = select(textEl);
  const currentText = textNode.text();
  textNode.text(rawText);
  let truncateText = rawText;
  let ellipsis = false;
  let start = 0;
  let end = rawText.length;
  let textWidth = textEl.getComputedTextLength();
  if (textWidth > width) {
    while (true) {
      let middle = Math.floor((start + end) / 2);
      truncateText = `${rawText.substring(0, middle)}...`;
      textNode.text(truncateText);
      textWidth = textEl.getComputedTextLength();
      if (middle >= end - 1) {
        ellipsis = true;
        // current string is matched
        if (textWidth <= width) {
          break;
        } else {
          // previous text is proper
          if (middle > 0) {
            truncateText = `${rawText.substring(0, middle - 1)}...`;
          } else {
            // only empty string can match
            truncateText = '...';
          }
          break;
        }
      }
      if (textWidth > width) {
        end = middle;
      } else {
        start = middle;
      }
    }
  }
  textNode.text(currentText);
  return {
    text: truncateText,
    ellipsis,
  };
};
