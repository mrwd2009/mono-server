import { FC, memo } from 'react';
import { Form, Input } from 'antd';
import HookedModal, { HookedModalInstance } from '../../components/HookedModal';
import { useAppSelector } from '../../hooks';
import { selectSelectedId, selectSelectedVersion } from './slices';
import { useInsertInternalNode } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
}

const InsertExternalNode: FC<Props> = ({ hookedModal }) => {
  const {
    data,
  } = hookedModal;
  const {
    loading,
    createContractNode,
  } = useInsertInternalNode();
  const root = useAppSelector(selectSelectedId)!;
  const version = useAppSelector(selectSelectedVersion)!;

  return (
    <HookedModal
      title={data.type === 'contract' ? 'Create Contract' : 'Insert'}
      hookedModal={hookedModal}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(formData) => {
              createContractNode(
                { 
                  name: formData.name,
                  type: data.type,
                  sourceType: data.sourceType,
                  parent: data.parent,
                },
                root,
                version
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
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required.' }]}>
        <Input />
      </Form.Item>
    </HookedModal>
  );
};

export default memo(InsertExternalNode);