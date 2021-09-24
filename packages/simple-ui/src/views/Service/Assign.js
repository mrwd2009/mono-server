import React, { memo, useEffect } from 'react';
import { Modal, Button, Transfer, Spin } from 'antd';
import difference from 'lodash/difference';
import map from 'lodash/map';
import useAssign from './hooks/useAssign';
import ServerTable from '../../components/ServerTable';
import './index.less';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'IP', dataIndex: 'ip' },
];

const Assign = ({ assign }) => {
  const {
    visible,
    loading,
    handleClose,
    setVisible,
    leftTable,
    leftTable: {
      refreshListRef: refreshLeft,
    },
    rightTable,
    rightTable: {
      refreshListRef: refreshRight,
    },
    handleChange,
  } = useAssign(assign);

  useEffect(() => {
    if (assign) {
      setVisible(true);
      refreshLeft.current({ search: {}, sorter: {}, page: 1 });
      refreshRight.current({ search: {}, sorter: {}, page: 1 });
    } else {
      setVisible(false);
    }
  }, [setVisible, refreshLeft, refreshRight, assign]);

  const transferContent = ({direction, onItemSelectAll, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled}) => {
    const rowSelection = {
      onSelectAll(selected, selectedRows) {
        const treeSelectedKeys = map(selectedRows, 'id')
        const diffKeys = selected
          ? difference(treeSelectedKeys, listSelectedKeys)
          : difference(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect({ id }, selected) {
        onItemSelect(id, selected);
      },
      selectedRowKeys: listSelectedKeys
    };
    return (
      <ServerTable
        pagination={{
          showSizeChanger: false
        }}
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        table={direction === 'left' ? leftTable : rightTable}
      />
    );
  };
  return (
    <Modal
      className="assigned-server-modal"
      title="Assigned Server"
      style={{ top: 20 }}
      visible={visible}
      width={840}
      destroyOnClose
      onCancel={handleClose}
      footer={
        [<Button key="close" onClick={handleClose}>Close</Button>]
      }
    >
      <Spin spinning={loading}>
        <Transfer
          onChange={handleChange}
          rowKey={(row) => row.id}
          showSelectAll={false}
          selectAllLabels={[(info) => `${info.selectedCount} Item`]}
          titles={['Available', 'Assigned']}
        >
          {transferContent}
        </Transfer>
      </Spin>
    </Modal>
  );
};

export default memo(Assign);