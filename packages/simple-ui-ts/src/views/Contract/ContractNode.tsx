import { FC, memo } from 'react';
import { Collapse, Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import Panel from '../../components/Panel';
import EllipsisTooltip from '../../components/EllipsisTooltip';
import { useAppSelector } from '../../hooks';
import { selectContractNode } from './slices';

const Action = memo(() => {
  const overlay = (
    <Menu>
      <Menu.Item>Reusable Node</Menu.Item>
    </Menu>
  )
  return (
    <>
      <Dropdown overlay={overlay}>
        <Button size="small" block className="mb-2">
          Save As <DownOutlined />
        </Button>
      </Dropdown>
      <Button
        size="small"
        icon={<DeleteOutlined />}
        danger
        block
      >
        Delete
      </Button>
    </>
  );
});

const ContractNode: FC = () => {
  const node = useAppSelector(selectContractNode)!;

  return (
    <Panel
      title={<EllipsisTooltip>{node.name}</EllipsisTooltip>}
    >
      <Collapse
        ghost
        defaultActiveKey={['action']}
      >
        <Collapse.Panel
          header="Operation"
          key="action"
        >
          <Action />
        </Collapse.Panel>
        <Collapse.Panel
          header="Basic"
          key="Basic"
        >
        </Collapse.Panel>
        <Collapse.Panel
          header="Parameter"
          key="parameter"
        >
        </Collapse.Panel>
        <Collapse.Panel
          header="Calculation Rule"
          key="rule"
        >
        </Collapse.Panel>
        <Collapse.Panel
          header="Condition"
          key="condition"
        >
        </Collapse.Panel>
      </Collapse>
    </Panel>
  );
};

export default memo(ContractNode);