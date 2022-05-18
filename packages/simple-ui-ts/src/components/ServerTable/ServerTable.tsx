import { memo, useMemo, useState, FC, createContext, useContext, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { Table, TableProps, Input, Popover, InputNumber, AutoComplete, Select, Row, Col, Button } from 'antd';
import Icon, { SearchOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToWindowEdges, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import LRU from 'zrender/lib/core/LRU';
import { constants } from '../../config';
import { ReactComponent as DragVIcon } from '../../assets/images/direction/drag-vertical.svg';

declare module 'antd/lib/table/interface' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnType<RecordType> {
    cFilterType?: 'text' | 'number' | 'select' | 'autoComplete';
    cDataType?: 'datetime' | 'lgText';
    cFilterOptions?: Array<{ label: string; value: string | number } | number | string>;
    minWidth?: number;
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
  if (rest.appExResizable && !rest.appExResizable.fixed) {
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

const ResizeTable: FC<any> = ({ children, ...rest }) => {
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
      <table {...rest}>{children}</table>
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
}

let ServerTable = ({
  table,
  rowKey = 'id',
  scroll = {},
  className = '',
  columns,
  pagination = {},
  showLoading = true,
  resizableCol = false,
  resizableTableId = '',
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

  const [columnWidthInfo, setColumnWidthInfo] = useState(() => {
    let info: any = {};
    forEach(columns, (col) => {
      const headerId = getHeaderId(col);
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
      info[headerId] = {
        width: width || minWidth,
        minWidth,
      };
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
        colDef.width = columnWidthInfo[headerId].width;
        colDef.onHeaderCell = (headerCol: any) => {
          return {
            appExResizable: {
              headerId,
              fixed: colDef.fixed,
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
  }, [columns, sorter, rawPostData, resizableCol, columnWidthInfo, getHeaderId]);

  let components;
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
      <ResizeWrapper uniqueResizableId={uniqueResizableId}>
        <TableHeightContext.Provider value={heightContextVal}>{tableEl}</TableHeightContext.Provider>
      </ResizeWrapper>
    );
  }

  return tableEl;
};

export default memo(ServerTable);
