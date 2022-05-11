import { FC, memo, useEffect } from 'react';
import { Form, Select, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useOAuth2UserForm } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
  onSubmitted?: () => void;
}

const OAuth2UserForm: FC<Props> = ({ hookedModal, onSubmitted }) => {
  const {
    data: { type, id, email, name, roleId, enabled },
    visible,
  } = hookedModal;
  const { loading, submit, rolesLoading, getRoles, roles } = useOAuth2UserForm();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const titleMap = {
    edit: 'Edit Account',
    assignRole: 'Assign Role',
  };

  useEffect(() => {
    if (visible) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const enabledEle = (
    <Form.Item
      label="Status"
      name="enabled"
      initialValue={!!enabled}
    >
      <Radio.Group>
        <Radio value={true}>Activated</Radio>
        <Radio value={false}>Deactivated</Radio>
      </Radio.Group>
    </Form.Item>
  );

  const roleEl = (
    <Form.Item
      label="Role"
      name="roleId"
      initialValue={roleId}
    >
      <Select
        loading={rolesLoading}
        showSearch
        optionFilterProp="children"
        allowClear
      >
        {map(roles, (item) => {
          return (
            <Select.Option
              value={item.id}
              key={item.id}
            >
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <HookedModal
      title={(titleMap as any)[type]}
      hookedModal={hookedModal}
      modalRender={(node) => {
        return (
          <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            onFinish={(formData) => {
              submit(
                {
                  id,
                  ...formData,
                },
                type,
              ).then(() => {
                hookedModal.changeVisible(false);
                onSubmitted?.();
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
      {type === 'edit' && (
        <>
          <Form.Item
            label={t('fullName')}
          >
            <span className="ant-form-text">{name}</span>
          </Form.Item>
          <Form.Item
            label={t('email')}
          >
            <span className="ant-form-text">{email}</span>
          </Form.Item>
          {enabledEle}
          {roleEl}
        </>
      )}
      {type === 'assignRole' && roleEl}
    </HookedModal>
  );
};

export default memo(OAuth2UserForm);
