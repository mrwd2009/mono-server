import React, { memo, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Table, Empty, InputNumber } from 'antd';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import LRU from 'zrender/lib/core/LRU';
import map from 'lodash/map';
import lFilter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import every from 'lodash/every';
import forEach from 'lodash/forEach';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import isNumber from 'lodash/isNumber';
import { getFileterDropdown } from '../../components/ServerTable';
import './index.less';

let cache = null;
let measureDiv = null;
let thEle = null;
let tdEle = null;

const getColWidth = (text, isTitle = false) => {
  if (!cache) {
    cache = new LRU(500);
  }
  if (!measureDiv) {
    measureDiv = document.createElement('div');
    measureDiv.innerHTML = `
    <div class="virtual-rate-table" style="position: absolute; top: -200px; z-index: -100;">
      <div class="ant-table ant-table-small ant-table-fixed-header">
        <table>
          <thead class="ant-table-thead">
            <tr>
              <th class="ant-table-cell"></th>
            </tr>
          </thead>
        </table>
        <div class="virtual-rate-table-body">
          <div class="virtual-rate-table-td">
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.appendChild(measureDiv);
    thEle = measureDiv.querySelector('.ant-table-cell');
    tdEle = measureDiv.querySelector('.virtual-rate-table-td')
  }
  if (isTitle) {
    const key = `h_${text}`;
    let width = cache.get(key);
    if (width == null) {
      // they influence each other width, we need to reset one text
      if (tdEle.textContent !== null) {
        tdEle.textContent = null;
      }
      thEle.textContent = text;
      width = thEle.offsetWidth;
      cache.put(key, width);
    }
    return width;
  }
  const key = `d_${text}`;
  let width = cache.get(key);
  if (width == null) {
    // they influence each other width, we need to reset one text
    if (thEle.textContent !== null) {
      thEle.textContent = null;
    }
    tdEle.textContent = text;
    width = tdEle.offsetWidth;
    cache.put(key, width);
  }
  return width;
};

const EditableCell = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);
  useEffect(() => {
    if (editing) {
      setInput(value);
    }
  }, [editing, value]);
  const save = () => {
    if (!isNumber(input)) {
      return;
    }
    if (input !== value) {
      onChange(input);
    }
  };
  if (editing) {
    return (
      <InputNumber
        style={{ width: '100%'} }
        size="small"
        autoFocus
        value={input}
        onChange={val => setInput(val)}
        onBlur={() => {
          setEditing(false);
          // "blur" means giving up changed value
          // save()
        }}
        onKeyDown={(event) => {
          //Escape
          if (event.keyCode === 27) {
            setEditing(false);
            // prevent other effect like modal in outside.
            event.stopPropagation();
          } else if (event.keyCode === 13) { // Enter
            setEditing(false);
            save();
          }
        }}
      />
    );
  }
  return (
    <div className="virtual-rate-table-edit-cell">
      {value}
      <EditOutlined onClick={() => setEditing(true)} />
    </div>
  );
};

// handle filter, sorter
const useRateTable = ({ columns, dataSource }) => {
  const [filter, setFilter] = useState({});
  const [sorter, setSorter] = useState({});
  const newColumns = useMemo(() => {
    return map(columns, col => {
      let colDef = col;
      if (colDef.sorter) {
        colDef = {
          ...colDef,
          sortOrder: sorter.field === colDef.dataIndex && sorter.order,
        };
      }
      const filtered = filter[colDef.dataIndex] || [];
      if (col.filter) {
        colDef.filteredValue = filtered.length ? filtered : null;
        colDef.filterIcon = f => <SearchOutlined style={{ color: f ? '#fff' : undefined, fontSize: '16px' }} />
        colDef.filterDropdown = getFileterDropdown({
          title: colDef.title,
          cFilterType: 'text',
        });
      }
      return colDef;
    });
  }, [columns, filter, sorter]);
  const handleChange = useCallback((_page, _filter, _sorter, { action }) => {
      if (action === 'sort') {
        setSorter(_sorter);
      }
      if (action === 'filter') {
        setFilter(_filter);
      }
  }, []);

  const newDataSource = useMemo(() => {
    let list = lFilter(dataSource, item => {
      return every(columns, col => {
        const filtered = filter[col.dataIndex] && filter[col.dataIndex].length && filter[col.dataIndex][0];
        if (!filtered) {
          return true;
        }
        if (!item[col.dataIndex]) {
          return false;
        }
        return item[col.dataIndex].includes(filtered);
      });
    });

    if (sorter.field && sorter.order) {
      list = orderBy(list, [sorter.field], [sorter.order === 'ascend' ? 'asc' : 'desc']);
    }
    return list;
  }, [filter, sorter, dataSource, columns]);

  return {
    columns: newColumns,
    handleChange,
    dataSource: newDataSource,
  };
};

const RateTable = ({columns: outerColumns, dataSource: ourterDataSource, scroll = { y: 400 }, onEdit = noop}) => {
  const {
    columns,
    dataSource,
    handleChange,
  } = useRateTable({ columns: outerColumns, dataSource: ourterDataSource });

  const [tableWidth, _setTableWidth] = useState(0);
  const gridRef = useRef(null);
  const [connected] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const setTableWidth = useCallback(debounce((width) => {
    _setTableWidth(width);
  }, 300, { leading: true, trailing: true }), [_setTableWidth]);

  useEffect(() => {
    // clear timer after unmounting
    return () => {
      setTableWidth.cancel();
    };
  }, [setTableWidth]);

  const {
    newColumns,
    rawTotal,
   } = useMemo(() => {
    let total = 0;
    let cols = map(columns, (col) => {
      let width = getColWidth(col.title, true);
      if (col.sorter) {
        // for sorter icon width
        width += 11;
      }
      if (col.filter) {
        // for filter icon width
        width += 28;
      }
      forEach(dataSource, (data) => {
        let colWidth = getColWidth(data[col.dataIndex], false);
        if (col.editable) {
          // give a space for edit icon
          colWidth += 12;
        }
        width = Math.max(width, colWidth);
      });
      total += width;
      return {
        ...col,
        width,
      };
    });
    if (total <= tableWidth) {
      let ac = 0;
      cols = map(cols, (col, index) => {
        let width = col.width;
        if (index === cols.length - 1) {
          width = tableWidth - ac;
        } else {
          width = Math.round(width / total * tableWidth);
        }
        ac += width;
        return {
          ...col,
          width,
        };
      })
    }
    return {
      newColumns: cols,
      rawTotal: total,
    };
  }, [columns, dataSource, tableWidth]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      });
    }
    // perhaps tableWidth is not changed, but rawTotal is changed.
  }, [tableWidth, rawTotal]);
  const rowHeight = 39;
  let scrollY = scroll.y;
  if (dataSource.length === 0) {
    // for empty placeholder
    scrollY = 70;
  } else if (dataSource.length * rowHeight < scrollY) {
    scrollY = dataSource.length * rowHeight;
  }
  const renderBody = (rawData, { scrollbarSize, ref, onScroll }) => {
    if (!rawData.length) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
    const lastColIndex = newColumns.length - 1;
    const lastRowIndex = rawData.length - 1;
    ref.current = connected;
    const totalHeight = rowHeight * rawData.length;
    return (
      <Grid
        ref={gridRef}
        className="virtual-rate-table-body"
        columnCount={newColumns.length}
        columnWidth={(index) => {
          const width = newColumns[index].width;
          if (totalHeight > scrollY && index === lastColIndex) {
            return width - scrollbarSize - 1;
          }
          return width;
        }}
        height={scrollY}
        rowCount={rawData.length}
        rowHeight={() => rowHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }) => onScroll({ scrollLeft })}
      >
        {
          ({ columnIndex, rowIndex, style }) => {
            let cell;
            const dIndex = newColumns[columnIndex].dataIndex;
            const row = rawData[rowIndex];
            if (newColumns[columnIndex].render) {
              cell = newColumns[columnIndex].render(dIndex ? row[dIndex] : row, row, columnIndex);
            } else {
              cell = row[dIndex];
            }
            let className = 'virtual-rate-table-td ';
            if (columnIndex === lastColIndex) {
              className += ' virtual-rate-table-last-col ';
              if (row.changed) {
                className += ' changed ';
              }
            }
            if (rowIndex === lastRowIndex) {
              className += ' virtual-rate-table-last-row ';
            }
            return (
              <div
                className={className}
                style={style}
              >
                {newColumns[columnIndex].editable ? <EditableCell value={cell} onChange={(newVal) => onEdit(newVal, row, dIndex, rowIndex)} /> : cell}
              </div>
            );
          }
        }
      </Grid>
    );
  };
  return (
    <ResizeObserver onResize={({ width }) => setTableWidth(width)}>
      <Table
        bordered
        scroll={{
          y: scrollY,
        }}
        size="small"
        dataSource={dataSource}
        columns={newColumns}
        className="virtual-rate-table"
        pagination={false}
        components={{
          body: renderBody,
        }}
        onChange={handleChange}
      />
    </ResizeObserver>
  );
};

export default memo(RateTable);