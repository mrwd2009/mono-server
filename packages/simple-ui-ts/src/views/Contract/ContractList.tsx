import { FC, memo, useEffect, useState, useMemo } from 'react';
import { Tabs, Collapse, Tooltip } from 'antd';
import map from 'lodash/map';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Panel from '../../components/Panel';
import DraggableList from '../../components/DraggableList';
import { useContractList } from './hooks';
import { useAppSelector } from '../../hooks';
import { selectContractList, selectSavedList } from './slices';

const template = [
  {
    key: 'contract',
    type: 'component-contract',
    label: 'Root',
  },
  {
    key: 'subcontract',
    type: 'component-subcontract',
    label: 'Group',
  },
  {
    key: 'reroute',
    type: 'component-reroute',
    label: 'Line',
  },
  {
    key: 'charge',
    type: 'component-charge',
    label: 'Charge',
  },
];

const formatTransferData = (data: any) => ({
  type: data.dataType,
  data: data.key,
});

const itemKey = (item: any) => item.extraData.contractRoot;

const filterList = (text: any, item: any) => {
  const labelMatch = includes(toLower(item.label), toLower(text));
  const rootMatch = includes(`${item.extraData.contractRoot}`, text);
  return labelMatch || rootMatch;
};

const ContractList: FC = () => {
  const [selectedKey, setSelectedKey] = useState('overview');
  const {
    loading,
    fetchList,
  } = useContractList();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const _contractList = useAppSelector(selectContractList);
  const contractList = useMemo(() => {
    return map(_contractList, (item: any) => {
      return {
        key: item.id,
        type: 'contract-root',
        label: item.name,
        extraData: item,
      };
    });
  }, [_contractList]);

  return (
    <Panel
      activeTabKey={selectedKey}
      onTabChange={setSelectedKey}
      tabList={[
        { tab: 'Overview', key: 'overview' },
        { tab: 'Saved Node', key: 'saved' },
      ]}
      loading={loading}
    >
      <Tabs
        renderTabBar={(() => null) as any}
        activeKey={selectedKey}
      >
        <Tabs.TabPane key="overview">
          <Collapse
            ghost
            defaultActiveKey={['component', 'list']}
          >
            <Collapse.Panel
              header={
                <span className="text-nowrap">
                  Contract Component&nbsp;
                  <Tooltip title="Draggable contract component used to construct contract">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              key="component"
              className="collapse-panel-pt-0"
            >
              <DraggableList
                formatTransferData={formatTransferData}
                dataSource={template}
                dataType="Component"
              />
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <span className="text-nowrap">
                  Contract List&nbsp;
                  <Tooltip title="All contracts in system">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              key="list"
              className="collapse-panel-pt-0"
            >
              <DraggableList
                draggable={false}
                dataSource={contractList}
                itemKey={itemKey}
                search
                debounce={300}
                maxHeight={400}
                onSearch={filterList}
                dataType="Contract"
                // onSelect={onSelect}
                selectedKey={''}
              />
            </Collapse.Panel>
          </Collapse>
        </Tabs.TabPane>
        <Tabs.TabPane key="saved">saved list</Tabs.TabPane>
      </Tabs>
    </Panel>
  );
};

export default memo(ContractList);
