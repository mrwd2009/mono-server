import ExtensionAPI from "../core/ExtensionAPI";
import GlobalModel from '../model/Global';
import { createOrUpdatePatternFromDecal } from '../util/decal';

export default function decalVisual(ecModel: GlobalModel, api: ExtensionAPI) {
  ecModel.eachRawSeries(seriesModel => {
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }

    const data = seriesModel.getData();

    if (data.hasItemVisual()) {
      data.each(idx => {
        const decal = data.getItemVisual(idx, 'decal');
        if (decal) {
          const itemStyle = data.ensureUniqueItemVisual(idx, 'style');
          itemStyle.decal = createOrUpdatePatternFromDecal(decal, api);
        }
      });
    }
    const decal = data.getVisual('decal');
    if (decal) {
      const style = data.getVisual('style');
      style.decal = createOrUpdatePatternFromDecal(decal, api);
    }
  });
}