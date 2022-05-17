import { memo, FC } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, Col, Checkbox, Button, Tooltip, Popover } from 'antd';
import { HolderOutlined, SettingOutlined } from '@ant-design/icons';
import map from 'lodash/map';

interface ColDef {
  title: string;
  key: string;
  visible: boolean;
  fixed: boolean;
}

type OnColPositionChangeFn = (params: { activeId: string, overId: string }) => void;
type OnColVisibleChangeFn = (params: { id: string, visible: boolean }) => void;

interface Setting {
  cols: ColDef[];
  allChecked: boolean;
  onColPositionChange: OnColPositionChangeFn;
  onColVisibleChange: OnColVisibleChangeFn;
  onCheckAll: (checked: boolean) => void;
  onReset: () => void;
}

const DraggableHandle: FC<{ id: string }> = ({ id }) => {
  const {
    attributes,
    listeners,
  } = useSortable({ id });
  return (
    <HolderOutlined
      style={{ cursor: 'grab' }}
      {...attributes}
      {...listeners}
    />
  );
};

const ColumnItem: FC<{ col: ColDef, onColVisibleChange: OnColVisibleChangeFn}> = ({ col, onColVisibleChange }) => {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: col.key });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Row wrap={false} gutter={[8, 8]} ref={col.fixed ? null : setNodeRef} style={col.fixed ? {} : style} className={`hoverable-item ${isDragging ? 'border-light' : ''}`}>
      <Col flex="none">
        {
          col.fixed ? (
            <HolderOutlined className="invisible" />
          ) : (
            <DraggableHandle id={col.key} />
          )
        }
      </Col>
      <Col flex="auto">
        <Checkbox checked={col.visible} onChange={event => onColVisibleChange({ id: col.key, visible: event.target.checked })}>{col.title}</Checkbox>
      </Col>
    </Row>
  );
};

const ColumnList: FC<Pick<Setting, 'cols' | 'onColPositionChange' | 'onColVisibleChange'>> = ({ cols, onColPositionChange, onColVisibleChange }) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={event => {
        if (event.over) {
          onColPositionChange({ activeId: event.active.id, overId: event.over.id });
        }
      }}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={map(cols, 'key')}
      >
        {
          map(cols, (col) => {
            return <ColumnItem key={col.key} col={col} onColVisibleChange={onColVisibleChange} />;
          })
        }
      </SortableContext>
    </DndContext>
  )
};

const ColumnSetting: FC<{ title?: string, setting: Setting }> = ({ title = 'Setting', setting }) => {
  const popTitle = (
    <Row justify="space-between" gutter={8}>
      <Col flex="none">
        <Checkbox checked={setting.allChecked} onChange={event => setting.onCheckAll(event.target.checked)}>Columns Visibility</Checkbox>
      </Col>
      <Col flex="none">
        <Button
          type="link"
          size="small"
          onClick={() => setting.onReset()}
        >
          Reset
        </Button>
      </Col>
    </Row>
  );
  const content = (
    <ColumnList cols={setting.cols} onColPositionChange={setting.onColPositionChange} onColVisibleChange={setting.onColVisibleChange} />
  );
  return (
    <Tooltip title={title}>
      <Popover arrowPointAtCenter trigger="click" placement="bottomRight" title={popTitle} content={content}>
        <Button
          type="text"
          size="small"
          icon={<SettingOutlined />}
        />
      </Popover>
    </Tooltip>
  );
};

export default memo(ColumnSetting);