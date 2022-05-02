import { FC, memo, useEffect, useRef } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import includes from 'lodash/includes';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useUserForm } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
  onSubmitted?: () => void;
}

const UserForm: FC<Props> = ({ hookedModal, onSubmitted }) => {
  const {
    data: { type, id, email, displayName, roleId, enabled },
    visible,
  } = hookedModal;
  const { loading, submit, rolesLoading, getRoles, roles } = useUserForm();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const titleMap = {
    add: 'Add Account',
    edit: 'Edit Account',
    password: 'Change Password',
    assignRole: 'Assign Role',
  };

  const typeRef = useRef(type);
  typeRef.current = type;

  useEffect(() => {
    if (visible && includes(['add', 'edit', 'assignRole'], typeRef.current)) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const nameEle = (
    <Form.Item
      label={t('fullName')}
      name="displayName"
      initialValue={displayName}
      rules={[
        {
          required: true,
          message: t('requiredName'),
        },
      ]}
    >
      <Input
        autoComplete="off"
        maxLength={50}
        placeholder={t('inputName')}
      />
    </Form.Item>
  );

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

  const passwordEles = (
    <>
      <Form.Item
        label={t('password')}
        name="password"
        rules={[
          {
            required: true,
            message: t('requiredPassword'),
          },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return Promise.resolve();
              }
              if (
                value.length >= 11 &&
                /[A-Z]+/.test(value) &&
                /[a-z]+/.test(value) &&
                /[0-9]+/.test(value) &&
                /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/.test(value)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(t('passwordHelp'));
            },
          },
        ]}
      >
        <Input.Password
          id="password"
          name="password"
          maxLength={50}
          autoComplete="off"
          type="password"
          placeholder="Enter your password"
        />
      </Form.Item>
      <Form.Item
        label={t('passConfirmation')}
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: t('requiredPassConfirm'),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(t('errorPassConfirm'));
            },
          }),
        ]}
      >
        <Input.Password
          id="confirm"
          name="confirm"
          maxLength={50}
          autoComplete="off"
          type="password"
          placeholder={t('inputConfirmation')}
        />
      </Form.Item>
    </>
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
      {type === 'add' && (
        <>
          {nameEle}
          {enabledEle}
          {roleEl}
          <Form.Item
            label={t('email')}
            name="email"
            initialValue={email}
            rules={[
              {
                required: true,
                type: 'email',
                message: t('requiredEmail'),
              },
            ]}
          >
            <Input
              id="username"
              name="username"
              maxLength={50}
              autoComplete="off"
              placeholder={t('inputEmail')}
            />
          </Form.Item>
          {passwordEles}
        </>
      )}
      {type === 'edit' && (
        <>
          <Form.Item
            label={t('fullName')}
            name="displayName"
            initialValue={displayName}
            rules={[
              {
                required: true,
                message: t('requiredName'),
              },
            ]}
          >
            <Input
              autoComplete="off"
              maxLength={50}
              placeholder={t('inputName')}
            />
          </Form.Item>
          {enabledEle}
          {roleEl}
        </>
      )}
      {type === 'password' && passwordEles}
      {type === 'assignRole' && roleEl}
    </HookedModal>
  );
};

export default memo(UserForm);
