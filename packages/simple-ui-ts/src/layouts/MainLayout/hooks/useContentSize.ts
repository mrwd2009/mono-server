import { useContext } from 'react';
import { ContentSizeContext } from '../contexts';

const useContentSize = () => {
  const size = useContext(ContentSizeContext);

  return size;
};

export default useContentSize;
