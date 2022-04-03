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
};

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
};

export const getOSTheme = () => {
  let defaultTheme = 'default';
  // system supports dark mode
  if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    defaultTheme = 'dark';
  } else {
    defaultTheme = 'default';
  }
  return defaultTheme;
};

export const getOSName = () => {
  const ua = navigator.userAgent;
  let osName = 'Unknown OS';
  if (ua.indexOf('Win') !== -1) {
    osName = 'Windows';
  } else if (ua.indexOf('Mac') !== -1) {
    osName = 'MacOS';
  } else if (ua.indexOf('X11') !== -1) {
    osName = 'UNIX';
  } else if (ua.indexOf('Linux') !== -1) {
    osName = 'Linux';
  }

  return osName;
};

export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
  ) {
    return 'Mobile';
  }
  return 'Desktop';
};

export const getTimezone = () => {
  let timezone = null;
  // return timezone database name(Asia/Shanghai)
  // if browser supports ECMAScript Internationalization API
  if (Intl && Intl.DateTimeFormat) {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // return timezone(480) minute offset as fallback
  if (!timezone) {
    timezone = `${-new Date().getTimezoneOffset()}`;
  }
  return timezone;
};

export const getBrowser = () => {
  // store user agent
  let uAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let fullVersion = 'Unknown';
  // browser name offset in user agent string.
  let nameOffset;
  // version offset in user agent string.
  let versionOffset;

  let matched = null;
  // regexp for Microsoft IE11 browser.
  const IE11Reg = /(trident).+rv[:\s]([\w.]+).+like\sgecko/i;
  // regexp for Microsoft Edge browser.
  const EdgeReg = /(edge|edgios|edga|edg)\/((\d+)?[\w.]+)/i;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((versionOffset = uAgent.indexOf('Opera')) !== -1) {
    browserName = 'Opera';
    fullVersion = uAgent.substring(versionOffset + 6);
    if ((versionOffset = uAgent.indexOf('Version')) !== -1) fullVersion = uAgent.substring(versionOffset + 8);
  } else if ((versionOffset = uAgent.indexOf('MSIE')) !== -1) {
    // In MSIE, the true version is after "MSIE" in userAgent
    browserName = 'Microsoft Internet Explorer';
    fullVersion = uAgent.substring(versionOffset + 5);
    // eslint-disable-next-line no-cond-assign
  } else if ((matched = IE11Reg.exec(uAgent))) {
    // Matched IE11
    return `IE/${matched[2]}`;
    // eslint-disable-next-line no-cond-assign
  } else if ((matched = EdgeReg.exec(uAgent))) {
    // Matched Edge
    return `Edge/${matched[2]}`;
  } else if ((versionOffset = uAgent.indexOf('Chrome')) !== -1) {
    // In Chrome, the true version is after "Chrome"
    browserName = 'Chrome';
    fullVersion = uAgent.substring(versionOffset + 7);
  } else if ((versionOffset = uAgent.indexOf('Safari')) !== -1) {
    // In Safari, the true version is after "Safari" or after "Version"
    browserName = 'Safari';
    fullVersion = uAgent.substring(versionOffset + 7);
    if ((versionOffset = uAgent.indexOf('Version')) !== -1) fullVersion = uAgent.substring(versionOffset + 8);
  } else if ((versionOffset = uAgent.indexOf('Firefox')) !== -1) {
    // In Firefox, the true version is after "Firefox"
    browserName = 'Firefox';
    fullVersion = uAgent.substring(versionOffset + 8);
  } else if ((nameOffset = uAgent.lastIndexOf(' ') + 1) < (versionOffset = uAgent.lastIndexOf('/'))) {
    // In most other browsers, "name/version" is at the end of userAgent
    browserName = uAgent.substring(nameOffset, versionOffset);
    fullVersion = uAgent.substring(versionOffset + 1);
  }

  let strIndex;
  // trim the fullVersion string at semicolon/space if present
  if ((strIndex = fullVersion.indexOf(';')) !== -1) {
    fullVersion = fullVersion.substring(0, strIndex);
  } else if ((strIndex = fullVersion.indexOf(' ')) !== -1) {
    fullVersion = fullVersion.substring(0, strIndex);
  }

  return `${browserName}/${fullVersion}`;
};
