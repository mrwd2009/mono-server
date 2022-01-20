import { useState, useEffect } from 'react';
import { detectFlexGapSupported } from '../styleChecker';

const useFlexGapSupport = () => {
  const [flexible, setFlexible] = useState(false);
  useEffect(() => {
    setFlexible(detectFlexGapSupported());
  }, []);

  return flexible;
};

export default useFlexGapSupport;