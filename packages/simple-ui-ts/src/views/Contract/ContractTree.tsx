import { FC, memo, useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Panel from '../../components/Panel';
import Empty from '../../components/Empty';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectSelectedItem, selectContractTree, selectSelectedId } from './slices';
import { useContractTree } from './hooks';

const ContractTree: FC = () => {
  const selected = useAppSelector(selectSelectedItem);
  const { loading, loadSavedContract } = useContractTree();
  const tree = useAppSelector(selectContractTree);
  const selectedRoot = useAppSelector(selectSelectedId);

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

  return (
    <Panel title={<>{tree.name}<span className="text-secondary text-small">(ID: {selectedRoot})</span></>}>
      <Spin spinning={loading}>main</Spin>
    </Panel>
  );
};

export default memo(ContractTree);