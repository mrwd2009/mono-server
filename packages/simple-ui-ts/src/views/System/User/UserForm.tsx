import { FC, memo } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import HookedModal, { HookedModalInstance } from '../../../components/HookedModal';
import { useUserForm } from './hooks';

interface Props {
  hookedModal: HookedModalInstance;
  onSubmitted?: () => void;
}

const UserForm: FC<Props> = ({ hookedModal, onSubmitted }) => {
  const {
    data: { type, id, email, displayName },
  } = hookedModal;
  const { loading, submit } = useUserForm();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <HookedModal
      title={type === 'add' ? 'Add Account' : 'Edit Account'}
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
      <Form.Item
        label={t('email')}
        name="email"
        initialValue={email}
        hidden={type === 'edit'}
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
    </HookedModal>
  );
};

export default memo(UserForm);
