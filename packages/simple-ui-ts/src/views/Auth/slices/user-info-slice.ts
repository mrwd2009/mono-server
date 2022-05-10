import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';

interface UserInfo {
  permissions: string[];
  user: string;
  username: string;
  profileEditable: boolean;
}

interface Avatar {
  loading: boolean;
  url?: string;
  base64?: string;
}

const initialState: UserInfo & { avatar: Avatar } = {
  permissions: [],
  user: '',
  username: '',
  profileEditable: false,
  avatar: {
    loading: false,
  },
};

export const userInfoSlice = createSlice({
  name: 'auth/user-info',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload.user;
      state.username = action.payload.username;
      state.permissions = action.payload.permissions;
      state.profileEditable = action.payload.profileEditable;
    },
    clearUserInfo: (state) => {
      state.user = '';
      state.username = '';
      state.permissions = [];
      state.profileEditable = false;
      state.avatar = {
        loading: false,
      };
    },
    updateAvatar: (state, action: PayloadAction<Avatar>) => {
      state.avatar = action.payload;
    },
  },
});

export const { updateUserInfo, clearUserInfo, updateAvatar } = userInfoSlice.actions;

export const selectUserInfo = (state: AppRootState) => state.userInfo;
export const selectPermissions = (state: AppRootState) => state.userInfo.permissions;
export const selectAvatar = (state: AppRootState) => state.userInfo.avatar;

export const userInfoReducer = userInfoSlice.reducer;

export default userInfoReducer;
