import { useTranslation } from 'react-i18next';
import i18n from '../../util/i18n';

export const useInitializer = () => {
  const { i18n: newI18n } = useTranslation();
  i18n.updateI18n(newI18n);
};

export default i18n;
