type RequestAnimationFrameType = typeof window.requestAnimationFrame;

let rAF: RequestAnimationFrameType;

const simulation = (func: Parameters<RequestAnimationFrameType>[0]): number => {
  return setTimeout(func, 16);
};

if (typeof window !== 'undefined') {
  rAF = window.requestAnimationFrame || (window as any).msRequestAnimationFrame || (window as any).mozRequestAnimationFrame || (window as any).webkitRequestAnimationFrame;
  if (rAF) {
    rAF = rAF.bind(window);
  } else {
    rAF = simulation;
  }
} else {
  rAF = simulation;
}

export default rAF;