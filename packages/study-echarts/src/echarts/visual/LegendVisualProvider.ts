import SeriesData from '../data/SeriesData';

class LegendVisualProvider {

  private _getDataWithEncodedVisual: () => SeriesData;
  private _getRawData: () => SeriesData;

  constructor(
    // Function to get data after filtered. It stores all the encoding info
    getDataWithEncodedVisual: () => SeriesData,
    // Function to get raw data before filtered.
    getRawData: () => SeriesData
  ) {
    this._getDataWithEncodedVisual = getDataWithEncodedVisual;
    this._getRawData = getRawData;
  }

  getAllNames(): string[] {
    const rawData = this._getRawData();
    // We find the name from the raw data. In case it's filtered by the legend component.
    // Normally, the name can be found in rawData, but can't be found in filtered data will display as gray.
    return rawData.mapArray(rawData.getName);
  }

  containName(name: string): boolean {
    const rawData = this._getRawData();
    return rawData.indexOfName(name) >= 0;
  }

  indexOfName(name: string): number {
    // Only get data when necessary.
    // Because LegendVisualProvider constructor may be new in the stage that data is not prepared yet.
    // Invoking Series#getData immediately will throw an error.
    const dataWithEncodedVisual = this._getDataWithEncodedVisual();
    return dataWithEncodedVisual.indexOfName(name);
  }

  getItemVisual(dataIndex: number, key: string): any {
    // Get encoded visual properties from final filtered data.
    const dataWithEncodedVisual = this._getDataWithEncodedVisual();
    return dataWithEncodedVisual.getItemVisual(dataIndex, key as any);
  }
}

export default LegendVisualProvider;