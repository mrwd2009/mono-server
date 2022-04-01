import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../store';

type ThemeType = 'dark' | 'default' | 'auto';
type LangType = 'en-US';
interface GlobalSetting {
  theme: ThemeType;
  lang: LangType;
}

const themeItemKey = 'app-ex-theme';
let defaultTheme: string = localStorage.getItem(themeItemKey)!;
if (!defaultTheme) {
  defaultTheme = 'auto';
}

const langItemKey = 'app-ex-lang';
let defaultLang: string = localStorage.getItem(langItemKey)!;
if (!defaultLang) {
  defaultLang = 'en-US';
}

const initialState: GlobalSetting = {
  theme: defaultTheme as ThemeType,
  lang: defaultLang as LangType,
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
    changeLang: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
      localStorage.setItem(langItemKey, action.payload);
    },
  },
});

export const { applyDarkTheme, applyDefaultTheme, changeLang } = globalSettingSlice.actions;

export const selectDarkMode = (state: AppRootState) => state.globalSetting.theme === 'dark';
export const selectTheme = (state: AppRootState) => state.globalSetting.theme;

export const selectLang = (state: AppRootState) => state.globalSetting.lang;

export const globalSettingReducer = globalSettingSlice.reducer;

export default globalSettingReducer;
