import * as zrUtil from 'zrender/src/core/util';
import type GlobalModel from '../model/Global';
import type ExtensionAPI from './ExtensionAPI';
import type { CoordinateSystemCreator, CoordinateSystemMaster } from '../coord/CoordinateSystem';

const coordinateSystemCreators: { [type: string]: CoordinateSystemCreator } = {};

class CoordinateSystemManager {
  private _coordinateSystems: CoordinateSystemMaster[] = [];

  create(ecModel: GlobalModel, api: ExtensionAPI): void {
    let coordinateSystems: CoordinateSystemMaster[] = [];
    zrUtil.each(coordinateSystemCreators, function(creator, type) {
      const list = creator.create(ecModel, api);
      coordinateSystems = coordinateSystems.concat(list || []);
    });

    this._coordinateSystems = coordinateSystems;
  }

  update(ecModel: GlobalModel, api: ExtensionAPI): void {
    zrUtil.each(this._coordinateSystems, function(coordSys) {
      coordSys.update?.(ecModel, api);
    });
  }

  getCoordinateSystems(): CoordinateSystemMaster[] {
    return this._coordinateSystems.slice();
  }

  static register = function(type: string, creator: CoordinateSystemCreator): void {
    coordinateSystemCreators[type] = creator;
  };

  static get = function(type: string): CoordinateSystemCreator {
    return coordinateSystemCreators[type];
  }
}

export default CoordinateSystemManager;