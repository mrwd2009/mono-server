import { userInfoReducer } from '../views/Auth/slices';
import { globalSettingReducer } from './slices/global-setting-slice';
import { contractListReducer, contractTreeReducer } from '../views/Contract/slices';

const reducer = {
  userInfo: userInfoReducer,
  globalSetting: globalSettingReducer,
  contractList: contractListReducer,
  contractTree: contractTreeReducer,
};

export default reducer;
