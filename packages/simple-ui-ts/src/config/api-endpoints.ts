const NODE_ENV = process.env.NODE_ENV;

let baseURL = '';
if (NODE_ENV === 'production') {
  baseURL = process.env.PROD_API_URL || '';
  if (!baseURL) {
    throw new Error('Please provide PROD_API_URL in production.');
  }
} else {
  const DEV_API_PORT = process.env.DEV_API_PORT || '4100';
  const DEV_API_SCHEME = process.env.DEV_API_SCHEME || 'http://';
  baseURL = `${DEV_API_SCHEME}localhost:${DEV_API_PORT}/api/`;
}

export { baseURL };

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  system: {
    info: '/system/info',
  },
  contract: {
    list: '/contract/list',
    savedNodes: '/contract/saved-list',
    tree: '/contract/tree',
    deleteTree: '/contract/tree',
    treeVersionList: '/contract/tree/version-list',
    treeNode: '/contract/tree/node',
    updateNodeBasic: '/contract/tree/node',
    deleteNode: '/contract/tree/node',
    createNode: '/contract/tree/node',
  },
};

export default apiEndpoints;
