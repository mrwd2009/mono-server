import Path from "./graphic/Path";
import ZRImage from './graphic/Image';
import { GradientObject } from "./graphic/Gradient";
import { PatternObject } from "./graphic/Pattern";
import { Dictionary } from "./core/types";

export interface PainterBase {
  type: string;

  root?: HTMLElement;

  ssrOnly?: boolean

  resize(width?: number | string, height?: number | string): void;
  refresh(): void;
  clear(): void;

  // must be given if ssr is true.
  renderToString?(): string;

  getType: () => string;

  getWidth(): number;
  getHeight(): number;
  dispose(): void;

  getViewportRoot: () => HTMLElement;
  getViewportRootOffset: () => { offsetLeft: number, offsetTop: number } | undefined;

  refreshHover(): void;

  configLayer(zLevel: number, config: Dictionary<any>): void;
  setBackgroundColor(backgroundColor: string | GradientObject | PatternObject): void;
}