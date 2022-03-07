import { ComponentOption, CircleLayoutOptionMixin } from '../../util/types';
import ComponentModel from '../../model/Component';
import Polar from './Polar';
import { AngleAxisModel, RadiusAxisModel } from './AxisModel';

export interface PolarOption extends ComponentOption, CircleLayoutOptionMixin {
  mainType?: 'polar';
}

class PolarModel extends ComponentModel<PolarOption> {
  static type = 'polar' as const;
  type = PolarModel.type;

  static dependencies = ['radiusAxis', 'angleAxis'];

  coordinateSystem: Polar;

  findAxisModel(axisType: 'angleAxis'): AngleAxisModel
  findAxisModel(axisType: 'radiusAxis'): RadiusAxisModel
  findAxisModel(axisType: 'angleAxis' | 'radiusAxis'): AngleAxisModel | RadiusAxisModel {
    let foundAxisModel;
    const ecModel = this.ecModel;

    ecModel.eachComponent(axisType, function (this: PolarModel, axisModel: AngleAxisModel | RadiusAxisModel) {
      if (axisModel.getCoordSysModel() === this) {
        foundAxisModel = axisModel;
      }
    }, this);
    return foundAxisModel;
  }

  static defaultOption: PolarOption = {

    // zlevel: 0,

    z: 0,

    center: ['50%', '50%'],

    radius: '80%'
  };
}

export default PolarModel;