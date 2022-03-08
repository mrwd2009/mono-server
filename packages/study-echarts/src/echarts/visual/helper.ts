import SeriesData from '../data/SeriesData';

const __DEV__ = process.env.NODE_ENV === 'development';

export function getItemVisualFromData(data: SeriesData, dataIndex: number, key: string) {
  switch (key) {
    case 'color':
      const style = data.getItemVisual(dataIndex, 'style');
      return style[data.getVisual('drawType')];
    case 'opacity':
      return data.getItemVisual(dataIndex, 'style').opacity;
    case 'symbol':
    case 'symbolSize':
    case 'liftZ':
      return data.getItemVisual(dataIndex, key);
    default:
      if (__DEV__) {
        console.warn(`Unknown visual type ${key}`);
      }
  }
}

export function getVisualFromData(data: SeriesData, key: string) {
  switch (key) {
    case 'color':
      const style = data.getVisual('style');
      return style[data.getVisual('drawType')];
    case 'opacity':
      return data.getVisual('style').opacity;
    case 'symbol':
    case 'symbolSize':
    case 'liftZ':
      return data.getVisual(key);
    default:
      if (__DEV__) {
        console.warn(`Unknown visual type ${key}`);
      }
  }
}

export function setItemVisualFromData(data: SeriesData, dataIndex: number, key: string, value: any) {
  switch (key) {
    case 'color':
      // Make sure not sharing style object.
      const style = data.ensureUniqueItemVisual(dataIndex, 'style');
      style[data.getVisual('drawType')] = value;
      // Mark the color has been changed, not from palette anymore
      data.setItemVisual(dataIndex, 'colorFromPalette', false);
      break;
    case 'opacity':
      data.ensureUniqueItemVisual(dataIndex, 'style').opacity = value;
      break;
    case 'symbol':
    case 'symbolSize':
    case 'liftZ':
      data.setItemVisual(dataIndex, key, value);
      break;
    default:
      if (__DEV__) {
        console.warn(`Unknown visual type ${key}`);
      }
  }
}