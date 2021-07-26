import React, { memo } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import { useBC } from '../../context/app';

const { Item } = Breadcrumb;
const MainBC = () => {
  const { bc } = useBC();
  const lastIndex = bc.length - 1;
  const items = map(bc, (bcInfo, index) => {
    let inner = bcInfo;
    let key = bcInfo;
    if (isObject(bcInfo)) {
      key = bcInfo.key || bcInfo.pathname;
      inner = <Link to={bcInfo.pathname}>{bcInfo.title}</Link>;
    }
    if (index !== lastIndex) {
      inner = <strong>{inner}</strong>;
    }
    return <Item key={key}>{inner}</Item>
  });
  return (
    <Breadcrumb className="ant-breadcrumb--gridx">
      {items}
    </Breadcrumb>
  );
};

export default memo(MainBC);