export * from './src/zrender';
export * from './src/export';

import {registerPainter} from './src/zrender';
import SVGPainter from './src/svg/Painter';
registerPainter('svg', SVGPainter);