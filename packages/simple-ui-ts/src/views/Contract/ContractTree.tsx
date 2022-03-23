import { FC, memo, useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Panel from '../../components/Panel';
import Empty from '../../components/Empty';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectSelectedItem, selectContractTree } from './slices';
import { useContractTree } from './hooks';

const ContractTree: FC = () => {
  const selected = useAppSelector(selectSelectedItem);
  const { loading, loadSavedContract } = useContractTree();
  const tree = useAppSelector(selectContractTree);

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
    <Spin spinning={loading}>
      <Panel title="Main">
        main
      </Panel>
    </Spin>
  );
};

export default memo(ContractTree);