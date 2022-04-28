import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';

interface UserInfo {
  permissions: string[];
  user: string;
  username: string;
}

const initialState: UserInfo = {
  permissions: [],
  user: '',
  username: '',
};

export const userInfoSlice = createSlice({
  name: 'auth/user-info',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload.user;
      state.username = action.payload.username;
      state.permissions = action.payload.permissions;
    },
    clearUserInfo: (state) => {
      state.user = '';
      state.username = '';
      state.permissions = [];
    },
  },
});

export const { updateUserInfo, clearUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: AppRootState) => state.userInfo;

export const userInfoReducer = userInfoSlice.reducer;

export default userInfoReducer;
