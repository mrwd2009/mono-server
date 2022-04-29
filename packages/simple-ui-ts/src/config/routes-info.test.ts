import { getRouteInfo, getRoutesMenu, getRouteBC, getRouteInfoByPath, forEachRouteInfo } from './routes-info';

test('get route info', () => {
  const routes = [
    {
      key: 'forgot-password',
      path: '/forgot-password/new',
      menu: false,
    },
    {
      key: 'reset-password',
      path: '/reset-password',
      menu: false,
      children: [
        {
          key: 'test',
          path: '/test',
          menu: false,
          children: [
            {
              key: 'test2',
              path: '/test2',
              menu: false,
            },
          ],
        },
      ],
    },
  ];

  expect(getRouteInfo('forgot-password', routes)).toEqual({
    key: 'forgot-password',
    path: '/forgot-password/new',
    menu: false,
  });

  expect(getRouteInfo(['forgot-password'], routes)).toEqual({
    key: 'forgot-password',
    path: '/forgot-password/new',
    menu: false,
  });

  expect(getRouteInfo(['reset-password', 'test'], routes)).toMatchObject({
    key: 'test',
    path: '/test',
    menu: false,
  });
});

test('get routes menu', () => {
  const routes = [
    {
      key: 'forgot-password',
      path: '/forgot-password/new',
      menu: false,
    },
    {
      title: 'rest pass',
      key: 'reset-password',
      path: '/reset-password',
      menu: true,
      children: [
        {
          title: 'test',
          key: 'test',
          path: '/test',
          menu: true,
          children: [
            {
              key: 'test2',
              path: '/test2',
              menu: false,
            },
          ],
        },
      ],
    },
  ];

  expect(getRoutesMenu(routes)).toMatchObject([
    {
      title: 'rest pass',
      key: 'reset-password',
      path: '/reset-password',
      children: [
        {
          title: 'test',
          key: 'test',
          path: '/test',
        },
      ],
    },
  ]);
});

test('get route bc', () => {
  const routes = [
    {
      title: 'rest pass',
      key: 'reset-password',
      path: '/reset-password',
      menu: true,
      children: [
        {
          title: 'test',
          key: 'test',
          path: '/reset-password/test',
          menu: true,
          children: [
            {
              key: 'test2',
              path: '/reset-password/test/test2',
              menu: false,
            },
          ],
        },
      ],
    },
  ];

  expect(getRouteBC('/reset-password/test', routes)).toMatchObject([
    {
      title: 'rest pass',
      key: 'reset-password',
      path: '/reset-password',
    },
    {
      title: 'test',
      key: 'test',
      path: '/reset-password/test',
    },
  ]);
});

test('get route by path', () => {
  const routes = [
    {
      key: 'forgot-password',
      path: '/forgot-password/new',
      menu: false,
    },
    {
      key: 'reset-password',
      path: '/reset-password',
      menu: false,
      children: [
        {
          key: 'test',
          path: '/test',
          menu: false,
          children: [
            {
              key: 'test2',
              path: '/test2',
              menu: false,
            },
          ],
        },
      ],
    },
  ];

  expect(getRouteInfoByPath('/test2', routes)).toEqual({
    key: 'test2',
    path: '/test2',
    menu: false,
  });
});

test('test for each route info', () => {
  const routes = [
    {
      key: 'forgot-password',
      path: '/forgot-password/new',
      menu: false,
    },
    {
      key: 'reset-password',
      path: '/reset-password',
      menu: false,
      children: [
        {
          key: 'test',
          path: '/test',
          menu: false,
          children: [
            {
              key: 'test2',
              path: '/test2',
              menu: false,
            },
          ],
        },
      ],
    },
  ];
  forEachRouteInfo((item) => {
    console.log(item.path);
  }, routes);
});
