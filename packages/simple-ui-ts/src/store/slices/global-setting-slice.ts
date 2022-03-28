import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../store';

type ThemeType = 'dark' | 'default' | 'auto';
interface GlobalSetting {
  theme: ThemeType;
}

const themeItemKey = 'app-ex-theme';
let defaultTheme: string = localStorage.getItem(themeItemKey)!;
if (!defaultTheme) {
  defaultTheme = 'auto';
}

const initialState: GlobalSetting = {
  theme: defaultTheme as ThemeType,
};

export const globalSettingSlice = createSlice({
  name: 'global/setting',
  initialState,
  reducers: {
    applyDarkTheme: (state, action: PayloadAction<boolean>) => {
      // auto dark theme
      if (action.payload) {
        state.theme = 'auto';
        localStorage.removeItem(themeItemKey);
      } else {
        state.theme = 'dark';
        localStorage.setItem(themeItemKey, 'dark');
      }
    },
    applyDefaultTheme: (state, action: PayloadAction<boolean>) => {
      // auto light theme
      if (action.payload) {
        state.theme = 'auto';
        localStorage.removeItem(themeItemKey);
      } else {
        state.theme = 'default';
        localStorage.setItem(themeItemKey, 'default');
      }
    },
  },
});

export const { applyDarkTheme, applyDefaultTheme } = globalSettingSlice.actions;

export const selectDarkMode = (state: AppRootState) => state.globalSetting.theme === 'dark';
export const selectTheme = (state: AppRootState) => state.globalSetting.theme;

export const globalSettingReducer = globalSettingSlice.reducer;

export default globalSettingReducer;
