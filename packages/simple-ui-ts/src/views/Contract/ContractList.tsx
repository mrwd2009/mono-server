import { FC, memo, useEffect, useState } from 'react';
import { Tabs, Collapse, Tooltip } from 'antd';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Panel from '../../components/Panel';
import DraggableList from '../../components/DraggableList';
import { useContractList } from './hooks';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectContractList, selectSavedList, selectSelectedId, updateSelectedId, updateContractTree } from './slices';

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

const itemKey = (item: any) => item.extraData.root;

const filterList = (text: any, item: any) => {
  const labelMatch = includes(toLower(item.label), toLower(text));
  const rootMatch = includes(`${item.extraData.root}`, text);
  return labelMatch || rootMatch;
};

const ContractList: FC = () => {
  const [selectedKey, setSelectedKey] = useState('overview');
  const dispatch = useAppDispatch();
  const { loading, fetchList } = useContractList();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const contractList = useAppSelector(selectContractList);
  const savedList = useAppSelector(selectSavedList);

  const selectedItemKey = useAppSelector(selectSelectedId);

  const handleSelect = (info: any, item: any) => {
    // clear selected version to avoid version and root not matched
    dispatch(updateContractTree({ selectedVersion: null }));
    dispatch(updateSelectedId(item && { root: item.extraData.root, version: item.extraData.version }));
  };

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
                onSelect={handleSelect}
                selectedKey={selectedItemKey}
              />
            </Collapse.Panel>
          </Collapse>
        </Tabs.TabPane>
        <Tabs.TabPane key="saved">
          <DraggableList
            draggable={false}
            dataSource={savedList}
            itemKey={itemKey}
            search
            debounce={300}
            maxHeight={600}
            onSearch={filterList}
            dataType="Contract"
            onSelect={handleSelect}
            selectedKey={selectedItemKey}
          />
        </Tabs.TabPane>
      </Tabs>
    </Panel>
  );
};

export default memo(ContractList);
