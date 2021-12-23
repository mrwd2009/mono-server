import Path from '../graphic/Path';

export function isClipPathChanged(clipPaths: Path[], prevClipPaths: Path[]): boolean {
  // displayable.__clipPaths can only be `null`/`undefined` or an non-empty array.
  if (clipPaths === prevClipPaths || (!clipPaths && !prevClipPaths)) {
      return false;
  }
  if (!clipPaths || !prevClipPaths || (clipPaths.length !== prevClipPaths.length)) {
      return true;
  }
  for (let i = 0; i < clipPaths.length; i++) {
      if (clipPaths[i] !== prevClipPaths[i]) {
          return true;
      }
  }
  return false;
}