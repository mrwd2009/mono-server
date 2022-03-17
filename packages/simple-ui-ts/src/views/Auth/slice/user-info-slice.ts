import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';

interface UserInfo {
  permissions: string[],
  user: string;
}

const initialState: UserInfo = {
  permissions: [],
  user: '',
};

export const userInfoSlice = createSlice({
  name: 'auth/user-info',
  initialState,
  reducers: {
    updateUserInfo: (state, payload: PayloadAction<UserInfo>) => {
      state.user = payload.payload.user;
      state.permissions = payload.payload.permissions;
    },
    clearUserInfo: (state) => {
      state.user = '';
      state.permissions = [];
    },
  },
});

export const {
  updateUserInfo,
  clearUserInfo,
} = userInfoSlice.actions;

export const selectUserInfo = (state: AppRootState) => state.userInfo;

export const userInfoReducer = userInfoSlice.reducer;

export default userInfoReducer;