import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Dropdown, Menu } from 'antd';
import map from 'lodash/map';
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import { useLang } from '../../hooks';
import { getRouteBC } from '../../config/routes-info';

const BC: FC = () => {
  const location = useLocation();
  const bcList = getRouteBC(location.pathname);
  const { lang, fetchLang } = useLang();
  const langOverlay = (
    <Menu
      selectedKeys={[lang]}
      onClick={({ key }) => fetchLang(key)}
    >
      <Menu.Item key="en-US">English (US)</Menu.Item>
    </Menu>
  );

  return (
    <div className="app-ex-breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        {map(bcList, (bc) => {
          return <Breadcrumb.Item key={bc.key}>{bc.title}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      <Dropdown
        overlay={langOverlay}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          size="small"
          type="text"
          icon={<GlobalOutlined />}
        >
          English (US)
        </Button>
      </Dropdown>
    </div>
  );
};

export default memo(BC);
