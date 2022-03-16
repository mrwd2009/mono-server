import { getRouteInfo, getRoutesMenu } from './routes-info';

test('get route info', () => {
  const routes  = [
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
              menu: false
            }
          ]
        }
      ]
    }
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
  const routes  = [
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
              menu: false
            }
          ]
        }
      ]
    }
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
        }
      ]
    }
  ]);
});