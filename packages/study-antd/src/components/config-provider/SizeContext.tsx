import { createContext, FC } from 'react';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
}

export const SizeContextProvider: FC<SizeContextProps> = ({ children, size }) => {
  return <SizeContext.Consumer>
    {
      originSize => {
        return (
          <SizeContext.Provider value={ size || originSize }>
            { children }
          </SizeContext.Provider>
        )
      }
    }
  </SizeContext.Consumer>
};

export default SizeContext;