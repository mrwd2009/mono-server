import { FC, memo } from 'react';
import { Form, Input, Radio } from 'antd';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useCreateRoleMutation } from './services';

interface Props {
  hookedModal: HookedModalInstance;
}

const CreateRole: FC<Props> = ({ hookedModal }) => {
  const { data } = hookedModal;
  const [createRole, { isLoading }] = useCreateRoleMutation();
  return (
    <HookedModal
      title="New Role"
      hookedModal={hookedModal}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              createRole({
                targetId: data.key || -1,
                position: 'child',
                enabled: formData.enabled,
                name: formData.name,
                description: formData.description,
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
        loading: isLoading,
      }}
    >
      {data?.name && (
        <Form.Item label="Parent">
          <span className="ant-form-text">{data.name}</span>
        </Form.Item>
      )}
      <Form.Item
        label="Status"
        name="enabled"
        initialValue={true}
      >
        <Radio.Group>
          <Radio value={true}>Enabled</Radio>
          <Radio value={false}>Disabled</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Name is required.' }]}
      >
        <Input
          maxLength={50}
          showCount
        />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required.' }]}
      >
        <Input.TextArea
          maxLength={300}
          showCount
          rows={4}
        />
      </Form.Item>
    </HookedModal>
  );
};

export default memo(CreateRole);
