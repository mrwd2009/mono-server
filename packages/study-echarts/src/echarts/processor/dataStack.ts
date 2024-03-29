import { createHashMap, each } from 'zrender/src/core/util';
import GlobalModel from '../model/Global';
import SeriesModel from '../model/Series';
import { SeriesOption, SeriesStackOptionMixin } from '../util/types';
import SeriesData, { DataCalculationInfo } from '../data/SeriesData';
import { addSafe } from '../util/number';


type StackInfo = Pick<
  DataCalculationInfo<SeriesOption & SeriesStackOptionMixin>,
  'stackedDimension'
  | 'isStackedByIndex'
  | 'stackedByDimension'
  | 'stackResultDimension'
  | 'stackedOverDimension'
> & {
  data: SeriesData
  seriesModel: SeriesModel<SeriesOption & SeriesStackOptionMixin>
};

export default function dataStack(ecModel: GlobalModel) {
  const stackInfoMap = createHashMap<StackInfo[]>();
  ecModel.eachSeries(function (seriesModel: SeriesModel<SeriesOption & SeriesStackOptionMixin>) {
    const stack = seriesModel.get('stack');
    // Compatibal: when `stack` is set as '', do not stack.
    if (stack) {
      const stackInfoList = stackInfoMap.get(stack) || stackInfoMap.set(stack, []);
      const data = seriesModel.getData();

      const stackInfo: StackInfo = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: data.getCalculationInfo('stackResultDimension'),
        stackedOverDimension: data.getCalculationInfo('stackedOverDimension'),
        stackedDimension: data.getCalculationInfo('stackedDimension'),
        stackedByDimension: data.getCalculationInfo('stackedByDimension'),
        isStackedByIndex: data.getCalculationInfo('isStackedByIndex'),
        data: data,
        seriesModel: seriesModel
      };

      // If stacked on axis that do not support data stack.
      if (!stackInfo.stackedDimension
        || !(stackInfo.isStackedByIndex || stackInfo.stackedByDimension)
      ) {
        return;
      }

      stackInfoList.length && data.setCalculationInfo(
        'stackedOnSeries', stackInfoList[stackInfoList.length - 1].seriesModel
      );

      stackInfoList.push(stackInfo);
    }
  });

  stackInfoMap.each(calculateStack as any);
}

function calculateStack(stackInfoList: StackInfo[]) {
  each(stackInfoList, function (targetStackInfo, idxInStack) {
    const resultVal: number[] = [];
    const resultNaN = [NaN, NaN];
    const dims: [string, string] = [targetStackInfo.stackResultDimension, targetStackInfo.stackedOverDimension];
    const targetData = targetStackInfo.data;
    const isStackedByIndex = targetStackInfo.isStackedByIndex;

    // Should not write on raw data, because stack series model list changes
    // depending on legend selection.
    targetData.modify(dims, function (v0, v1, dataIndex) {
      let sum = targetData.get(targetStackInfo.stackedDimension, dataIndex) as number;

      // Consider `connectNulls` of line area, if value is NaN, stackedOver
      // should also be NaN, to draw a appropriate belt area.
      if (isNaN(sum)) {
        return resultNaN;
      }

      let byValue: number;
      let stackedDataRawIndex;

      if (isStackedByIndex) {
        stackedDataRawIndex = targetData.getRawIndex(dataIndex);
      }
      else {
        byValue = targetData.get(targetStackInfo.stackedByDimension, dataIndex) as number;
      }

      // If stackOver is NaN, chart view will render point on value start.
      let stackedOver = NaN;

      for (let j = idxInStack! - 1; j >= 0; j--) {
        const stackInfo = stackInfoList[j];

        // Has been optimized by inverted indices on `stackedByDimension`.
        if (!isStackedByIndex) {
          stackedDataRawIndex = stackInfo.data.rawIndexOf(stackInfo.stackedByDimension, byValue!);
        }

        if (stackedDataRawIndex as any >= 0) {
          const val = stackInfo.data.getByRawIndex(
            stackInfo.stackResultDimension, stackedDataRawIndex as any
          ) as number;

          // Considering positive stack, negative stack and empty data
          if ((sum >= 0 && val > 0) // Positive stack
            || (sum <= 0 && val < 0) // Negative stack
          ) {
            // The sum should be as less as possible to be effected
            // by floating arithmetic problem. A wrong result probably
            // filtered incorrectly by axis min/max.
            sum = addSafe(sum, val);
            stackedOver = val;
            break;
          }
        }
      }

      resultVal[0] = sum;
      resultVal[1] = stackedOver;

      return resultVal;
    });
  });
}