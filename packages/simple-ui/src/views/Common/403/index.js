import { useHistory } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';

const Page403 = ({ logout }) => {
  const history = useHistory();
  return (
    <div style={{display: 'table', width: '100%', minHeight: 'calc(100vh - 63px)'}}>
      <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
        <Row>
          <Col span={8} offset={8} style={{textAlign: 'center'}}>
            <h1 style={{color: '#555', fontSize: '144px', fontWeight: 100, marginBottom: '16px'}}>403</h1>
            <h2 style={{ marginBottom: '24px'}}>You have no privilege to access this page.</h2>
            <Button type="primary" ghost icon={<HomeOutlined />} className="mr-2" onClick={() => history.push('/')} >Home</Button>
            <Button type="primary" ghost icon={<UserOutlined />} onClick={() => logout()}>Log In</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Page403;