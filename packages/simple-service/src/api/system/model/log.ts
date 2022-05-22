import _ from 'lodash';
import { mainElastic } from '../../../lib/elastic';
import config from '../../../config/config';

interface LogParams {
  filter: {
    type: 'exception' | 'error' | 'info' | 'queue';
    search?: string;
    trackId?: string;
    message?: string;
    logUser?: string;
    durationMs?: Array<number | null>;
    timestamp?: Array<string | null>;
  };
  pagination: {
    current: number;
    pageSize: number;
  };
  sorter?: {
    field: string;
    order: string;
  };
}

export const getLogs = async (params: LogParams) => {
  const { filter, pagination, sorter } = params;
  const query: any = {};

  if (sorter) {
    query.sort = [
      {
        [sorter.field]: {
          order: sorter.order.toLowerCase(),
        },
      },
    ];
  }
  const from = (pagination.current - 1) * pagination.pageSize;
  const size = pagination.pageSize;
  const fields = [
    'nodeEnv',
    'appEnv',
    'trackId',
    'level',
    'logUser',
    'exception',
    'durationMs',
    'message',
    'query',
    'body',
    'stack',
    'remainedInfo',
    'timestamp',
  ];
  const _source = false;
  const filterArray: any = [];
  query.query = {
    bool: {
      filter: filterArray,
    },
  };

  if (filter.search) {
    filterArray.push({
      multi_match: {
        query: filter.search,
      },
    });
  }

  if (filter.logUser) {
    filterArray.push({
      term: {
        logUser: filter.logUser,
      },
    });
  }

  if (filter.message) {
    filterArray.push({
      term: {
        message: filter.message,
      },
    });
  }

  if (filter.trackId) {
    filterArray.push({
      term: {
        trackId: filter.trackId,
      },
    });
  }

  if (filter.durationMs) {
    const durationRange: any = {};
    if (filter.durationMs[0]) {
      durationRange.gte = filter.durationMs[0];
    }
    if (filter.durationMs[1]) {
      durationRange.lte = filter.durationMs[1];
    }
    filterArray.push({
      range: {
        durationMs: durationRange,
      },
    });
  }

  if (filter.timestamp) {
    const timestampRange: any = {};
    if (filter.timestamp[0]) {
      timestampRange.gte = filter.timestamp[0];
    }
    if (filter.timestamp[1]) {
      timestampRange.lte = filter.timestamp[1];
    }
    filterArray.push({
      range: {
        timestamp: timestampRange,
      },
    });
  }

  if (filter.type === 'exception') {
    filterArray.push({
      term: {
        exception: true,
      },
    });
  }

  if (filter.type === 'error') {
    filterArray.push({
      term: {
        exception: false,
      },
    });
    filterArray.push({
      term: {
        level: 'error',
      },
    });
  }

  if (filter.type === 'info') {
    filterArray.push({
      term: {
        exception: false,
      },
    });
    filterArray.push({
      term: {
        level: 'info',
      },
    });
  }

  if (filter.type === 'queue') {
    filterArray.push({
      term: {
        appEnv: 'queue',
      },
    });
  }

  if (filter.logUser) {
    filterArray.push({
      term: {
        logUser: filter.logUser,
      },
    });
  }

  const index = `${config.logger.elastic.templateName}-${new Date().getFullYear()}*`;
  const [listRes, countRes] = await Promise.all([
    mainElastic.search(index, {
      ...query,
      fields,
      _source,
      from,
      size,
    }),
    mainElastic.count(index, {
      query: query.query,
    }),
  ]);

  const list = _.map(listRes.hits.hits, (item) => {
    return {
      id: item._id,
      logUser: item.fields.logUser[0],
      trackId: item.fields.trackId[0],
      durationMs: item.fields.durationMs[0],
      message: item.fields.message[0],
      query: item.fields.query[0],
      body: item.fields.body[0],
      stack: item.fields.stack[0],
      remainedInfo: item.fields.remainedInfo[0],
      timestamp: item.fields.timestamp[0],
    };
  });
  return {
    total: countRes.count,
    list,
  };
};
