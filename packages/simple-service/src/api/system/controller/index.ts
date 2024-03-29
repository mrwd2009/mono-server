import { Middleware } from '@koa/router';
import { systemModel, userModel, roleModel, permissionModel, oauth2UserModel, logModel } from '../model';
import config from '../../../config';
import { validator, validatePagination, validateEmailDomains } from '../../../middleware';

const maxStrLen = config.auth.maxStrLen;

export const getInfoHandler: Middleware = async (context) => {
  const info = await systemModel.getInfo(context.state.user, context.getRbacPermissions!);
  context.gateway!.sendJSON!(info);
};

export const getUserAvatarHandler: Middleware = async (context) => {
  const info = await userModel.getUserAvatar(context.state.user);
  context.gateway!.sendJSON!(info);
};

export const saveUserProfileHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      photo: Schema.string()
        .optional()
        .allow(null)
        .max(1024 * 1024 * 256),
      displayName: Schema.string().max(maxStrLen),
    }),
  ),
  async (context) => {
    const info = await userModel.saveUserProfile(context.mergedParams, context.state.user);
    context.gateway!.sendJSON!(info);
  },
];

export const getUserListHandler: Array<Middleware> = [
  validatePagination({
    sorter: ['created_at', 'updated_at'],
    format: {
      like: ['email'],
      in: ['enabled'],
    },
  }),
  async (context) => {
    const result = await userModel.getUserList(context.validatorFormattedData);
    context.gateway?.sendJSON?.(result);
  },
];

export const createUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email().max(maxStrLen),
      displayName: Schema.string().max(maxStrLen),
      enabled: Schema.boolean(),
      roleId: Schema.number().integer().optional(),
      password: Schema.string().max(maxStrLen),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.createUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const editUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      id: Schema.alternatives().try(Schema.array().items(Schema.number().integer()), Schema.number().integer()),
      type: Schema.string().valid('edit', 'password', 'assignRole'),
      enabled: Schema.boolean().optional(),
      roleId: Schema.number().integer().optional(),
      displayName: Schema.string().max(maxStrLen).optional(),
      password: Schema.string().max(maxStrLen).optional(),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.editUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const deleteUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      id: Schema.number().integer(),
    }),
  ),
  async (context) => {
    await userModel.deleteUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const getUserLoginHistoryListHandler: Array<Middleware> = [
  validatePagination({
    sorter: ['created_at', 'updated_at'],
    format: {
      like: ['email', 'ip'],
    },
  }),
  async (context) => {
    const result = await userModel.getUserLoginHistoryList(context.validatorFormattedData);
    context.gateway?.sendJSON?.(result);
  },
];

export const getPermissionsHandler: Middleware = async (context) => {
  const result = await permissionModel.getPermissions();
  context.gateway?.sendJSON?.(result);
};

export const createPermissionHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      targetId: Schema.number().integer(),
      position: Schema.string().valid('above', 'child', 'below'),
      type: Schema.string().valid('category', 'permission'),
      name: Schema.string(),
      description: Schema.string(),
    });
  }),
  async (context) => {
    const result = await permissionModel.createPermission(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const updatePermissionHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
      type: Schema.string().valid('category', 'permission').optional(),
      name: Schema.string().optional(),
      description: Schema.string().optional(),
    });
  }),
  async (context) => {
    const result = await permissionModel.updatePermission(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const reparentPermissionHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      targetId: Schema.number().integer(),
      sourceId: Schema.number().integer(),
      position: Schema.string().valid('above', 'child', 'below'),
    });
  }),
  async (context) => {
    const result = await permissionModel.reparentPermission(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const deletePermissionHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
    });
  }),
  async (context) => {
    const result = await permissionModel.deletePermission(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const getRolesHandler: Middleware = async (context) => {
  const result = await roleModel.getRoles();
  context.gateway?.sendJSON?.(result);
};

export const getAvailableRolesHandler: Middleware = async (context) => {
  const result = await roleModel.getAvailableRoles();
  context.gateway?.sendJSON?.(result);
};

export const createRoleHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      targetId: Schema.number().integer(),
      position: Schema.string().valid('above', 'child', 'below'),
      enabled: Schema.boolean(),
      name: Schema.string(),
      description: Schema.string(),
    });
  }),
  async (context) => {
    const result = await roleModel.createRole(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const updateRoleHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
      enabled: Schema.boolean().optional(),
      name: Schema.string().optional(),
      description: Schema.string().optional(),
    });
  }),
  async (context) => {
    const result = await roleModel.updateRole(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const reparentRoleHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      targetId: Schema.number().integer(),
      sourceId: Schema.number().integer(),
      position: Schema.string().valid('above', 'child', 'below'),
    });
  }),
  async (context) => {
    const result = await roleModel.reparentRole(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const deleteRoleHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
    });
  }),
  async (context) => {
    const result = await roleModel.deleteRole(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const getAssignedPermissionsHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
    });
  }),
  async (context) => {
    const result = await roleModel.getAssignedPermissions(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const assignPermissionsHandler: Array<Middleware> = [
  validator((Schema) => {
    return Schema.object({
      id: Schema.number().integer(),
      permissionIds: Schema.array().items(Schema.number().integer()),
    });
  }),
  async (context) => {
    const result = await roleModel.assignPermissions(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const getOAuth2UserListHandler: Array<Middleware> = [
  validatePagination({
    sorter: ['created_at', 'updated_at'],
    format: {
      like: ['email'],
      in: ['enabled'],
    },
  }),
  async (context) => {
    const result = await oauth2UserModel.getOAuth2UserList(context.validatorFormattedData);
    context.gateway?.sendJSON?.(result);
  },
];

export const editOAuth2UserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      id: Schema.alternatives().try(Schema.array().items(Schema.number().integer()), Schema.number().integer()),
      type: Schema.string().valid('edit', 'assignRole'),
      enabled: Schema.boolean().optional(),
      roleId: Schema.number().integer().optional(),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await oauth2UserModel.editOAuth2User(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const getLogsHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      filter: Schema.object({
        type: Schema.string().valid('exception', 'error', 'info', 'queue'),
        search: Schema.string().max(200).allow('').optional(),
        trackId: Schema.string().max(40).optional(),
        message: Schema.string().max(100).optional(),
        durationMs: Schema.array().items(Schema.number(), null).length(2).optional(),
        timestamp: Schema.array().items(Schema.date().iso(), null).length(2).optional(),
        logUser: Schema.string().max(50).optional(),
      }),
      pagination: Schema.object({
        current: Schema.number().integer().min(1),
        pageSize: Schema.number().integer().min(1).max(100),
      }),
      sorter: Schema.object({
        field: Schema.string().valid('timestamp'),
        order: Schema.string().valid('ASC', 'DESC'),
      }).optional(),
    }),
  ),
  async (context) => {
    const result = await logModel.getLogs(context.mergedParams);
    context.gateway!.sendJSON!(result);
  },
];
