import { FC, useState } from 'react';
import { Row, Col } from '../../components/grid';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
}

const createPrimary = () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={12}>col1</Col>
        <Col span={12}>col2</Col>
      </Row>
      <Row gutter={20} justify="space-around" align="middle">
        <Col span={6} pull={1}>col1</Col>
        <Col span={6}><div style={{ height: 60, border: '1px solid red'}}>col2</div></Col>
      </Row>
    </>
  )
};

const GridCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  let el = null;
  if (type === 'primary') {
    el = createPrimary();
  }
  return (
    <div className={theme}>
      {el}
    </div>
  );
};

export default GridCase;