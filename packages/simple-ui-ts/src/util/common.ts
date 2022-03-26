import { notification, Modal } from 'antd';
import { select } from 'd3-selection';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import slice from 'lodash/slice';

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


let scrollbarWidth: any = null;
// reference https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
export const getScrollbarWidth = () => {
  if (scrollbarWidth !== null) {
    return scrollbarWidth;
  }
  let outer: any = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  let inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  scrollbarWidth = widthNoScroll - widthWithScroll;
  return scrollbarWidth;
}

/**
 * Find target node in a tree.
 * @param id - Unique id for node.
 * @param tree - Tree data structure, perhaps has 'children' property.
 * @param idPropName {(string|Function)} - Get id.
 * @return {*} Target node or null.
 */
 export const findTreeNode = (id: any, tree: any, idPropName: any = 'id') => {
  let nodes;
  let result = null;
  if (isArray(tree)) {
    nodes = slice(tree);
  } else {
    nodes = [tree];
  }
  let index = 0;
  while (index < nodes.length) {
    const node = nodes[index];
    index += 1;
    if (isFunction(idPropName)) {
      if (idPropName(node) === id) {
        result = node;
        break;
      }
    } else if (node[idPropName] === id) {
      result = node;
      break;
    }
    if (node.children && node.children.length) {
      nodes.push.apply(nodes, node.children); // eslint-disable-line
    }
  }

  return result;
}