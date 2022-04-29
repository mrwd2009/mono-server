import { FC, memo } from 'react';
import { Form, Input, Select } from 'antd';
import { FolderOutlined, LockOutlined } from '@ant-design/icons';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useCreatePermissionMutation } from './services';

interface Props {
  hookedModal: HookedModalInstance;
}

const CreatePermission: FC<Props> = ({ hookedModal }) => {
  const { data } = hookedModal;
  const [createPermission, { isLoading }] = useCreatePermissionMutation();
  return (
    <HookedModal
      title="New Permission"
      hookedModal={hookedModal}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              createPermission({
                targetId: data.key || -1,
                position: 'child',
                type: formData.type,
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
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Type is required.' }]}
      >
        <Select>
          <Select.Option value="category">
            <FolderOutlined className="mr-1" />
            Category
          </Select.Option>
          <Select.Option value="permission">
            <LockOutlined className="mr-1" />
            Permission
          </Select.Option>
        </Select>
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

export default memo(CreatePermission);
