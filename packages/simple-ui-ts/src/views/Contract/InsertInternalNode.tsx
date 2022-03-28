import { FC, memo } from 'react';
import { Form, Radio } from 'antd';
import HookedModal, { HookedModalInstance } from '../../components/HookedModal';
import { useContractNodeReparent } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
}

const InsertInternalNode: FC<Props> = ({ hookedModal }) => {
  const { data } = hookedModal;
  const { loading, reparentContractNode, redrawContractTree } = useContractNodeReparent();

  return (
    <HookedModal
      title="Insert"
      hookedModal={hookedModal}
      onCancel={() => redrawContractTree()}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              reparentContractNode({
                position: formData.position,
                sourceID: data.sourceID,
                targetID: data.targetID,
              }).then(() => {
                hookedModal.changeVisible(false);
              });
            }}
          >
            {node}
          </Form>
        );
      }}
      okButtonProps={{
        htmlType: 'submit',
        loading,
      }}
    >
      <Form.Item
        label="Position"
        name="position"
        initialValue="below"
      >
        <Radio.Group>
          <Radio value="above">Above</Radio>
          {data.targetType !== 'charge' && <Radio value="child">Descendant</Radio>}
          <Radio value="below">Below</Radio>
        </Radio.Group>
      </Form.Item>
    </HookedModal>
  );
};

export default memo(InsertInternalNode);
