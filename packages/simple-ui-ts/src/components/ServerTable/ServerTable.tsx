import { memo, useMemo, useState, FC, createContext, useContext, useCallback, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { Table, TableProps, Input, Popover, InputNumber, AutoComplete, Select, Row, Col, Button, DatePicker, Tooltip } from 'antd';
import Icon, { SearchOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import map from 'lodash/map';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import debounce from 'lodash/debounce';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToWindowEdges, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import LRU from 'zrender/lib/core/LRU';
import Empty from '../Empty';
import { constants } from '../../config';
import { ReactComponent as DragVIcon } from '../../assets/images/direction/drag-vertical.svg';

declare module 'antd/lib/table/interface' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnType<RecordType> {
    cFilterType?: 'text' | 'number' | 'select' | 'autoComplete' | 'dateRange';
    cDataType?: 'datetime' | 'lgText';
    cFilterOptions?: Array<{ label: string; value: string | number } | number | string>;
    minWidth?: number;
    cEditable?: boolean;
    cResizable?: boolean;
    cFixedWidth?: boolean;
  }
}

let cache: any = null;
let measureDiv: any = null;
let thEle: any = null;
let tdEle: any = null;

const getColWidth = (text: any, isTitle = true) => {
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
    tdEle = measureDiv.querySelector('.virtual-rate-table-td');
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

const lgText = (title: string) => {
  return (msg: any) => {
    if (!msg || msg.length < 50) {
      return msg;
    }
    const content = (
      <Input.TextArea
        style={{ width: '300px' }}
        readOnly
        bordered={false}
        autoSize={{ maxRows: 6 }}
        value={msg}
      />
    );
    return (
      <Popover
        content={content}
        title={title}
      >
        {msg.slice(0, 50)}...
      </Popover>
    );
  };
};

export const getFileterDropdown = ({ cFilterType, cFilterOptions = [], title }: any) => {
  return ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
    let inputEle = null;
    // for different type inputs
    const handleChange = (event: any) => {
      let value = event;
      if (cFilterType === 'text') {
        value = event.target.value;
        if (!value) {
          return setSelectedKeys([]);
        }
      }
      if (cFilterType === 'number' && value === null) {
        return setSelectedKeys([]);
      }
      setSelectedKeys([value]);
    };
    const handlePressEnter = () => {
      confirm();
    };
    const inputProps = {
      className: 'mb-2 server-table-header-input',
      // size: 'small',
      value: selectedKeys[0] || '',
      placeholder: `Search ${title}`,
      onChange: handleChange,
    };
    // support [{label: 'label', value: 'value'}] and ['value1', 'value2'] formats;
    const getOptions = () => {
      return map(cFilterOptions, (option) => {
        if (isObject(option)) {
          return option;
        }
        return {
          label: option,
          value: option,
        };
      });
    };
    if (cFilterType === 'text') {
      inputEle = (
        <Input
          {...inputProps}
          onPressEnter={handlePressEnter}
        />
      );
    } else if (cFilterType === 'number') {
      inputEle = (
        <InputNumber
          {...inputProps}
          onPressEnter={handlePressEnter}
        />
      );
    } else if (cFilterType === 'select') {
      inputEle = (
        <Select
          {...inputProps}
          options={getOptions()}
        />
      );
    } else if (cFilterType === 'autoComplete') {
      inputEle = (
        <AutoComplete
          {...inputProps}
          options={getOptions()}
        />
      );
    } else if (cFilterType === 'dateRange') {
      inputEle = (
        <DatePicker.RangePicker
          className="mb-2 server-table-header-datepicker"
          onChange={inputProps.onChange}
          value={selectedKeys[0] || null}
        />
      );
    }
    return (
      <div className="server-table-header-filter">
        {inputEle}
        <Row gutter={8}>
          <Col span={12}>
            <Button
              size="small"
              block
              onClick={() => {
                clearFilters({ closeDropdown: true, confirm: true });
              }}
            >
              Reset
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              size="small"
              block
              icon={<SearchOutlined />}
              onClick={() => confirm()}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
};

const TableHeightContext = createContext<{
  height: number;
  updateHeight?: (h: number) => void;
}>({
  height: 420,
  updateHeight: (h) => {},
});

const DraggingContext = createContext<{
  hovered: boolean;
  height: number;
  left: number;
  width: number;
  uniqueResizableId?: string;
  dragging?: boolean;
  updateDraggedInfo?: (params: { hovered: boolean; height?: number; left?: number; width?: number }) => void;
}>({
  hovered: false,
  height: 0,
  left: 0,
  width: 0,
  updateDraggedInfo: () => {},
});

const getParentNode = (current: any, condition: (node: HTMLElement) => boolean): HTMLElement | undefined => {
  let node: HTMLElement = current;
  if (condition(node)) {
    return node;
  }
  while (node.parentNode) {
    node = node.parentNode as any;
    if (condition(node)) {
      return node;
    }
  }
};

const DraggableIcon: FC<any> = ({ headerId, widthInfo, updateColumnWidthInfo }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: headerId,
    data: {
      widthInfo,
      updateColumnWidthInfo,
    },
  });
  const { updateDraggedInfo, dragging } = useContext(DraggingContext);
  return (
    <span
      className="drag-icon"
      onMouseEnter={(event) => {
        if (dragging) {
          updateDraggedInfo!({
            hovered: true,
          });
          return;
        }
        const tableEl = getParentNode(event.target, (node) => {
          return node.classList.contains('ant-table');
        });
        const parentPos = tableEl!.getBoundingClientRect();
        const thEl = getParentNode(event.target, (node) => {
          return node.nodeName.toLowerCase() === 'th';
        });
        const childPos = thEl!.getBoundingClientRect();
        const height = parentPos.height;
        const left = childPos.right - parentPos.left;
        updateDraggedInfo!({
          hovered: true,
          left,
          height,
          width: childPos.width,
        });
      }}
      onMouseLeave={() => {
        updateDraggedInfo!({
          hovered: false,
        });
      }}
    >
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        <Icon component={DragVIcon} />
      </div>
    </span>
  );
};

const ResizeHeaderCell: FC<any> = ({ children, ...rest }) => {
  let dragIcon = null;
  if (!rest.className) {
    rest.className = '';
  }
  if (rest.appExResizable && !rest.appExResizable.fixed && rest.appExResizable.cResizable) {
    rest.className += ' has-drag-icon ';
    const { widthInfo, updateColumnWidthInfo } = rest.appExResizable;
    dragIcon = (
      <DraggableIcon
        headerId={rest.appExResizable.headerId}
        widthInfo={widthInfo}
        updateColumnWidthInfo={updateColumnWidthInfo}
      />
    );
  }
  delete rest.appExResizable;
  return (
    <th {...rest}>
      {children}
      {dragIcon}
    </th>
  );
};

const DraggableHeightIcon: FC<any> = ({ dragging, onHeight }) => {
  const { uniqueResizableId } = useContext(DraggingContext);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${uniqueResizableId}_h_indicator`,
  });
  return (
    <div
      className="app-ex-server-table-resizer"
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      onMouseEnter={(event) => {
        if (dragging) {
          return;
        }
        const tableEl = getParentNode(event.target, (node) => {
          return node.classList.contains('ant-table');
        });
        const parentPos = tableEl!.getBoundingClientRect();
        const theadEle = tableEl?.querySelector('thead');
        const theadPos = theadEle!.getBoundingClientRect();
        onHeight(parentPos.height - theadPos.height);
      }}
    >
      <div className="v-indicator" />
      <Icon component={DragVIcon} />
    </div>
  );
};

const ResizeTable: FC<any> = ({ resizeTabletype = 'table', children, ...rest }) => {
  const { left, hovered } = useContext(DraggingContext);
  const { height, updateHeight } = useContext(TableHeightContext);
  const [dragging, setDragging] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(height);
  const yRef = useRef(0);

  const restrictTableHeight = (params: any) => {
    if (!params.active) {
      return params.transform;
    }

    let y = params.transform?.y;
    if (y !== null) {
      if (currentHeight + y < 100) {
        y = 100 - currentHeight;
      }
    }
    yRef.current = y;
    return {
      ...params.transform,
      y,
    };
  };

  return (
    <>
      {
        resizeTabletype === 'table' ? (
          <table {...rest}>{children}</table>
        ) : (
          children
        )
      }
      {hovered && (
        <div
          style={{ top: 0, height: '100%', left }}
          className="app-ex-server-table-resizer-h-indicator"
        />
      )}
      <DndContext
        autoScroll={false}
        onDragStart={() => setDragging(true)}
        onDragEnd={(event) => {
          // it seems event.delta.y considered window.scrollY
          let y = yRef.current;
          let newHeight = y + currentHeight;
          if (y !== null) {
            if (currentHeight + y < 100) {
              newHeight = 100;
            }
          }
          updateHeight!(newHeight);
          setDragging(false);
        }}
        onDragCancel={() => setDragging(false)}
        modifiers={[restrictToVerticalAxis]}
      >
        <DraggableHeightIcon
          dragging={dragging}
          onHeight={(h: number) => setCurrentHeight(h)}
        />
        <DragOverlay
          dropAnimation={null}
          modifiers={[restrictToWindowEdges, restrictTableHeight]}
        >
          {dragging ? (
            <div className="app-ex-server-table-resizer hover">
              <div className="v-indicator" />
              <Icon component={DragVIcon} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

const ResizeWrapper: FC<any> = ({ children, uniqueResizableId }) => {
  const [dragging, setDragging] = useState(false);
  const [draggedInfo, setDraggedInfo] = useState({
    hovered: false,
    height: 0,
    left: 0,
    width: 0,
  });
  const contextValue = useMemo(() => {
    return {
      hovered: draggedInfo.hovered,
      height: draggedInfo.height,
      left: draggedInfo.left,
      width: draggedInfo.width,
      dragging,
      uniqueResizableId,
      updateDraggedInfo: (params: { hovered: boolean; height?: number; left?: number; width?: number }) => {
        setDraggedInfo({
          ...draggedInfo,
          ...params,
        });
      },
    };
  }, [draggedInfo, dragging, uniqueResizableId]);
  const xRef = useRef(0);

  const restrictColumnWidth = (params: any) => {
    if (!params.active) {
      return params.transform;
    }
    const widthInfo = params.active.data.current.widthInfo;
    const remainedX = draggedInfo.width - widthInfo.minWidth;
    let x = params.transform?.x;
    if (x !== null && x < -remainedX) {
      x = -remainedX;
    }
    xRef.current = x;
    return {
      ...params.transform,
      x,
    };
  };

  return (
    <DndContext
      onDragStart={() => setDragging(true)}
      onDragEnd={(event) => {
        if (!event.active.data.current) {
          return;
        }
        const { widthInfo, updateColumnWidthInfo } = event.active.data.current;
        const remainedX = draggedInfo.width - widthInfo.minWidth;
        // it seems event.delta.x considered window.scrollX
        const newWidth = draggedInfo.width + Math.max(-remainedX, xRef.current);
        updateColumnWidthInfo(newWidth);
        setDragging(false);
      }}
      onDragCancel={() => setDragging(false)}
      modifiers={[restrictToHorizontalAxis]}
    >
      <DraggingContext.Provider value={contextValue}>
        {children}
        <DragOverlay
          dropAnimation={null}
          modifiers={[restrictToWindowEdges, restrictColumnWidth]}
        >
          {dragging ? (
            <div className="app-ex-server-table-dragging-icon">
              <Icon component={DragVIcon} />
              <div
                style={{ top: -4, height: draggedInfo.height, right: -1.5 }}
                className="app-ex-server-table-resizer-h-indicator"
              ></div>
            </div>
          ) : null}
        </DragOverlay>
      </DraggingContext.Provider>
    </DndContext>
  );
};

interface ServerTableProps extends TableProps<any> {
  table: any;
  showLoading?: boolean;
  resizableCol?: boolean;
  resizableTableId?: string;
  virtualList?: boolean;
  virtualRowHeight?: number;
  onVirtualCellEdit?: (val: any, row: any, dataIndex: any, rowIndex: number) => void;
}

const EditableCell: FC<any> = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);
  useEffect(() => {
    if (editing) {
      setInput(value);
    }
  }, [editing, value]);
  const save = () => {
    if (input !== value) {
      onChange(input);
    }
  };
  if (editing) {
    return (
      <div className="virtual-rate-table-editing-cell">
        <Input
          size="small"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          // onBlur={() => {
          //   setEditing(false);
          //   save();
          // }}
          onKeyDown={(event) => {
            //Escape
            if (event.keyCode === 27) {
              setEditing(false);
              // prevent other effect like modal in outside.
              event.stopPropagation();
            } else if (event.keyCode === 13) {
              // Enter
              setEditing(false);
              save();
            }
          }}
        />
        <Tooltip title="Cancel">
          <CloseOutlined onClick={() => setEditing(false)} style={{ margin: '0 2px'}} />
        </Tooltip>
        <Tooltip title="Save">
          <CheckOutlined
            onClick={() => {
              setEditing(false);
              save();
            }}
          />
        </Tooltip>
      </div>
    );
  }
  return (
    <div className="virtual-rate-table-edit-cell">
      <div className="text-truncate">
        {value}
      </div>
      <EditOutlined onClick={() => setEditing(true)} />
    </div>
  );
};

const renderBody = (rawData: any, { scrollbarSize, ref, onScroll }: any, { newColumns, connected, rowHeight, gridRef, scrollY, tableWidth, onEdit } : any) => {
  if (!rawData.length) {
    return <Empty size="small" />;
  }
  const lastColIndex = newColumns.length - 1;
  const lastRowIndex = rawData.length - 1;
  ref.current = connected;
  const totalHeight = rowHeight * rawData.length;
  return (
    <ResizeTable resizeTabletype="virtual">
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
            // let changed = false;
            if (columnIndex === lastColIndex) {
              className += ' virtual-rate-table-last-col ';
              if (newColumns[columnIndex].align === 'right') {
                className += ' right ';
              }
              if (row.changed) {
                className += ' changed ';
                // changed = true;
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
                {/* {changed && <Tooltip title="Edited value"><span className="changed-mark" /></Tooltip>} */}
                {newColumns[columnIndex].cEditable ? <EditableCell value={cell} onChange={(newVal: any) => onEdit?.(newVal, row, dIndex, rowIndex)} /> : cell}
              </div>
            );
          }
        }
      </Grid>
    </ResizeTable>
  );
};

let ServerTable = ({
  table,
  rowKey = 'id',
  scroll = {},
  className = '',
  columns,
  pagination = {},
  showLoading = true,
  resizableCol = false,
  virtualList = false,
  virtualRowHeight = 31,
  resizableTableId = '',
  onVirtualCellEdit,
  ...rest
}: ServerTableProps) => {
  // in order to create a unique id
  const [uniqueResizableId] = useState(() => {
    if (resizableTableId) {
      return resizableTableId;
    }
    return `${new Date().getTime()}`;
  });

  const [tableHeight, setTableHeight] = useState(() => {
    if (scroll.y) {
      return scroll.y as number;
    }
    return 420;
  });
  const heightContextVal = useMemo(() => {
    return {
      height: tableHeight,
      updateHeight: (h: number) => {
        setTableHeight(h);
      },
    };
  }, [tableHeight]);

  const getHeaderId = useCallback(
    (col: any) => {
      return `${uniqueResizableId}_${isArray(col.dataIndex) ? col.dataIndex.join('_') : `${col.dataIndex}`}`;
    },
    [uniqueResizableId],
  );

  const getColWidthInfo = useCallback((col: any) => {
    let width = col.width;
    let minWidth = col.minWidth;
    if (!minWidth) {
      if (isString(col.title)) {
        // it's better to calculate by real size.
        minWidth = getColWidth(col.title) + 42;
      } else {
        minWidth = 80;
      }
    }
    return {
      width: width || minWidth,
      minWidth,
    };
  }, []);

  const [columnWidthInfo, setColumnWidthInfo] = useState(() => {
    let info: any = {};
    forEach(columns, (col) => {
      const headerId = getHeaderId(col);
      info[headerId] = getColWidthInfo(col);
    });
    return info;
  });

  const { sorter, page, pageSize, total, list, loading, onChange, rawPostData } = table;

  const { hasFixedCol, newColumns } = useMemo(() => {
    let _hasFixedCol = false;
    const _newColumns = columns!.map((col: any) => {
      let colDef = col;
      if (resizableCol) {
        const headerId = getHeaderId(col);
        colDef.ellipsis = true;
        if (!columnWidthInfo[headerId]) {
          columnWidthInfo[headerId] = getColWidthInfo(col);
        }
        colDef.width = columnWidthInfo[headerId].width;
        colDef.onHeaderCell = (headerCol: any) => {
          return {
            appExResizable: {
              headerId,
              fixed: colDef.fixed,
              cResizable: colDef.cResizable !== false,
              widthInfo: columnWidthInfo[headerId],
              updateColumnWidthInfo: (newWidth: number) => {
                setColumnWidthInfo({
                  ...columnWidthInfo,
                  [headerId]: {
                    ...columnWidthInfo[headerId],
                    width: Math.round(newWidth),
                  },
                });
              },
            },
          };
        };
      }
      if (!_hasFixedCol && colDef.fixed) {
        _hasFixedCol = true;
      }
      if (colDef.sorter) {
        colDef = {
          ...colDef,
          sortOrder: sorter.field === colDef.dataIndex && sorter.order,
        };
      }

      // support for inline filter, native dropdown filter or custom filter
      if (colDef.dataIndex && (colDef.filters || colDef.cFilterType)) {
        const filter = (rawPostData && rawPostData.filter) || {};
        const filteredValue = filter[colDef.dataIndex] || [];
        // dropdown list for filter
        if (colDef.filters) {
          // default filter value should be 'null', otherwise hiding empty filter will trigger searching
          colDef.filteredValue = filteredValue.length ? filteredValue : null;
        } else if (colDef.cFilterType) {
          // avoid render temp selected key to be cleared
          colDef.filteredValue = filteredValue.length ? filteredValue : null;
          // colDef.filterIcon = (filtered: any) => <SearchOutlined style={{ color: filtered ? '#fff' : undefined, fontSize: '16px' }} />
          colDef.filterDropdown = getFileterDropdown(colDef);
        }
      }

      if (colDef.cDataType === 'datetime') {
        colDef.render = (val: any) => val && dayjs(val).format(constants.dateFormat);
      } else if (colDef.cDataType === 'lgText') {
        if (!resizableCol) {
          colDef.width = 100;
          colDef.render = lgText(colDef.title);
        }
      }

      return colDef;
    });
    return {
      hasFixedCol: _hasFixedCol,
      newColumns: _newColumns,
    };
  }, [columns, sorter, rawPostData, resizableCol, columnWidthInfo, getHeaderId, getColWidthInfo]);

  const [tableWidth, _setTableWidth] = useState(0);
  const gridRef = useRef(null);
  const [connected] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          (gridRef.current as any).scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const setTableWidth = useMemo(() => debounce((width: number) => {
    _setTableWidth(width);
  }, 300, { leading: true, trailing: true }), []);

  useEffect(() => {
    // clear timer after unmounting
    return () => {
      setTableWidth.cancel();
    };
  }, [setTableWidth]);

  const rawTotal = useMemo(() => {
    if (!resizableCol) {
      return 0;
    }
    let total = 0;
    let cols = map(newColumns, (col) => {
      let width = col.width;
      total += width;
      return {
        rawCol: col,
        width,
      };
    });
    if (total <= tableWidth) {
      let ac = 0;
      let newTableWidth = tableWidth;
      const changeableCols = filter(cols, (col) => {
        if (col.rawCol.cFixedWidth) {
          newTableWidth -= col.width;
          return false;
        }
        return true;
      });
      forEach(changeableCols, (col, index) => {
        let width = col.width;
        if (index === cols.length - 1) {
          // 1px to disable scroll
          width = newTableWidth - ac - 1;
        } else {
          width = Math.round(width / total * newTableWidth);
        }
        ac += width;
        const headerId = getHeaderId(col.rawCol);
        col.rawCol.width = width;
        columnWidthInfo[headerId].width = width;
      });
    }
    return total;
  }, [newColumns, tableWidth, resizableCol, columnWidthInfo, getHeaderId]);

  useEffect(() => {
    if (!virtualList || !resizableCol) {
      return;
    }
    if (gridRef.current) {
      (gridRef.current as any).resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      });
    }
    // perhaps tableWidth is not changed, but rawTotal is changed.
  }, [tableWidth, rawTotal, virtualList, resizableCol]);

  let components: any;
  if (resizableCol) {
    scroll.y = tableHeight;
    let x = 0;
    forEach(columnWidthInfo, (info) => {
      x += info.width;
    });
    if (rest.rowSelection) {
      x += 28;
    }
    scroll.x = x;
    className += ' resize-col-server-table ';
    components = {
      table: ResizeTable,
      header: {
        cell: ResizeHeaderCell,
      },
    };

    if (virtualList) {
      className += ' virtual-rate-table ';
      let virtualHeight = scroll.y;
      if (list.length === 0) {
        // for empty placeholder
        virtualHeight = 70;
      } else if (list.length * virtualRowHeight < virtualHeight) {
        virtualHeight = list.length * virtualRowHeight;
      }
      components.body = (rawData: any, bodyConf: any) => {
        return renderBody(rawData, bodyConf, {
          newColumns,
          connected,
          rowHeight: virtualRowHeight,
          gridRef,
          scrollY: virtualHeight,
          tableWidth,
          onEdit: onVirtualCellEdit,
        });
      }
    }
  } else {
    if (!scroll.x && !scroll.y && !hasFixedCol) {
      // show scrollbar if table width is larger than container
      className += ' overflow-server-table ';
    }

    if (scroll.y == null && hasFixedCol) {
      // we can only make horizontal scroll function work as expected when y is not set
      className += ' scroll-v-server-table ';
      scroll.x = 20;
    }
  }

  let pageProps = {
    pageSize,
    current: page,
    total,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    ...pagination,
    // showQuickJumper: true
  };

  // hide pagination according to size changer
  if (!pageProps.showSizeChanger) {
    pageProps.hideOnSinglePage = true;
  }

  const tableEl = (
    <Table
      className={`server-table nowrap-table ${className}`}
      bordered
      size="small"
      loading={showLoading && loading}
      rowKey={rowKey}
      columns={newColumns}
      dataSource={list}
      pagination={pageProps}
      onChange={onChange}
      scroll={scroll}
      components={components}
      {...rest}
    />
  );

  if (resizableCol) {
    return (
      <ResizeObserver onResize={({ width }) => setTableWidth(width)}>
        <ResizeWrapper uniqueResizableId={uniqueResizableId}>
          <TableHeightContext.Provider value={heightContextVal}>{tableEl}</TableHeightContext.Provider>
        </ResizeWrapper>
      </ResizeObserver>
    );
  }

  return tableEl;
};

export default memo(ServerTable);
