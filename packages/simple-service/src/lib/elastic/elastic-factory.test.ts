import 'dotenv/config';
import ElasticFactory from './elastic-factory';

test('query a simple log from elasticsearch', async () => {
  const elastic = new ElasticFactory({
    host: process.env.APP_ELASTIC_HOST!,
    username: process.env.APP_ELASTIC_USERNAME!,
    password: process.env.APP_ELASTIC_PASSWORD!,
  });

  const data = await elastic.search('rule-engine-modeling-ui-2022*', {
    size: 2,
    query: {
      match_all: {},
    },
    sort: [
      {
        timestamp: {
          order: 'desc',
        },
      },
    ],
    fields: [
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
    ],
    _source: false,
  });

  const data2 = await elastic.count('rule-engine-modeling-ui-2022*', {
    query: {
      match: {
        message: 'GET/api/system/info',
      },
    },
    // sort: [
    //   {
    //     timestamp: {
    //       order: 'desc',
    //     },
    //   },
    // ],
  });

  const data2_1 = await elastic.count('rule-engine-modeling-ui-2022*', {
    query: {
      multi_match: {
        query: 'GET/api/system/info',
        fields: ['message', 'logUser'],
        // logUser: 'jian@cfexcloud.com',
      },
    },
    // sort: [
    //   {
    //     timestamp: {
    //       order: 'desc',
    //     },
    //   },
    // ],
  });

  const data2_2 = await elastic.count('rule-engine-modeling-ui-2022*', {
    // "sort": [
    //   {
    //     "timestamp": {
    //       "order": "desc"
    //     }
    //   }
    // ],
    query: {
      match_all: {},
    },
  });

  // console.log(data2_2, '-----')

  // const data3 = await elastic.count('rule-engine-modeling-ui-2022*', {
  //   query: {
  //     term: {
  //       trackId: '6164b666-4550-4555-be7b-8a21c4882068',
  //       // message: 'GET/api/system/info',
  //     },
  //   },
  //   // sort: [
  //   //   {
  //   //     timestamp: {
  //   //       order: 'desc',
  //   //     },
  //   //   },
  //   // ],
  // });

  const data3_1 = await elastic.search('rule-engine-modeling-ui-2022*', {
    size: 2,
    query: {
      bool: {
        filter: [
          {
            term: {
              nodeEnv: 'development',
            },
          },
          // {
          //   term: {
          //     message: 'GET/api/system/info',
          //   }
          // },
          {
            match: {
              logUser: 'jian@cfexcloud.com',
            },
          },
          {
            multi_match: {
              query: 'pageSize',
            },
          },
          {
            range: {
              durationMs: {
                gte: 20,
              },
            },
          },
          {
            range: {
              timestamp: {
                gte: '2022-05-21T08:52:38.655Z',
              },
            },
          },
        ],
      },
    },
  });

  console.log(JSON.stringify(data, null, 2), JSON.stringify(data2, null, 2));

  // const data4 = await elastic.search('rule-engine-modeling-ui-2022*', {
  //   size: 2,
  //   query: {
  //     term: {
  //       // nodeEnv: 'development',
  //       trackId: '92c256c2-3878-418a-a6b5-c85be42a9a80',
  //       // trackId: '6164b666-4550-4555-be7b-8a21c4882068',
  //       // message: 'GET/api/system/info',
  //     },
  //   },
  //   // sort: [
  //   //   {
  //   //     timestamp: {
  //   //       order: 'desc',
  //   //     },
  //   //   },
  //   // ],
  // });

  // console.log(JSON.stringify(data, null, 2));
});
