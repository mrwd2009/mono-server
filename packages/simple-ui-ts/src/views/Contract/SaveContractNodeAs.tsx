import { FC, memo } from 'react';
import { Form, Input } from 'antd';
import HookedModal, { HookedModalInstance } from '../../components/HookedModal';
import { useContractNodeSave } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
}

const SaveContractNodeAs: FC<Props> = ({ hookedModal }) => {
  const {
    data,
  } = hookedModal;
  const {
    loading,
    saveContractNode
  } = useContractNodeSave();

  return (
    <HookedModal
      title="Save As"
      hookedModal={hookedModal}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              saveContractNode(
                { 
                  name: formData.name,
                  type: data.type,
                },
              )
                .then(() => {
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
      <Form.Item initialValue={data.name} label="Name" name="name" rules={[{ required: true, message: 'Name is required.' }]}>
        <Input />
      </Form.Item>
    </HookedModal>
  );
};

export default memo(SaveContractNodeAs);