import { FC, memo, useState } from 'react';
import { Tabs, Collapse, Tooltip } from 'antd';
import { QuestionCircleOutlined  } from '@ant-design/icons';
import Panel from '../../components/Panel';
import DraggableList from '../../components/DraggableList';

const template = [
  {
    key: 'contract',
    type: 'component-contract',
    label: 'Contract'
  },
  {
    key: 'subcontract',
    type: 'component-subcontract',
    label: 'Group'
  },
  {
    key: 'reroute',
    type: 'component-reroute',
    label: 'Line'
  },
  {
    key: 'charge',
    type: 'component-charge',
    label: 'Charge'
  },
];

const formatTransferData = (data: any) => ({
  type: data.dataType,
  data: data.key,
});

const ContractList: FC = () => {
  const [selectedKey, setSelectedKey] = useState('overview');
  return (
    <Panel
      activeTabKey={selectedKey}
      onTabChange={setSelectedKey}
      tabList={[{ tab: "Overview", key: 'overview'}, { tab: "Saved Node", key: 'saved'}]}
    >
      <Tabs renderTabBar={(() => null) as any} activeKey={selectedKey}>
        <Tabs.TabPane key="overview">
          <Collapse ghost defaultActiveKey={['component', 'list']}>
            <Collapse.Panel
              header={
                <span className="text-nowrap">
                  Contract Component&nbsp;
                  <Tooltip title="Draggable contract component used to construct contract">
                    <QuestionCircleOutlined/>
                  </Tooltip>
                </span>
              }
              key="component"
              className="collapse-panel-pt-0"
            >
              <DraggableList formatTransferData={formatTransferData} dataSource={template} dataType="Component" />
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <span className="text-nowrap">
                  Contract List&nbsp;
                  <Tooltip title="All contracts in system">
                    <QuestionCircleOutlined/>
                  </Tooltip>
                </span>
              }
              key="list"
              className="collapse-panel-pt-0"
            >
              <DraggableList formatTransferData={formatTransferData} dataSource={template} dataType="Component" />
            </Collapse.Panel>
          </Collapse>
        </Tabs.TabPane>
        <Tabs.TabPane key="saved">
          saved list
        </Tabs.TabPane>
      </Tabs>
    </Panel>
  );
};

export default memo(ContractList);

