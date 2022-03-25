import _ from 'lodash';
import { ChargeTypeModelDef } from '.././../../model/types';

export const getChargeTypeList = async ({ ChargeType }: { ChargeType: ChargeTypeModelDef }) => {
  const list = await ChargeType.findAll({
    attributes: ['Charge_Type'],
    order: [['Charge_Type', 'asc']],
    raw: true,
  });

  const charges = _.map(list, 'Charge_Type');
  const generalIndex = _.indexOf(charges, 'general');
  if (generalIndex !== -1) {
    charges[generalIndex] = charges[0];
    charges[0] = 'general';
  }

  return charges;
}