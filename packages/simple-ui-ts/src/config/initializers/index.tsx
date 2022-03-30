import { memo, FC } from 'react';
import * as axios from './axios';
import * as dayjs from './dayjs';
import * as echarts from './echarts';

export const useInitializer = () => {
  axios.useInitializer();
  dayjs.useInitializer();
  echarts.useInitializer();
};

export const Initializer: FC = () => {
  useInitializer();
  return null;
};

export { axios, dayjs };

export default memo(Initializer);
