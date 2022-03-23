import { FC, memo, useEffect } from 'react';
import { Spin, Button, Select, Tag, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import Panel from '../../components/Panel';
import Empty from '../../components/Empty';
import { useAppSelector } from '../../hooks';
import {
  selectSelectedItem,
  selectContractTree,
  selectSelectedId,
  selectVersionList,
  selectSelectedVersion,
  selectCurrentVersionInfo,
} from './slices';
import { useContractTree } from './hooks';

const ContractTree: FC = () => {
  const selected = useAppSelector(selectSelectedItem);
  const { loading, loadSavedContract, fetchContractTree, selectVersion } = useContractTree();
  const tree = useAppSelector(selectContractTree);
  const selectedRoot = useAppSelector(selectSelectedId);
  const versionList = useAppSelector(selectVersionList);
  const selectedVersion = useAppSelector(selectSelectedVersion);
  const currentVersionInfo = useAppSelector(selectCurrentVersionInfo);

  // load tree according to root and version
  useEffect(() => {
    if (selectedRoot && selectedVersion) {
      fetchContractTree({
        root: selectedRoot,
        version: selectedVersion,
      });
    }
  }, [fetchContractTree, selectedRoot, selectedVersion]);

  // load saved contract according selected item from left sider
  useEffect(() => {
    loadSavedContract(selected);
  }, [selected, loadSavedContract]);

  if (!tree) {
    return (
      <Empty
        onDrop={console.log}
        className="mt-5"
        description="You can drag root component over here or click button to create a new contract."
      >
        <Button type="primary" shape="round" icon={<PlusOutlined />}>New Contract</Button>
      </Empty>
    );
  }

  const extra = (
    <>
      {currentVersionInfo && <Tag color="blue">{currentVersionInfo.type === 'interim' ? 'Interim' : 'Approved'}</Tag>}
      {currentVersionInfo?.active && <Tag color="green">Active</Tag>}
      <Select size="small" style={{ minWidth: 100 }} value={selectedVersion} onChange={selectVersion}>
        {versionList.approved.length && <Select.OptGroup label="Approved">
          {map(versionList.approved, (item) => {
            return <Select.Option className={item.active ? 'text-active' : ''} key={item.version} value={item.version}>Version: {item.version}</Select.Option>
          })}
        </Select.OptGroup>}
        {versionList.interim.length && <Select.OptGroup label="Interim">
          {map(versionList.interim, (item) => {
            return <Select.Option className={item.active ? 'text-active' : ''} key={item.version} value={item.version}>Version: {item.version}</Select.Option>
          })}
        </Select.OptGroup>}
      </Select>
    </>
  );

  return (
    <Panel
      title={<>{tree.name}<span className="text-secondary text-small">(ID: {selectedRoot})</span></>}
      extra={extra}
    >
      <Spin spinning={loading}>
        main
      </Spin>
    </Panel>
  );
};

export default memo(ContractTree);