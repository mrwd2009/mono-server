import * as image from './image';

test('findExistImage', () => {
  expect(image.findExistImage('test')).toBeUndefined();
  expect(image.findExistImage(null)).toBeNull();
});

test('isImageReady', () => {
  expect(image.isImageReady(null)).toBe(false);
});

test('createOrUpdateImage', () => {
  // @ts-ignore
  global.Image = function(width?: number, height?: number): HTMLImageElement {
    return { width, height } as HTMLImageElement;
  };
  expect(image.createOrUpdateImage('', null, { dirty: () => {} })).toBe(null);
  expect(image.createOrUpdateImage(new Image(6), new Image(), { dirty: () => {} }).width).toBe(6);

  const image2 = {
    width: 0,
    height: 0,
    // @ts-ignore
    onload: null,
    src: '',
  };
  // @ts-ignore
  global.Image = function(width?: number, height?: number): HTMLImageElement {
    return image2 as HTMLImageElement;
  };
  let i = 0;
  const hostEl = {
    dirty: () => {
      i++;
    },
  };
  let loadArgs = '';
  const load1 = (im: HTMLImageElement, ar: string) => {
    loadArgs += ar;
  };
  const load1Payload = 'load1';
  const load2 = (im: HTMLImageElement, ar: string) => {
    loadArgs += ar;
  };
  const load2Payload = 'load2';

  image.createOrUpdateImage('test.png', null, hostEl, load1, load1Payload);
  image.createOrUpdateImage('test.png', null, hostEl, load2, load2Payload);

  image2.onload.call(image2);
  expect(i).toBe(2);
  expect(loadArgs).toBe('load1load2');
});