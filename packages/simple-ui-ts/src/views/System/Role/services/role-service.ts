import map from 'lodash/map';
import concat from 'lodash/concat';
import roleApi, { roleServiceId } from './service';
import apiEndpoints from '../../../../config/api-endpoints';

interface RoleItem {
  key: number;
  title: string;
  data: any;
  children?: RoleItem[];
}

export interface RoleList {
  keys: Array<number>;
  roots: Array<RoleItem>;
}

export interface AssignedPermissions {
  checkedKeys: Array<number>;
  roots: Array<RoleItem>;
}

interface CreateParams {
  targetId: number;
  position: string;
  enabled: boolean;
  name: string;
  description: string;
}

interface UpdateParams {
  id: number;
  enabled?: boolean;
  name?: string;
  description?: string;
}

interface ReparentParams {
  sourceId: number;
  targetId: number;
  position: string;
}

interface AssignedParams {
  id: number;
  permissionIds: number[];
}

const enhancedRoleApi = roleApi.injectEndpoints({
  endpoints: (build) => ({
    getRoleList: build.query<RoleList, void>({
      query: () => ({
        url: apiEndpoints.system.roleList,
      }),
      providesTags: (result) => {
        const tag = [{ type: roleServiceId, id: -1 }];
        if (!result) {
          return tag;
        }
        return concat(
          map(result.keys, (id) => ({ type: roleServiceId, id })),
          tag,
        );
      },
    }),
    getAssignedPermissions: build.query<AssignedPermissions, number>({
      query: (id) => ({
        url: apiEndpoints.system.assignedPermissionList,
        params: {
          id,
        },
      }),
      providesTags: [{ type: roleServiceId, id: -2 }],
    }),
    assignPermissions: build.mutation<boolean, AssignedParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.assignPermissions,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: [{ type: roleServiceId, id: -2 }],
    }),
    createRole: build.mutation<number, CreateParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.createRole,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [{ type: roleServiceId, id: -1 }],
    }),
    reparentRole: build.mutation<boolean, ReparentParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.reparentRole,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: [{ type: roleServiceId, id: -1 }],
    }),
    updateRole: build.mutation<boolean, UpdateParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.updateRole,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        return [{ type: roleServiceId, id }];
      },
    }),
    deleteRole: build.mutation<boolean, number>({
      query: (id) => {
        return {
          url: apiEndpoints.system.deleteRole,
          method: 'DELETE',
          params: {
            id,
          },
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: roleServiceId, id }];
      },
    }),
  }),
});

export const {
  useGetRoleListQuery,
  useCreateRoleMutation,
  useReparentRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useLazyGetAssignedPermissionsQuery,
  useAssignPermissionsMutation,
} = enhancedRoleApi;
