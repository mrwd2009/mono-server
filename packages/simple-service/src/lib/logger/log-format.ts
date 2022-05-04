/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'winston';
import { isEmpty } from 'lodash';
import stringify from 'safe-stable-stringify';
import querystring from 'query-string';
import { TransformableInfo, FormatWrap } from 'logform';

const { timestamp, combine, json } = format;

export const errorReponse: FormatWrap = format((info: TransformableInfo): TransformableInfo | boolean => {
  const {
    query,
    body,
    stack,
    ...rest
  } = (info.response || {}) as any;
  delete info.response;
  info.query = (query && querystring.stringify(query)) || '';
  info.body = (body && stringify(body)) || '';
  info.stack = stack || '';
  info.remainedInfo = (!isEmpty(rest) && stringify(rest)) || '';
  info.durationMs = info.durationMs || -1;
  info.trackId = info.trackId || '';
  info.user = info.user || 'ananymity';
  return info;
});

export const fullFormats = combine(timestamp(), errorReponse(), json());
