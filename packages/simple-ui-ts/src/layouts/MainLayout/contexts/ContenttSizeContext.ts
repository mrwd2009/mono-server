import { createContext, Context } from 'react';

const ContentSizeContext: Context<{ width: number, height: number}> = createContext({ width: 0, height: 0 });

export default ContentSizeContext;