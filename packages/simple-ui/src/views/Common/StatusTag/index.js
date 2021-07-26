import React from 'react';
import { Tag } from 'antd';

// const style = {
//   cursor: 'pointer'
// }

export default ({ status, ...props }) => {
  switch(status) {
    case 'N':
        return <Tag color="magenta">Not Billed</Tag>;
    case 'W':
        return <Tag color="volcano">Withdraw</Tag>;
    case 'I':
      return <Tag color="blue">Invoiced</Tag>; // #1ab394
    case 'C':
      return <Tag color="red">Cancelled</Tag>;
    case 'P':
      return <Tag color="geekblue">PreCancelled | HoldPreCancel</Tag>;
    case 'E':
      return <Tag color="purple">Exception</Tag>;
    default:
      return status;
  }
}
