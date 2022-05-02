const NODE_ENV = process.env.NODE_ENV;

let baseURL = '';
if (NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_PROD_API_URL || '';
  if (!baseURL) {
    throw new Error('Please provide REACT_APP_PROD_API_URL in production.');
  }
} else {
  const DEV_API_PORT = process.env.REACT_APP_DEV_API_PORT || '4100';
  const DEV_API_SCHEME = process.env.REACT_APP_DEV_API_SCHEME || 'http://';
  baseURL = `${DEV_API_SCHEME}localhost:${DEV_API_PORT}/api/`;
}

export { baseURL };

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  system: {
    info: '/system/info',
    userList: '/system/user/list',
    addUser: '/system/user',
    editUser: '/system/user',
    deleteUser: '/system/user',
    availableRoles: '/system/available-roles',
    userHistoryList: '/system/user/history/list',
    permissionList: '/system/permissions',
    createPermission: '/system/permission',
    updatePermission: '/system/permission',
    deletePermission: '/system/permission',
    reparentPermission: '/system/permission/reparent',
    roleList: '/system/roles',
    createRole: '/system/role',
    updateRole: '/system/role',
    deleteRole: '/system/role',
    reparentRole: '/system/role/reparent',
    assignedPermissionList: '/system/role/assigned-permissions',
    assignPermissions: '/system/role/assigned-permissions',
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
    reparentTreeNode: '/contract/tree/node/reparent',
    saveResuableNode: '/contract/tree/node/reusable',
  },
};

export default apiEndpoints;
