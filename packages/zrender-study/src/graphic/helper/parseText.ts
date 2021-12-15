import * as imageHelper from '../helper/image';
import {
  extend,
  retrieve2,
  retrieve3,
  reduce,
} from '../../core/util';
import { TextAlign, TextVerticalAlign, ImageLike, Dictionary } from '../../core/types';
import { TextStyleProps } from '../Text';
import { getLineHeight, getWidth, parsePercent } from '../../contain/text';


const STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;

interface InnerTruncateOption {
  maxIteration?: number;
  minChar?: number;
  placeholder?: string;
}

interface InnerPreparedTruncateOption extends Required<InnerTruncateOption> {
  font: string;

  ellipsis: string;
  ellipsisWidth: number;
  contentWidth: number;

  containerWidth: number;
  ascCharWidth: number;
}

export function truncateText(text: string, containerWidth: number, font: string, ellipsis: string, options: InnerTruncateOption): string {
  if (!containerWidth) {
    return '';
  }

  const textLines = `${text || ''}`.split('\n');
  options = prepareTruncateOptions(containerWidth, font, ellipsis, options);

  for (let i = 0, len = textLines.length; i < len; i++) {
    textLines[i] = truncateSingleLine(textLines[i], options as InnerPreparedTruncateOption);
  }

  return textLines.join('\n');
}

export function prepareTruncateOptions(containerWidth: number, font: string, ellipsis: string, options: InnerTruncateOption): InnerPreparedTruncateOption {
  options = options || {};
  let preparedOpts = extend({}, options) as InnerPreparedTruncateOption;

  preparedOpts.font = font;
  ellipsis = retrieve2(ellipsis, '...');
  const minChar = preparedOpts.minChar = retrieve2(options.minChar, 0);

  const ascCharWidth = preparedOpts.ascCharWidth = getWidth('a', font);
  preparedOpts.placeholder = retrieve2(options.placeholder, '');

  let contentWidth = containerWidth = Math.max(0, containerWidth - 1); // Reserve some gap.
  for (let i = 0; i < minChar && containerWidth >= ascCharWidth; i++) {
    contentWidth -= ascCharWidth;
  }

  let ellipsisWidth = getWidth(ellipsis, font);
  if (ellipsisWidth > contentWidth) {
    ellipsis = '';
    ellipsisWidth = 0;
  }

  contentWidth = containerWidth - ellipsisWidth;

  preparedOpts.ellipsis = ellipsis;
  preparedOpts.ellipsisWidth = ellipsisWidth;
  preparedOpts.contentWidth = contentWidth;
  preparedOpts.containerWidth = containerWidth;

  return preparedOpts;
}

export function truncateSingleLine(textLine: string, options: InnerPreparedTruncateOption): string {
  const containerWidth = options.containerWidth;
  const font = options.font;
  const contentWidth = options.contentWidth;

  if (!containerWidth) {
    return '';
  }

  let lineWidth = getWidth(textLine, font);

  if (lineWidth <= containerWidth) {
    return textLine;
  }

  // dichotomy is more reasonable
  const len = textLine.length;
  let left = 0;
  let right = textLine.length - 1;
  let i = 0;
  while (true) {
    i = Math.floor((left + right) / 2);
    const w1 = getWidth(textLine.substring(0, i), font);
    const w2 = getWidth(textLine.substring(0, i + 1), font);
    if (w1 <= contentWidth) {
      if (w2 > contentWidth) {
        break;
      }
      left = i + 1;
      if (left >= len) {
        i = len;
        break;
      }
    } else {
      right = i - 1;
      if (right < 0) {
        i = 0;
        break;
      }
    }
  }

  textLine = textLine.substring(0, i) + options.ellipsis;

  if (textLine === '') {
    textLine = options.placeholder;
  }

  return textLine;
}


export interface PlainTextContentBlock {
  lineHeight: number;
  contentHeight: number;

  calculatedLineHeight: number;

  height: number;
  outerHeight: number;

  width: number;
  lines: string[];
}

export function parsePlainText(text: string, style?: TextStyleProps): PlainTextContentBlock {
  if (text != null) {
    text = `${text}`;
  }

  const overflow = style.overflow;
  const padding = style.padding as number [];
  const font = style.font;
  const truncate = overflow === 'truncate';
  const calculatedLineHeight = getLineHeight(font);
  const lineHeight = retrieve2(style.lineHeight, calculatedLineHeight);

  const truncateLineOverflow = style.lineOverflow === 'truncate';

  let width = style.width;
  let lines: string[];

  if (width != null && (overflow === 'break' || overflow === 'breakAll')) {
    lines = text ? wrapText(text, style.font, width, overflow === 'breakAll', 0).lines : [];
  } else {
    lines = text ? text.split('\n') : [];
  }

  const contentHeight = lines.length * lineHeight;
  const height = retrieve2(style.height, contentHeight);

  if (contentHeight > height && truncateLineOverflow) {
    const lineCount = Math.floor(height / lineHeight);
    lines = lines.slice(0, lineCount);
  }

  let outerHeight = height;
  let outerWidth = width;
  if (padding) {
    outerHeight += padding[0] + padding[2];
    if (outerWidth != null) {
      outerWidth += padding[1] + padding[3];
    }
  }

  if (text && truncate && outerWidth != null) {
    const options = prepareTruncateOptions(width, font, style.ellipsis, {
      minChar: style.truncateMinChar,
      placeholder: style.placeholder,
    });

    for (let i = 0; i < lines.length; i++) {
      lines[i] = truncateSingleLine(lines[i], options);
    }
  }

  if (width == null) {
    let maxWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      maxWidth = Math.max(getWidth(lines[i], font), maxWidth);
    }
    width = maxWidth;
  }

  return {
    lines,
    height,
    outerHeight,
    lineHeight,
    calculatedLineHeight,
    contentHeight,
    width,
  };
}

class RichTextToken {
  styleName: string;
  text: string;
  width: number;
  height: number;

  // without padding
  innerHeight: number;

  // size of text
  contentHeight: number;
  contentWidth: number;

  lineHeight: number;
  font: string;
  align: TextAlign;
  verticalAlign: TextVerticalAlign;

  textPadding: number[];
  percentWidth?: string;

  isLineHolder: boolean;
}

class RichTextLine {
  lineHeight: number;
  width: number;
  tokens: RichTextToken[] = [];

  constructor(tokens?: RichTextToken[]) {
    if (tokens) {
      this.tokens = tokens;
    }
  }
}

export class RichTextContentBlock {
  width: number = 0;
  height: number = 0;

  contentWidth: number = 0;
  contentHeight: number = 0;

  outerWidth: number = 0;
  outerHeight: number = 0;
  lines: RichTextLine[] = []
}

type WrapInfo = {
  width: number,
  accumWidth: number,
  breakAll: boolean,
};

export function parseRichText(text: string, style: TextStyleProps) {
  const contentBlock = new RichTextContentBlock();

  if (text != null) {
    text = `${text}`;
  }

  if (!text) {
    return contentBlock;
  }

  const topWidth = style.width;
  const topHeight = style.height;
  const overflow = style.overflow;

  let wrapInfo: WrapInfo = null;
  if ((overflow === 'break' || overflow === 'breakAll') && topWidth != null) {
    wrapInfo = {
      width: topWidth,
      accumWidth: 0,
      breakAll: overflow === 'breakAll',
    };
  }

  let lastIndex = STYLE_REG.lastIndex = 0;
  let result;
  while ((result = STYLE_REG.exec(text)) != null) {
    const matchedIndex = result.index;
    if (matchedIndex > lastIndex) {
      pushTokens(contentBlock, text.substring(lastIndex, matchedIndex), style, wrapInfo);
    }
    pushTokens(contentBlock, result[2], style, wrapInfo, result[1]);
    lastIndex = STYLE_REG.lastIndex;
  }

  if (lastIndex < text.length) {
    pushTokens(contentBlock, text.substring(lastIndex, text.length), style, wrapInfo);
  }

  let pendingList = [];

  let calculatedHeight = 0;
  let calculatedWidth = 0;

  const stlPadding = style.padding as number[];

  const truncate = overflow === 'truncate';
  const truncateLine = style.lineOverflow === 'truncate';

  const finishLine = (line: RichTextLine, lineWidth: number, lineHeight: number) => {
    line.width = lineWidth;
    line.lineHeight = lineHeight;
    calculatedHeight += lineHeight;
    calculatedWidth = Math.max(calculatedWidth, lineWidth);
  };

  outer: for (let i = 0; i < contentBlock.lines.length; i++) {
    const line = contentBlock.lines[i];
    let lineHeight = 0;
    let lineWidth = 0;

    for (let j = 0; j <line.tokens.length; j++) {
      const token = line.tokens[j];
      const tokenStyle = token.styleName && style.rich[token.styleName] || {};
      const textPadding = token.textPadding = tokenStyle.padding as number[];
      // todo why
      const paddingH = textPadding ? textPadding[1] + textPadding[3] : 0;

      const font = token.font = tokenStyle.font || style.font;

      token.contentHeight = getLineHeight(font);
      let tokenHeight = retrieve2(tokenStyle.height, token.contentHeight);

      token.innerHeight = tokenHeight;

      if (textPadding) {
        tokenHeight += textPadding[0] + textPadding[2];
      }

      token.height = tokenHeight;
      token.lineHeight = retrieve3(tokenStyle.lineHeight, style.lineHeight, tokenHeight);

      token.align = tokenStyle && tokenStyle.align || style.align;
      token.verticalAlign = tokenStyle && tokenStyle.verticalAlign || 'middle';

      if (truncateLine && topHeight != null && calculatedHeight + token.lineHeight > topHeight) {
        if (j > 0) {
          line.tokens = line.tokens.slice(0, j);
          finishLine(line, lineWidth, lineHeight);
          contentBlock.lines = contentBlock.lines.slice(0, i + 1);
        } else {
          contentBlock.lines = contentBlock.lines.slice(0, i);
        }
        break outer;
      }

      let styleTokenWidth = tokenStyle.width;
      let tokenWidthNotSpecified = styleTokenWidth == null || styleTokenWidth === 'auto';

      if (typeof styleTokenWidth === 'string' && styleTokenWidth.charAt(styleTokenWidth.length - 1) === '%') {
        token.percentWidth = styleTokenWidth;
        pendingList.push(token);

        token.contentWidth = getWidth(token.text, font);
      } else {
        if (tokenWidthNotSpecified) {
          const textBackgroundColor = tokenStyle.backgroundColor;
          let bgImg = textBackgroundColor && (textBackgroundColor as { image: ImageLike }).image;

          if (bgImg) {
            bgImg = imageHelper.findExistImage(bgImg);
            if (imageHelper.isImageReady(bgImg)) {
              token.width = Math.max(token.width, bgImg.width * tokenHeight / bgImg.height);
            }
          }
        }

        const remainTruncWidth = truncate && topWidth != null ? topWidth - lineWidth : null;

        if (remainTruncWidth != null && remainTruncWidth < token.width) {
          if (!tokenWidthNotSpecified || remainTruncWidth < paddingH) {
            token.text = '';
            token.width = token.contentWidth = 0;
          } else {
            token.text = truncateText(token.text, remainTruncWidth - paddingH, font, style.ellipsis, { minChar: style.truncateMinChar });
            token.width = token.contentWidth = getWidth(token.text, font);
          }
        } else {
          token.contentWidth = getWidth(token.text, font);
        }
      }

      token.width += paddingH;
      lineWidth += token.width;
      if (tokenStyle) {
        lineHeight = Math.max(lineHeight, token.lineHeight);
      }
    }

    finishLine(line, lineWidth, lineHeight);
  }

  contentBlock.outerWidth = contentBlock.width = retrieve2(topWidth, calculatedWidth);
  contentBlock.outerHeight = contentBlock.height = retrieve2(topHeight, calculatedHeight);
  contentBlock.contentHeight = calculatedHeight;
  contentBlock.contentWidth = calculatedWidth;

  if (stlPadding) {
    contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
    contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
  }

  for (let i = 0; i < pendingList.length; i++) {
    const token = pendingList[i];
    const percentWidth = token.percentWidth;
    token.width = parseInt(percentWidth, 10) / 100 * contentBlock.width;
  }

  return contentBlock;
}

type TokenStyle = TextStyleProps['rich'][string];

export function pushTokens(block: RichTextContentBlock, str: string, style: TextStyleProps, wrapInfo: WrapInfo, styleName?: string) {
  const isEmptyStr = str === '';
  const tokenStyle: TokenStyle = styleName && style.rich[styleName] || {};
  const lines = block.lines;
  const font = tokenStyle.font || style.font;

  let newLine = false;
  let strLines;
  let linesWidths;

  if (wrapInfo) {
    const tokenPadding = tokenStyle.padding as number[];
    let tokenPaddingH = tokenPadding ? tokenPadding[1] + tokenPadding[3] : 0;
    if (tokenStyle.width != null && tokenStyle.width !== 'auto') {
      const outerWidth = parsePercent(tokenStyle.width, wrapInfo.width) + tokenPaddingH;
      if (lines.length > 0) {
        if (outerWidth + wrapInfo.accumWidth > wrapInfo.width) {
          strLines = str.split('\n');
          newLine = true;
        }
      }

      wrapInfo.accumWidth = outerWidth;
    } else {
      const res = wrapText(str, font, wrapInfo.width, wrapInfo.breakAll, wrapInfo.accumWidth);
      wrapInfo.accumWidth = res.accumWidth + tokenPaddingH;
      linesWidths = res.linesWidths;
      strLines = res.lines;
    }
  } else {
    strLines = str.split('\n');
  }

  for (let i = 0; i < strLines.length; i++) {
    const text = strLines[i];
    const token = new RichTextToken();
    token.styleName = styleName;
    token.text = text;
    token.isLineHolder = !text && !isEmptyStr;

    if (typeof tokenStyle.width === 'number') {
      token.width = tokenStyle.width;
    } else {
      token.width = linesWidths ? linesWidths[i] : getWidth(text, font);
    }

    if (!i && !newLine) {
      const tokens = (lines[lines.length - 1] || (lines[0] = new RichTextLine())).tokens;

      const tokensLen = tokens.length;
      if (tokensLen === 1 && tokens[0].isLineHolder) {
        tokens[0] = token;
      } else {
        if (text || !tokensLen || isEmptyStr) {
          tokens.push(token);
        }
      }
    } else {
      lines.push(new RichTextLine([token]));
    }
  }
}

function isLatin(ch: string) {
  const code = ch.charCodeAt(0);
  return code >= 0x21 && code < 0x17F;
}

const breakCharMap = reduce(',&?/;] '.split(''), (obj, ch) => {
  obj[ch] = true;
  return obj;
}, {} as Dictionary<boolean>);

function isWorkBreakChar(ch: string) {
  if (isLatin(ch)) {
    if (breakCharMap[ch]) {
      return true;
    }
    return false;
  }
  return true;
}

export function wrapText(text: string, font: string, lineWidth: number, isBreakAll: boolean, lastAccumWidth: number) {
  let lines: string[] = [];
  let linesWidths: number[] = [];
  let line = '';
  let currentWord = '';
  let currentWordWidth = 0;
  let accumWidth = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    if (ch === '\n') {
      if (currentWord) {
        line += currentWord;
        accumWidth += currentWordWidth;
      }
      lines.push(line);
      linesWidths.push(accumWidth);

      line = '';
      currentWord = '';
      currentWordWidth = 0;
      accumWidth = 0;
      continue;
    }

    const chWidth = getWidth(ch, font);
    const inWord = isBreakAll ? false : !isWorkBreakChar(ch);

    if (!lines.length ? lastAccumWidth + accumWidth + chWidth > lineWidth : accumWidth + chWidth > lineWidth) {
      if (!accumWidth) {
        if (inWord) {
          lines.push(currentWord);
          linesWidths.push(currentWordWidth);

          currentWord = ch;
          currentWordWidth = chWidth;
        } else {
          lines.push(ch);
          linesWidths.push(chWidth);
        }
      } else if (line || currentWord) {
        if (inWord) {
          if (!line) {
            line = currentWord;
            currentWord = '';
            currentWordWidth = 0;
            accumWidth = currentWordWidth;
          }
  
          lines.push(line);
          linesWidths.push(accumWidth - currentWordWidth);
  
          currentWord += ch;
          currentWordWidth += chWidth;
          line = '';
          accumWidth = currentWordWidth;
        } else {
          if (currentWord) {
            line += currentWord;
            accumWidth += currentWordWidth;
            currentWord = '';
            currentWordWidth = 0;
          }
  
          lines.push(line);
          linesWidths.push(accumWidth);
  
          line = ch;
          accumWidth = chWidth;
        }
      }
      continue;
    }

    accumWidth += chWidth;

    if (inWord) {
      currentWord += ch;
      currentWordWidth += chWidth;
    } else {
      if (currentWord) {
        line += currentWord;
        currentWord = '';
        currentWordWidth = 0;
      }

      line += ch;
    }
  }

  if (!lines.length && !line) {
    line = text;
    currentWord = '';
    currentWordWidth = 0;
  }

  if (currentWord) {
    line += currentWord;
  }

  if (line) {
    lines.push(line);
    linesWidths.push(accumWidth);
  }

  if (lines.length === 1) {
    accumWidth += lastAccumWidth;
  }

  return {
    accumWidth,
    lines,
    linesWidths,
  };
}