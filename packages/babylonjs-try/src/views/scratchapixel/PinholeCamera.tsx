import { memo, useRef, useEffect } from 'react';

export interface Props {
  title: string,
}
  
const PinholeCamera = ({ title } : Props) => {
  const canvasRef = useRef(null);
  return (
    <>
      <h5>{title}</h5>
    </>
  )
};
  
export default memo(PinholeCamera);