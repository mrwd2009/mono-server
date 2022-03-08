import ComponentModel from '../../model/Component';
import { ComponentOption, BoxLayoutOptionMixin, ZRColor, ShadowOptionMixin } from '../../util/types';
import Grid from './Grid';
import { CoordinateSystemHostModel } from '../CoordinateSystem';

export interface GridOption extends ComponentOption, BoxLayoutOptionMixin, ShadowOptionMixin {
  mainType?: 'grid';

  show?: boolean;

  // Whether grid size contain label.
  containLabel?: boolean;

  backgroundColor?: ZRColor;
  borderWidth?: number;
  borderColor?: ZRColor;

  tooltip?: any; // FIXME:TS add this tooltip type
}

class GridModel extends ComponentModel<GridOption> implements CoordinateSystemHostModel {

  static type = 'grid';

  static dependencies = ['xAxis', 'yAxis'];

  static layoutMode = 'box' as const;

  coordinateSystem: Grid;

  static defaultOption: GridOption = {
    show: false,
    // zlevel: 0,
    z: 0,
    left: '10%',
    top: 60,
    right: '10%',
    bottom: 70,
    // If grid size contain label
    containLabel: false,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#ccc'
  };
}

export default GridModel;