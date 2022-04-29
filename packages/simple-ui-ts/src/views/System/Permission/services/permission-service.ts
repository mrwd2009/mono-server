import map from 'lodash/map';
import concat from 'lodash/concat';
import permissionApi, { permissionServiceId } from './service';
import apiEndpoints from '../../../../config/api-endpoints';

interface PermissionItem {
  key: number;
  title: string;
  data: any;
  children?: PermissionItem[];
}

export interface PermissionList {
  keys: Array<number>;
  roots: Array<PermissionItem>;
}

interface CreateParams {
  targetId: number;
  position: string;
  type: string;
  name: string;
  description: string;
}

interface UpdateParams {
  id: number;
  type?: string;
  name?: string;
  description?: string;
}

interface ReparentParams {
  sourceId: number;
  targetId: number;
  position: string;
}

const enhancedPermissionApi = permissionApi.injectEndpoints({
  endpoints: (build) => ({
    getPermissionList: build.query<PermissionList, void>({
      query: () => ({
        url: apiEndpoints.system.permissionList,
      }),
      providesTags: (result) => {
        const tag = [{ type: permissionServiceId, id: -1 }];
        if (!result) {
          return tag;
        }
        return concat(
          map(result.keys, (id) => ({ type: permissionServiceId, id })),
          tag,
        );
      },
    }),
    createPermission: build.mutation<number, CreateParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.createPermission,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [{ type: permissionServiceId, id: -1 }],
    }),
    reparentPermission: build.mutation<boolean, ReparentParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.reparentPermission,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: [{ type: permissionServiceId, id: -1 }],
    }),
    updatePermission: build.mutation<boolean, UpdateParams>({
      query: (data) => {
        return {
          url: apiEndpoints.system.updatePermission,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        return [{ type: permissionServiceId, id }];
      },
    }),
    deletePermission: build.mutation<boolean, number>({
      query: (id) => {
        return {
          url: apiEndpoints.system.deletePermission,
          method: 'DELETE',
          params: {
            id,
          },
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: permissionServiceId, id }];
      },
    }),
  }),
});

export const {
  useGetPermissionListQuery,
  useCreatePermissionMutation,
  useReparentPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = enhancedPermissionApi;
