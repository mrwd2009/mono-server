import { userInfoReducer } from '../views/Auth/slices';
import { globalSettingReducer } from './slices/global-setting-slice';
import { contractListReducer } from '../views/Contract/slices';

const reducer = {
  userInfo: userInfoReducer,
  globalSetting: globalSettingReducer,
  contractList: contractListReducer,
};

export default reducer;
