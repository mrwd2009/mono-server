import { FC } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import Dropdown from '../../components/dropdown';
import Menu from '../../components/menu';
import Layout from '../../components/layout';
import './index.less';

export interface Props {
  type: string;
}

const BcDropdownMenu: FC<Props> = ({ type }) => {
  let el: any;
  if (type === 'breadcrumb') {
    el = (
      <>
        <Breadcrumb
          routes={[
            {
              breadcrumbName: 'name1:_1',
              path: 'path1:_2',
              children: [
                {
                  breadcrumbName: 'subname1:_3',
                  path: 'subpath1:_4',
                },
                {
                  breadcrumbName: 'subname2:_3',
                  path: 'subpath2:_4',
                }
              ]
            },
            {
              breadcrumbName: 'name2:_1',
              path: 'path2:_2',
            },
            {
              breadcrumbName: 'name3:_1',
              path: 'path3:_2',
            }
          ]}
          params={{
            _1: '__1__',
            _2: '__1__',
            _3: '__1__',
            _4: '__1__'
          }}
        />
        <Breadcrumb>
          <Breadcrumb.Item>Part1</Breadcrumb.Item>
          <Breadcrumb.Item>Part2</Breadcrumb.Item>
        </Breadcrumb>
      </>
    );
  } else if (type === 'menu') {
    return (
      <>
        <Layout tagName="div">
          <Layout.Sider tagName="div" collapsible>
            <Menu>
              <Menu.Item key="1" title="title1">menu1</Menu.Item>
              <Menu.Item key="2" title="title2">menu2</Menu.Item>
              <Menu.SubMenu title="title3">
                <Menu.Item key="3-1" title="menu-3-1">menu-3-1</Menu.Item>
                <Menu.SubMenu title="title-3-2">
                  <Menu.Item key="3-2-1" title="menu-3-2-1">menu-3-2-1</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="3-3" title="menu-3-3">menu-3-3</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="4" title="title4">menu4</Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content tagName="div">
            <Menu mode="horizontal">
              <Menu.Item key="1" title="title1">menu1</Menu.Item>
              <Menu.Item key="2" title="title2">menu2</Menu.Item>
              <Menu.SubMenu title="title3">
                <Menu.Item key="3-1" title="menu-3-1">menu-3-1</Menu.Item>
                <Menu.SubMenu title="title-3-2">
                  <Menu.Item key="3-2-1" title="menu-3-2-1">menu-3-2-1</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="3-3" title="menu-3-3">menu-3-3</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="4" title="title4">menu4</Menu.Item>
            </Menu>
          </Layout.Content>
        </Layout>
      </>
    );
  } else {
    const overlay = (
      <Menu>
        <Menu.Item key="menu1">menu1</Menu.Item>
        <Menu.Item key="menu2">menu2</Menu.Item>
      </Menu>
    )
    el = (
      <>
        <Dropdown overlay={overlay} arrow>
          <span>simple dropdown</span>
        </Dropdown>
      </>
    );
  }
  return (
    <div>
      {el}
    </div>
  );
};

export default BcDropdownMenu;