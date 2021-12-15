import LRU from '../../core/LRU';
import { ImageLike } from '../../core/types';

const globalImageCache = new LRU<CachedImageObj>(50);

type PendingWrap = {
  hostEl: { dirty: () => void },
  cb: (image: ImageLike, payload: any) => void,
  cbPayload: any
};

type CachedImageObj = {
  image: ImageLike,
  pending: PendingWrap[]
};

export function findExistImage(newImageOrSrc: string | ImageLike): ImageLike {
  if (typeof newImageOrSrc === 'string') {
    const cachedImageOjb = globalImageCache.get(newImageOrSrc);
    return cachedImageOjb?.image;
  } else {
    return newImageOrSrc;
  }
}

export function createOrUpdateImage<T>(newImageOrSrc: string | ImageLike, image: ImageLike, hostEl: { dirty: () => void }, onload?: (image: ImageLike, payload: T) => void, cbPayload?: T) {
  if (!newImageOrSrc) {
    return image;
  } else if (typeof newImageOrSrc === 'string') {
    if ((image && (image as any).__zrImageSrc === newImageOrSrc) || !hostEl) {
      return image;
    }

    const cachedImgObj = globalImageCache.get(newImageOrSrc);
    const pendingWrap = { hostEl, cb: onload, cbPayload };

    if (cachedImgObj) {
      image = cachedImgObj.image;
      !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
    } else {
      image = new Image();
      image.onload = image.onerror = imageOnLoad;

      globalImageCache.put(newImageOrSrc, (image as any).__cachedImgObj = { image, pending: [pendingWrap]});

      image.src = (image as any).__zrImageSrc = newImageOrSrc;
    }

    return image;
  } else {
    return newImageOrSrc;
  }
}

function imageOnLoad(this: any) {
  const cachedImgObj = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;

  for (let i = 0; i < cachedImgObj.pending.length; i++) {
    const pendingWrap = cachedImgObj.pending[i];
    const cb = pendingWrap.cb;
    cb?.(this, pendingWrap.cbPayload);
    pendingWrap.hostEl.dirty();
  }

  cachedImgObj.pending.length = 0;
}

export function isImageReady(image: ImageLike): boolean {
  return !!(image && image.width && image.height);
}