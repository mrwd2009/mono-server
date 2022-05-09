/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'winston';
import { isEmpty } from 'lodash';
import stringify from 'safe-stable-stringify';
import querystring from 'query-string';
import { TransformableInfo, FormatWrap } from 'logform';

const { timestamp, combine, json } = format;

export const errorReponse: FormatWrap = format((info: TransformableInfo): TransformableInfo | boolean => {
  const { query, body, stack, ...rest } = (info.response || {}) as any;
  info.query = (query && querystring.stringify(query)) || '';
  info.body = (body && stringify(body)) || '';
  info.stack = stack || '';
  info.remainedInfo = (!isEmpty(rest) && stringify(rest)) || '';
  info.durationMs = info.durationMs || -1;
  info.trackId = info.trackId || '';
  info.logUser = info.user || 'ananymity';

  if (info.exception) {
    info.stack = info.message;
    info.message = '$exception';
    const remained = {
      error: info.error,
      os: info.os,
      process: info.process,
      trace: info.trace,
    };
    info.remainedInfo = stringify(remained);
    delete info.error;
    delete info.os;
    delete info.process;
    delete info.trace;
    delete info.date;
  } else {
    info.exception = false;
  }
  // be careful to add new field in 'info', we use filebeat to collect log
  delete info.response;
  delete info.user;
  return info;
});

export const fullFormats = combine(timestamp(), errorReponse(), json());
