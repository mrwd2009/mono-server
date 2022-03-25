import { FC, memo } from 'react';
import { Spin, Button, Select, Tag, Space, Tooltip, Tabs } from 'antd';
import { PlusOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import Panel from '../../components/Panel';
import Empty from '../../components/Empty';
import ModelTree from '../../components/ModelTree';
import TreeComment from './TreeComment';
import { useAppSelector } from '../../hooks';
import {
  selectContractTree,
  selectSelectedId,
  selectVersionList,
  selectSelectedVersion,
  selectCurrentVersionInfo,
  selectSelectedNodeID,
} from './slices';
import { Node } from './slices/contract-tree-slice';
import { Version } from './slices/contract-list-slice';
import { useContractTree } from './hooks';

const nodeKey = (node: any) => node.data.extraData.contractBody;

interface TreeContentProps {
  tree: Node | null;
  versionInfo?: Version;
  fetchContractNode?: (arg: any) => void;
}

const TreeContent = memo(({
  tree,
  versionInfo,
  fetchContractNode,
}: TreeContentProps) => {
  const selectedNodeId = useAppSelector(selectSelectedNodeID);

  const contextMenu = [
    {
      label: 'Insert',
      key: 'insert',
      disabled: (node: any) => !node || node.data.extraData.type === 'charge',
      onClick: console.log,
    },
  ];
  const menuStatus = {
    cutDisabled: (node: any) => node.data.extraData.type === 'contract',
  };
  const toolbar = [
    {
      title: 'Exit',
      key: 'exit',
      icon: <CloseOutlined />,
      onClick: console.log,
    },
  ];
  if (versionInfo?.type === 'approved') {
    return (
      <ModelTree
        minHeight={600}
        readonly
        key="readonly"
        dataSource={tree}
        onSelect={(node) => fetchContractNode!(node?.data.id)}
        selectedKey={selectedNodeId}
        nodeKey={nodeKey}
        toolbar={toolbar}
      />
    );
  }
  return (
    <ModelTree
      minHeight={600}
      key="editable"
      dataSource={tree}
      contextMenus={contextMenu}
      onDrop={console.log}
      onSelect={(node) => fetchContractNode!(node?.data.id)}
      selectedKey={selectedNodeId}
      // defaultCenteredKey={}
      nodeKey={nodeKey}
      internalMenuStatus={menuStatus}
      toolbar={toolbar}
    />
  );
});

const TreeAction = memo(() => {
  return (
    <Space
      className="mb-2"
      wrap
    >
      <Button size="small">
        Approve{' '}
        <Tooltip title="Approve contract interim version">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">
        Make Interim{' '}
        <Tooltip title="Copy contract from current approved version into interim veresion">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">Mark Active</Button>
      <Button size="small">Mark Obsolete</Button>
      <Button size="small">
        Show Rate{' '}
        <Tooltip title="Show all used rate tables">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">
        Show Design{' '}
        <Tooltip title="Show current contract version details">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button
        size="small"
        danger
      >
        Delete{' '}
        <Tooltip title="Only contract having only one interim version can be deleted">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
    </Space>
  );
});

const TreeLog = memo(() => {
  return (
    <Tabs size="small" className="mt-2">
      <Tabs.TabPane tab="Commit Log" key="commit">
        <TreeComment />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Approving Log" key="release">
        <TreeComment initMsg="Update price" />
      </Tabs.TabPane>
    </Tabs>
  )
});

const ContractTree: FC = () => {
  const { loading, fetchContractTree, fetchContractNode } = useContractTree();
  const tree = useAppSelector(selectContractTree);
  const selectedRoot = useAppSelector(selectSelectedId);
  const versionList = useAppSelector(selectVersionList);
  const selectedVersion = useAppSelector(selectSelectedVersion);
  const currentVersionInfo = useAppSelector(selectCurrentVersionInfo);

  if (!tree) {
    return (
      <Empty
        onDrop={console.log}
        className="mt-5"
        description="You can drag root component over here or click button to create a new contract."
      >
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
        >
          New Contract
        </Button>
      </Empty>
    );
  }

  const extra = (
    <>
      {currentVersionInfo && <Tag color="blue">{currentVersionInfo.type === 'interim' ? 'Interim' : 'Approved'}</Tag>}
      {currentVersionInfo?.active && <Tag color="green">Active</Tag>}
      <Select
        size="small"
        style={{ minWidth: 60 }}
        value={selectedVersion}
        onChange={(version) => fetchContractTree({ root: selectedRoot!, version })}
      >
        {versionList.approved.length && (
          <Select.OptGroup label="Approved">
            {map(versionList.approved, (item) => {
              return (
                <Select.Option
                  className={item.active ? 'text-active' : ''}
                  key={item.version}
                  value={item.version}
                >
                  Version: {item.version}
                </Select.Option>
              );
            })}
          </Select.OptGroup>
        )}
        {versionList.interim.length && (
          <Select.OptGroup label="Interim">
            {map(versionList.interim, (item) => {
              return (
                <Select.Option
                  className={item.active ? 'text-active' : ''}
                  key={item.version}
                  value={item.version}
                >
                  Version: {item.version}
                </Select.Option>
              );
            })}
          </Select.OptGroup>
        )}
      </Select>
    </>
  );

  return (
    <Spin spinning={loading}>
      <Panel
        title={
          <>
            {tree.name}
            <span className="text-secondary text-small">(ID: {selectedRoot})</span>
          </>
        }
        extra={extra}
      >
        <TreeAction />
        <TreeContent
          tree={tree}
          versionInfo={currentVersionInfo}
          fetchContractNode={fetchContractNode}
        />
        <TreeLog />
      </Panel>
    </Spin>
  );
};

export default memo(ContractTree);
