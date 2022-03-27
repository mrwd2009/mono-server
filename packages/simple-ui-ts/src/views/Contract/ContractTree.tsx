import { FC, memo } from 'react';
import { Spin, Button, Select, Tag, Space, Tooltip, Tabs } from 'antd';
import { PlusOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import Panel from '../../components/Panel';
import Empty from '../../components/Empty';
import ModelTree from '../../components/ModelTree';
import TreeComment from './TreeComment';
import { useHookedModal } from '../../components/HookedModal';
import InsertExternalNode from './InsertExternalNode';
import InsertInternalNode from './InsertInternalNode';
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
import { useContractDeletion, useContractList, useContractTree, useInsertInternalNode } from './hooks';
import { showError, showWarning } from '../../util/common';

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
  const insertExternalModal = useHookedModal();
  const insertInternalModal = useHookedModal();
  const {
    loading,
    createContractNode,
  } = useInsertInternalNode();
  const { loadSavedContract } = useContractList();

  const contextMenu = [
    {
      label: 'Insert',
      key: 'insert',
      disabled: (node: any) => !node || node.data.extraData.type === 'charge',
      onClick: () => showWarning('In developing.'),
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
      onClick: () => loadSavedContract(null),
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
  const handleDrop = (data: any) => {
    if (!data.target) {
      return;
    }
    if (data.type === 'external') {
      if (data.source.type === 'Component') {
        const tData = data.target.data;
        if (data.source.data === 'contract' || tData.type === 'charge') {
          showError('Invalid Operation.');
          return;
        }
        if (data.source.data === 'reroute') {
          createContractNode({
            name: '',
            type: data.source.data,
            sourceType: 'instance',
            parent: data.target.data.id,
          });
          return;
        }
        insertExternalModal.changeVisible(true, {
          type: data.source.data,
          sourceType: 'instance',
          parent: data.target.data.id,
        });
        return;
      }

      if (data.source.dataType === 'Reusable') {
        showWarning('In developing');
        return;
      }
      return;
    }

    if (data.type === 'internal' && data.target && data.source) {
      insertInternalModal.changeVisible(true, {
        sourceID: data.source.data.id,
        targetID: data.target.data.id,
        targetType: data.target.data.type,
      });
      return;
    }
  };
  return (
    <Spin spinning={loading}>
      <ModelTree
        minHeight={600}
        key="editable"
        dataSource={tree}
        contextMenus={contextMenu}
        onDrop={handleDrop}
        onSelect={(node) => fetchContractNode!(node?.data.id)}
        selectedKey={selectedNodeId}
        nodeKey={nodeKey}
        internalMenuStatus={menuStatus}
        toolbar={toolbar}
      />
      <InsertExternalNode hookedModal={insertExternalModal} />
      <InsertInternalNode hookedModal={insertInternalModal} />
    </Spin>
  );
});

const TreeAction = memo(() => {
  const { loading, deleteContract } = useContractDeletion();
  return (
    <Space
      className="mb-2"
      wrap
    >
      <Button size="small">
        Approve
        <Tooltip title="Approve contract interim version">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">
        Make Interim
        <Tooltip title="Copy contract from current approved version into interim veresion">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">Mark Active</Button>
      <Button size="small">Mark Obsolete</Button>
      <Button size="small">
        Show Rate
        <Tooltip title="Show all used rate tables">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button size="small">
        Show Design
        <Tooltip title="Show current contract version details">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>
      <Button
        size="small"
        danger
        loading={loading}
        onClick={() => deleteContract()}
      >
        Delete
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
  const insertExternalModal = useHookedModal();

  if (!tree) {
    const handleDrop = (data: any) => {
      const str = data.dataTransfer.getData('Text');
      if (str) {
        try {
          const data = JSON.parse(str);
          if (data.type === 'Component' && data.data === 'contract') {
            insertExternalModal.changeVisible(true, {
              type: 'contract',
              sourceType: 'instance',
            });
          }
        } catch (error) {

        }
      }
    };
    return (
      <Empty
        onDrop={handleDrop}
        className="mt-5"
        description="You can drag root component over here or click button to create a new contract."
      >
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => {
            insertExternalModal.changeVisible(true, {
              type: 'contract',
              sourceType: 'instance',
            });
          }}
        >
          New Contract
        </Button>
        <InsertExternalNode hookedModal={insertExternalModal} />
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
