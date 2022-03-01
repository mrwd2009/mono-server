import { createHashMap } from 'zrender/src/core/util';
import { GeoSVGResource } from './GeoSVGResource';
import {
  GeoJSON,
  GeoJSONSourceInput,
  GeoResource,
  GeoSpecialAreas,
  NameMap,
  GeoSVGSourceInput
} from './geoTypes';
import { GeoJSONResource } from './GeoJSONResource';

type MapInput = GeoJSONMapInput | SVGMapInput;
interface GeoJSONMapInput {
  geoJSON: GeoJSONSourceInput;
  specialAreas: GeoSpecialAreas;
}
interface GeoJSONMapInputCompat extends GeoJSONMapInput {
  geoJson: GeoJSONSourceInput;
}
interface SVGMapInput {
  svg: GeoSVGSourceInput;
}

const storage = createHashMap<GeoResource>();

const manager = {
  registerMap: function (mapName: string, rawDef: MapInput | GeoJSONSourceInput, rawSpecialAreas?: GeoSpecialAreas): void {
    if ((rawDef as SVGMapInput).svg) {
      const resource = new GeoSVGResource(mapName, (rawDef as SVGMapInput).svg);
      storage.set(mapName, resource);
    } else {
      // Recommend:
      //     echarts.registerMap('eu', { geoJSON: xxx, specialAreas: xxx });
      // Backward compatibility:
      //     echarts.registerMap('eu', geoJSON, specialAreas);
      //     echarts.registerMap('eu', { geoJson: xxx, specialAreas: xxx });
      let geoJSON = (rawDef as GeoJSONMapInputCompat).geoJson
        || (rawDef as GeoJSONMapInput).geoJSON;
      if (geoJSON && !(rawDef as GeoJSON).features) {
        rawSpecialAreas = (rawDef as GeoJSONMapInput).specialAreas;
      }
      else {
        geoJSON = rawDef as GeoJSONSourceInput;
      }
      const resource = new GeoJSONResource(
        mapName,
        geoJSON,
        rawSpecialAreas
      );

      storage.set(mapName, resource);
    }
  },
  getGeoResource(mapName: string): GeoResource {
    return storage.get(mapName);
  },
  getMapForUser: function (mapName: string): ReturnType<GeoJSONResource['getMapForUser']> {
    const resource = storage.get(mapName);
    // Do not support return SVG until some real requirement come.
    return resource && resource.type === 'geoJSON'
      && (resource as GeoJSONResource).getMapForUser();
  },
  load: function (mapName: string, nameMap: NameMap, nameProperty: string): ReturnType<GeoResource['load']> {
    const resource = storage.get(mapName);

    if (!resource) {
      if (__DEV__) {
        console.error(
          'Map ' + mapName + ' not exists. The GeoJSON of the map must be provided.'
        );
      }
      return;
    }

    return resource.load(nameMap, nameProperty);
  }
};

export default manager;