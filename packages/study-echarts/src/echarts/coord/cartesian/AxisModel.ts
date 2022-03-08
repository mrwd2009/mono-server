import * as zrUtil from 'zrender/src/core/util';
import ComponentModel from '../../model/Component';
import { AxisModelExtendedInCreator } from '../axisModelCreator';
import { AxisModelCommonMixin } from '../axisModelCommonMixin';
import Axis2D from './Axis2D';
import { AxisBaseOption } from '../axisCommonTypes';
import GridModel from './GridModel';
import { AxisBaseModel } from '../AxisBaseModel';
import { OrdinalSortInfo } from '../../util/types';
import { SINGLE_REFERRING } from '../../util/model';

export type CartesianAxisPosition = 'top' | 'bottom' | 'left' | 'right';

export type CartesianAxisOption = AxisBaseOption & {
  gridIndex?: number;
  gridId?: string;
  position?: CartesianAxisPosition;
  // Offset is for multiple axis on the same position.
  offset?: number;
  categorySortInfo?: OrdinalSortInfo;
};

export type XAXisOption = CartesianAxisOption & {
  mainType?: 'xAxis'
};
export type YAXisOption = CartesianAxisOption & {
  mainType?: 'yAxis'
};

export class CartesianAxisModel extends ComponentModel<CartesianAxisOption>
  implements AxisBaseModel<CartesianAxisOption> {

  static type = 'cartesian2dAxis';

  axis: Axis2D;

  getCoordSysModel(): GridModel {
    return this.getReferringComponents('grid', SINGLE_REFERRING).models[0] as GridModel;
  }

}

export interface CartesianAxisModel extends AxisModelCommonMixin<CartesianAxisOption>,
  AxisModelExtendedInCreator { }

zrUtil.mixin(CartesianAxisModel, AxisModelCommonMixin);

export default CartesianAxisModel;
