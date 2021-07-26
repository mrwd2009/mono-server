import React, { memo } from 'react';

const currentYear = new Date().getFullYear();
const MainFooter = () => {
  return (
    <span>
      © {currentYear} GridX Inc.
    </span>
  );
};

export default memo(MainFooter);