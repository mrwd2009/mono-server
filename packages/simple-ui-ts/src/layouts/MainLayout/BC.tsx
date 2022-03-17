import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import map from 'lodash/map';
import { HomeOutlined } from '@ant-design/icons';
import { getRouteBC } from '../../config/routes-info'

const BC: FC = () => {
  const location = useLocation();
  const bcList = getRouteBC(location.pathname);
  return (
    <Breadcrumb className="app-ex-breadcrumb">
      <Breadcrumb.Item>
       <HomeOutlined />
      </Breadcrumb.Item>
      {map(bcList, bc => {
        return (
          <Breadcrumb.Item key={bc.key}>
            {bc.title}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default memo(BC);