import { memo } from 'react';

interface Options {
  label?: string,
}
const SimpleScene = ({ label = '2002' }: Options) => {
  return <div>{label}</div>;
};

export default memo(SimpleScene);