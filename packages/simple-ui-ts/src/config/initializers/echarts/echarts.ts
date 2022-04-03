import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption, LineChart, LineSeriesOption, PieChart, PieSeriesOption } from 'echarts/charts';
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  ToolboxComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  TooltipComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import darkTheme from './theme-dark';
import defaultTheme from './theme-default';

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | LegendComponentOption
  | ToolboxComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | DataZoomComponentOption
  | GridComponentOption
>;

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  SVGRenderer,
  GridComponent,
]);

echarts.registerTheme('dark', darkTheme);
echarts.registerTheme('default', defaultTheme);

export const useInitializer = () => {};

export default echarts;
