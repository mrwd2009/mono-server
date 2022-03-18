import { createContext, Context } from 'react';

const BreakpointContext: Context<string> = createContext('xs');

export default BreakpointContext;