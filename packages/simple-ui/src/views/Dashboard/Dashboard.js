import React, { memo } from 'react';
import { Card } from 'antd';
import { useBC } from '../../context/app';

const Dashboard = () => {
  useBC(['Dashboard']);
  return (
    <Card title="Dashboard" >

    </Card>
  );
};

export default memo(Dashboard);