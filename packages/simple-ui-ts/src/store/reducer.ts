import { userInfoReducer } from '../views/Auth/slices';
import { globalSettingReducer } from './slices/global-setting-slice';

const reducer = {
  userInfo: userInfoReducer,
  globalSetting: globalSettingReducer,
};

export default reducer;
