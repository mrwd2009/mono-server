import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../store';

type ThemeType = 'dark' | 'default' | 'auto';
type LangType = 'en-US';
interface VisitedPage {
  pathname: string;
  search: string;
}
interface GlobalSetting {
  theme: ThemeType;
  lang: LangType;
  visitedPages: VisitedPage[];
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

const maxVisitedPages = 5;

const initialState: GlobalSetting = {
  theme: defaultTheme as ThemeType,
  lang: defaultLang as LangType,
  visitedPages: [{
    pathname: window.location.pathname,
    search: window.location.search,
  }],
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
    pushVisitedPage: (state, action: PayloadAction<VisitedPage>) => {
      state.visitedPages.push(action.payload);
      if (state.visitedPages.length > maxVisitedPages) {
        state.visitedPages.shift();
      }
    },
  },
});

export const { applyDarkTheme, applyDefaultTheme, changeLang, pushVisitedPage } = globalSettingSlice.actions;

export const selectDarkMode = (state: AppRootState) => state.globalSetting.theme === 'dark';
export const selectTheme = (state: AppRootState) => state.globalSetting.theme;

export const selectLang = (state: AppRootState) => state.globalSetting.lang;

export const selectVisitedPages = (state: AppRootState) => state.globalSetting.visitedPages;

export const globalSettingReducer = globalSettingSlice.reducer;

export default globalSettingReducer;
