import { FC, memo } from 'react';

const FooterContent: FC = () => {
  return <span>© {new Date().getFullYear()} CFEX, inc. All rights reserved.</span>;
};

export default memo(FooterContent);
