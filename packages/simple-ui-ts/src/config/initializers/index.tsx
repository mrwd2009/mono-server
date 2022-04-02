import { memo, FC } from 'react';
import * as axios from './axios';
import * as dayjs from './dayjs';
import * as echarts from './echarts';
import * as i18n from './i18n';

export const useInitializer = () => {
  axios.useInitializer();
  dayjs.useInitializer();
  echarts.useInitializer();
  i18n.useInitializer();
};

export const Initializer: FC = () => {
  useInitializer();
  return null;
};

export { axios, dayjs };

export default memo(Initializer);
