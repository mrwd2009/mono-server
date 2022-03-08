import { Text } from '../util/graphic';

type TextStyleProps = Text['style'];
export function getTextRect(
  text: TextStyleProps['text'],
  font?: TextStyleProps['font'],
  align?: TextStyleProps['align'],
  verticalAlign?: TextStyleProps['verticalAlign'],
  padding?: TextStyleProps['padding'],
  rich?: TextStyleProps['rich'],
  truncate?: boolean,
  lineHeight?: number
) {
  const textEl = new Text({
    style: {
      text,
      font,
      align,
      verticalAlign,
      padding,
      rich,
      overflow: truncate ? 'truncate' : null,
      lineHeight
    }
  });

  return textEl.getBoundingRect();
}