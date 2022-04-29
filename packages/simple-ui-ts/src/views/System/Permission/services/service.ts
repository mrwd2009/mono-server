import { createAppApi } from '../../../../store/helper';

export const permissionServiceId = 'system/permission';

const permissionApi = createAppApi(permissionServiceId);

export default permissionApi;
