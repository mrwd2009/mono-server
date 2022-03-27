import { FC, memo } from 'react';
import { Collapse, Button, Dropdown, Menu, Select, Spin } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import Panel from '../../components/Panel';
import EllipsisTooltip from '../../components/EllipsisTooltip';
import ConfirmableInput from '../../components/ConfirmableInput';
import ConfirmableSelect from '../../components/ConfirmableSelect';
import ConfirmableCheckbox from '../../components/ConfirmableCheckbox';
import { useHookedModal } from '../../components/HookedModal';
import Empty from '../../components/Empty';
import { ReactComponent as BlockImg } from '../../assets/images/block.svg';
import { useAppSelector } from '../../hooks';
import { selectContractNode, selectCurrentVersionInfo} from './slices';
import { SelectedNode } from './slices/contract-node-slice';
import { useContractNodeBasic, useContractNodeDeletion } from './hooks';
import SaveContractNodeAs from './SaveContractNodeAs';

const Action = memo(() => {
  const nodeInfo = useAppSelector(selectContractNode);
  const versionInfo = useAppSelector(selectCurrentVersionInfo);
  const { loading, deleteContractNode } = useContractNodeDeletion();

  const saveAsModal = useHookedModal();

  if (versionInfo?.type === 'approved') {
    return (
      <Empty
      className="text-primary"
      size="xsmall"
      image={<BlockImg fill="currentColor" />}
      description="Editing Locked"
      />
    );
  }
  const handleSaveAs = () => {
    saveAsModal.changeVisible(true, {
      name: nodeInfo?.name,
      type: nodeInfo?.type === 'contract' ? 'instance' : 'umc',
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item key="node" onClick={handleSaveAs}>
        {nodeInfo?.type === 'contract' ? 'Contract' : 'Reusable Node'}
        <SaveContractNodeAs hookedModal={saveAsModal} />
      </Menu.Item>
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
        loading={loading}
        onClick={() => deleteContractNode()}
      >
        Delete
      </Button>
    </>
  );
});

const Basic = memo(({ node }: { node: SelectedNode }) => {
  const { loading, updateContractNode } = useContractNodeBasic();
  const versionInfo = useAppSelector(selectCurrentVersionInfo);
  const readonly = versionInfo?.type === 'approved';
  const nodeInfo = useAppSelector(selectContractNode);
  const showName = nodeInfo?.type !== 'reroute';
  const showChargeType = nodeInfo?.type === 'charge';
  return (
    <Spin spinning={loading}>
      {showName && <ConfirmableInput
        className="mb-2"
        label="Name"
        value={node.name}
        trim
        maxLength={50}
        allowSaveEmpty={false}
        required
        onChange={(value) => {
          updateContractNode('Name', value)
        }}
        readonly={readonly}
      />}
      {showChargeType && <ConfirmableSelect
        className="mb-2"
        label="Charge Type"
        value={node.chargeType}
        mode="multiple"
        confirm
        getPopupContainer={(currentNode: any) => currentNode.parentNode.parentNode}
        readonly={readonly}
      >
        {
          map(node.chargeTypeList, (item) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            )
          })
        }
      </ConfirmableSelect>}
      <ConfirmableCheckbox
        className="mb-2"
        value={node.hiddenFlag}
        readonly={readonly}
      >
        Mark As Ignored
      </ConfirmableCheckbox>
      <ConfirmableCheckbox
        // className="mb-2"
        value={node.hiddenFlag}
        readonly={readonly}
      >
        Mark As Boundled
      </ConfirmableCheckbox>
    </Spin>
  )
});

const Parameter = memo(() => {
  const versionInfo = useAppSelector(selectCurrentVersionInfo);
  const readonly = versionInfo?.type === 'approved';
  const options = [
    {
      dictionaryID: 3411,
      id: 40618,
      label: 'PPPC_Energy_Charge',
      value: 'PPPC_Energy_Charge',
    },
    {
      dictionaryID: 3703,
      id: 40619,
      label: 'PreviousBillingCycleSumKwhByChannel',
      value: 'PreviousBillingCycleSumKwhByChannel',
    },
    {
      dictionaryID: 3189,
      id: 40620,
      label: 'Program_Administration_Charge',
      value: 'Program_Administration_Charge',
    },
    {
      dictionaryID: 3339,
      id: 40621,
      label: 'PTR_ET',
      value: 'PTR_ET',
    },
    {
      dictionaryID: 2955,
      id: 40622,
      label: 'PUCRF',
      value: 'PUCRF',
    },
    {
      dictionaryID: 3579,
      id: 40623,
      label: 'PUCRF_Care',
      value: 'PUCRF_Care',
    },
    {
      dictionaryID: 3675,
      id: 40624,
      label: 'rate_version',
      value: 'rate_version',
    },
    {
      dictionaryID: 3187,
      id: 40625,
      label: 'RA_Ajustment',
      value: 'RA_Ajustment',
    },
    {
      dictionaryID: 3159,
      id: 40626,
      label: 'Renewable_Energy_Credits',
      value: 'Renewable_Energy_Credits',
    },
  ];
  const paramList = [
    {
      id: 6914135,
      inputType: 'dictionary',
      label: 'Bill Category',
      parameterDefID: 3,
      readonly: false,
      value: 'A/C Cycling Discount_Care',
      options,
    },
    {
      id: 6914133,
      inputType: 'dictionary',
      label: 'Billing Group',
      parameterDefID: 1,
      readonly: false,
      value: 'Bill_Display',
      options,
    },
    {
      id: 6914141,
      inputType: 'text',
      label: 'Billing Type (+,-)',
      parameterDefID: 11,
      readonly: false,
      value: '+',
    },
    {
      id: 6914134,
      inputType: 'dictionary',
      label: 'Bill Presentation Category',
      parameterDefID: 2,
      readonly: false,
      value: 'report',
      options,
    },
    {
      id: 6914160,
      inputType: 'dictionary',
      label: 'Bill Presentation Usage Unit',
      parameterDefID: 39,
      readonly: false,
      value: '',
    },
    {
      id: 6916187,
      inputType: 'dictionary',
      label: 'Run Type',
      parameterDefID: 97,
      readonly: false,
      value: '',
    },
    {
      id: 6914138,
      inputType: 'number',
      label: 'Precision For Cost',
      parameterDefID: 8,
      readonly: false,
      value: '3',
    },
  ];
  return (
    <>
      {map(paramList, (param) => {
        if (param.inputType === 'dictionary') {
          return (
            <ConfirmableSelect
              label={param.label}
              key={param.id}
              className="mb-2"
              allowCopy
              required
              value={param.value}
              help="Dictionary"
              filterLabel
              allowClear
              getPopupContainer={(node: any) => node.parentNode.parentNode}
              readonly={readonly}
            >
              {map(param.options, (item) => {
                return (
                  <Select.Option key={item.id} value={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </ConfirmableSelect>
          );
        }

        if (param.inputType === 'number') {
          return (
            <ConfirmableInput
              label={param.label}
              key={param.id}
              type="number"
              // className="mb-2"
              help="Number"
              required
              trim
              maxLength={500}
              value={param.value}
              readonly={readonly}
            />
          );
        }

        return (
          <ConfirmableInput
            label={param.label}
            key={param.id}
            className="mb-2"
            required
            trim
            maxLength={500}
            value={param.value}
            readonly={readonly}
          />
        );
      })}
    </>
  );
});

const ComputeRule = memo(() => {
  const versionInfo = useAppSelector(selectCurrentVersionInfo);
  const readonly = versionInfo?.type === 'approved';
  return (
    <>
      <Button
        size="small"
        block
        className="mb-2 text-left"
      >
        Show Rate Rule
      </Button>
      <Button
        size="small"
        block
        className="mb-2 text-left"
      >
        Show Aggregation Rule
      </Button>
      <Button
        size="small"
        block
        type="primary"
        className="mb-2 text-left"
        disabled={readonly}
      >
        Create Usage Rule
      </Button>
      <Button
        size="small"
        block
        className="text-left"
      >
        Show Cost Rule
      </Button>
    </>
  )
});

const ContractNode: FC = () => {
  const node = useAppSelector(selectContractNode)!;
  const nodeInfo = useAppSelector(selectContractNode);

  return (
    <Panel title={<EllipsisTooltip>{node.name}</EllipsisTooltip>}>
      <Collapse
        ghost
        defaultActiveKey={['action', 'basic']}
      >
        <Collapse.Panel
          header="Operation"
          key="action"
        >
          <Action />
        </Collapse.Panel>
        <Collapse.Panel
          header="Basic"
          key="basic"
        >
          <Basic node={node} />
        </Collapse.Panel>
        {(nodeInfo?.type === 'contract' || nodeInfo?.type === 'charge') && (
            <Collapse.Panel
              header="Parameter"
              key="parameter"
            >
              <Parameter />
            </Collapse.Panel>
          )}
        {nodeInfo?.type === 'charge' && (
          <Collapse.Panel
            header="Calculation Rule"
            key="rule"
          >
            <ComputeRule />
          </Collapse.Panel>
        )}
        {nodeInfo?.type === 'charge' && (
          <Collapse.Panel
            header="Condition"
            key="condition"
          >
            <ConfirmableInput
              value="true"
              buttons={[
                {
                  key: 'edit',
                  icon: <EditOutlined />,
                  title: 'Edit',
                  onClick: () => {},
                },
              ]}
            />
          </Collapse.Panel>
        )}
      </Collapse>
    </Panel>
  );
};

export default memo(ContractNode);