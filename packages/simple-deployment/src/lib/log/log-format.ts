import { format } from 'winston';
import stringify from 'safe-stable-stringify';
import { TransformableInfo, FormatWrap } from 'logform';

const {
  timestamp,
  combine,
} = format;

export const errorReponse: FormatWrap = format((info: TransformableInfo): TransformableInfo | boolean => {
  if (info.response instanceof Error) {
    const error = info.response;
    // JSON.stringify will cause error for circular structures.
    info.response = stringify({
      ...error,
      message: error.message,
      stack: error.stack,
    });
  } else {
    info.response = (info.response && stringify(info.response)) || '';
  }
  return info;
});

export const fullFormats = combine(
  timestamp(),
  errorReponse(),
);

