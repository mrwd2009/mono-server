import { userInfoReducer } from '../views/Auth/slice';
import { globalSettingReducer } from './slice/global-setting-slice';

const reducer = {
  userInfo: userInfoReducer,
  globalSetting: globalSettingReducer,
};

export default reducer;