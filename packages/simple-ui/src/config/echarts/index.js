import React, { forwardRef } from 'react';
import EchartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
} from 'echarts/charts';
import {
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  GridComponent,
} from 'echarts/components';
import {
  SVGRenderer,
} from 'echarts/renderers';

import { theme } from './theme';

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

echarts.registerTheme('billing', theme);

// export the Component the echarts Object.
const ReactEacharts = (props, ref) => {
  return <EchartsReactCore ref={ref} echarts={echarts} {...props} />;
};
export default forwardRef(ReactEacharts);