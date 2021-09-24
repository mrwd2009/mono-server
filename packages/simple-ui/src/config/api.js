const api = {
  system: {
    info: '/api/system/info',
  },
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgot: '/api/auth/forgotPassword',
    reset: '/api/auth/resetPassword',
    logout: '/api/auth/logout',
  },
  service: {
    list: '/api/deployment-server/service/list',
    create: '/api/deployment-server/service',
    assign: '/api/deployment-server/service/assign',
    agentList: '/api/deployment-server/service/agent-list',
  },
  agent: {
    list: '/api/deployment-server/agent/list',
    create: '/api/deployment-server/agent',
  },
  deployment: {
    list: '/api/deployment-server/log/list',
  },
};

export default api;