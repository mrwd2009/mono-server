import { useCallback } from 'react';
import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import useAppSelector from './useAppSelector';
import useMounted from './useMounted';
import useMergedState from './useMergedState';
import useAppDisatch from './useAppDispatch';
import { changeLang, selectLang } from '../store/slices';

const loadedLang: any = {};

const useLang = () => {
  const [state, setState] = useMergedState({
    loaded: false,
    loading: false,
    i18n: null,
  });
  const {
    loaded,
    loading,
    i18n,
  } = state;
  const lang = useAppSelector(selectLang);
  const isMounted = useMounted();
  const dispatch = useAppDisatch();

  const fetchLang = useCallback(
    (locale: string) => {
      if (loadedLang[locale]) {
        setState({
          i18n: loadedLang[locale],
        });
        dispatch(changeLang(locale as any));
        return;
      }
      setState({
        loading: true,
      });
      let request: any;
      // todo add other locale
      request = import('../locales/en-US');

      request
      .then((res: any) => {
        if (isMounted.current) {
          const newI18next = i18next.createInstance();
          newI18next.use(initReactI18next);
          return newI18next.init({
            lng: locale,
            resources: {
              [locale]: res.default,
            },
          })
            .then(() => newI18next)
        }
      })
      .then((newI18next: any) => {
        if (isMounted.current) {
          loadedLang[locale] = newI18next;
          setState({
            loading: false,
            loaded: true,
            i18n: newI18next,
          });
          dispatch(changeLang(locale as any));
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setState({ loading: false });
        }
      });
    },
    [isMounted, dispatch, setState],
  );

  return {
    loading,
    loaded,
    i18n,
    lang,
    fetchLang,
  };
};

export default useLang;
