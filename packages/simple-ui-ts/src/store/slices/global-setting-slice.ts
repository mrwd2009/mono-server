import { createSlice } from '@reduxjs/toolkit';
import type { AppRootState } from '../store';

type ThemeType = 'dark' | 'default';
interface GlobalSetting {
  theme: ThemeType;
}

const themeItemKey = 'app-ex-theme';
let defaultTheme: string = localStorage.getItem(themeItemKey)!;
if (!defaultTheme) {
  // system supports dark mode
  if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    defaultTheme = 'dark';
  } else {
    defaultTheme = 'default';
  }
}

const initialState: GlobalSetting = {
  theme: defaultTheme as 'dark' | 'default',
};

export const globalSettingSlice = createSlice({
  name: 'global/setting',
  initialState,
  reducers: {
    applyDarkTheme: state => {
      state.theme = 'dark';
      localStorage.setItem(themeItemKey, 'dark');
    },
    applyDefaultTheme: state => {
      state.theme = 'default';
      localStorage.setItem(themeItemKey, 'default');
    },
  },
});

export const { applyDarkTheme, applyDefaultTheme } = globalSettingSlice.actions;

export const selectDarkMode = (state: AppRootState) => state.globalSetting.theme === 'dark';

export const globalSettingReducer = globalSettingSlice.reducer;

export default globalSettingReducer;
