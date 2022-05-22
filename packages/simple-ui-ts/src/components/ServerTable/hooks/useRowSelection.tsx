import { useState, useMemo } from 'react';
import { TableColumnsType, Checkbox } from 'antd';
import intersection from 'lodash/intersection';
import map from 'lodash/map';
import includes from 'lodash/includes';
import filter from 'lodash/filter';

const useRowSelection = (columns: TableColumnsType<any>, list: any, rowKey = 'id') => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const checkboxCol = useMemo(() => {
    return {
      title: () => {
        const ids = map(list, rowKey);
        const sameIds = intersection(ids, selectedRowKeys);
        const checked = sameIds.length > 0 && sameIds.length === ids.length;
        const indeterminate = sameIds.length > 0 && sameIds.length !== ids.length;
        return (
          <Checkbox
            indeterminate={indeterminate}
            checked={checked}
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedRowKeys(ids);
              } else {
                setSelectedRowKeys([]);
              }
            }}
          />
        );
      },
      dataIndex: '__checkbox_col__',
      width: 28,
      minWidth: 28,
      align: 'center',
      cSwitchable: false,
      cResizable: false,
      cFixedWidth: true,
      render: (val: any, row: any) => {
        const id = row[rowKey];
        const checked = includes(selectedRowKeys, id);
        return (
          <Checkbox
            checked={checked}
            onChange={(event) => {
              const newIds = filter(selectedRowKeys, (key) => key !== id);
              if (event.target.checked) {
                newIds.push(id);
                setSelectedRowKeys(newIds);
              } else {
                setSelectedRowKeys(newIds);
              }
            }}
          />
        );
      },
    };
  }, [list, rowKey, selectedRowKeys]);

  const tableColumns = useMemo(() => {
    return [checkboxCol, ...columns];
  }, [checkboxCol, columns]);

  return {
    selectedRowKeys,
    setSelectedRowKeys,
    tableColumns,
  };
};

export default useRowSelection;
