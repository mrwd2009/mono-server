import ComponentModel from '../../model/Component';
import ComponentView from '../../view/Component';
import {
  SERIES_LAYOUT_BY_COLUMN, ComponentOption, SeriesEncodeOptionMixin,
  OptionSourceData, SeriesLayoutBy, OptionSourceHeader
} from '../../util/types';
import { DataTransformOption, PipedDataTransformOption } from '../../data/helper/transform';
import GlobalModel from '../../model/Global';
import Model from '../../model/Model';
import { disableTransformOptionMerge, SourceManager } from '../../data/helper/sourceManager';
import { EChartsExtensionInstallRegisters } from '../../extension';


export interface DatasetOption extends
  Pick<ComponentOption, 'type' | 'id' | 'name'>,
  Pick<SeriesEncodeOptionMixin, 'dimensions'> {
  mainType?: 'dataset';

  seriesLayoutBy?: SeriesLayoutBy;
  sourceHeader?: OptionSourceHeader;
  source?: OptionSourceData;

  fromDatasetIndex?: number;
  fromDatasetId?: string;
  transform?: DataTransformOption | PipedDataTransformOption;
  // When a transform result more than on results, the results can be referenced only by:
  // Using `fromDatasetIndex`/`fromDatasetId` and `transfromResultIndex` to retrieve
  // the results from other dataset.
  fromTransformResult?: number;
}

export class DatasetModel<Opts extends DatasetOption = DatasetOption> extends ComponentModel<Opts> {

  type = 'dataset';
  static type = 'dataset';

  static defaultOption: DatasetOption = {
    seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN
  };

  private _sourceManager: SourceManager;

  init(option: Opts, parentModel: Model, ecModel: GlobalModel): void {
    super.init(option, parentModel, ecModel);
    this._sourceManager = new SourceManager(this);
    disableTransformOptionMerge(this);
  }

  mergeOption(newOption: Opts, ecModel: GlobalModel): void {
    super.mergeOption(newOption, ecModel);
    disableTransformOptionMerge(this);
  }

  optionUpdated() {
    this._sourceManager.dirty();
  }

  getSourceManager() {
    return this._sourceManager;
  }
}

class DatasetView extends ComponentView {
  static type = 'dataset';
  type = 'dataset';
}

export function install(registers: EChartsExtensionInstallRegisters) {
  registers.registerComponentModel(DatasetModel);
  registers.registerComponentView(DatasetView);
}