import { createAppApi } from '../../../../store/helper';

export const roleServiceId = 'system/role';

const roleApi = createAppApi(roleServiceId);

export default roleApi;
