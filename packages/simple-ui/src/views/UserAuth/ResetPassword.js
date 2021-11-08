import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { getRouter } from '../../config/router';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import useResetPassword from './hooks/useResetPassword';

const { Title, Paragraph } = Typography;

const ResetPassword = () => {
  const {
    loading,
    handleReset,
  } = useResetPassword();
  return (
    <Card style={{ maxWidth: 360, margin: 'auto' }} className="login">
      <div className="login__logo-wrapper" style={{ textAlign: 'center' }}>
        <Logo title="SU Logo" className="login__logo" style={{ maxWidth: 80, margin: '24px auto 36px' }} />
      </div>
      <Title level={5}>Reset password</Title>
        <Paragraph>Fill in the form below to reset password.</Paragraph>
        <Form onFinish={handleReset} layout="vertical">
          <Form.Item name="Password" label="Password" rules={[
            {
              required: true,
              message: 'Please provide a password',
            },
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  return Promise.resolve();
                }
                if (value.length >= 11
                  && /[A-Z]+/.test(value)
                  && /[a-z]+/.test(value)
                  && /[0-9]+/.test(value)
                  && /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/.test(value)
                ) {
                  callback();
                } else {
                  callback('At least 11 characters with at least one capital letter, one lower case letter, one number, and one special character.');
                }
              },
            },
          ]}
          ><Input.Password size="large" /></Form.Item>
          <Form.Item name="ConfirmPassword" label="Confirm Password" rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Password and confirm password should be consistent.');
              },
            }),
          ]}
          ><Input.Password size="large" /></Form.Item>
          <Form.Item style={{ marginBottom: 12 }}>
            <Button type="primary" htmlType="submit" className="login-form-button" size="large" block loading={loading}>Reset Password</Button>
          </Form.Item>
          <Link to={getRouter('login').pathname}>Login</Link>
          <Link to={getRouter('register').pathname} style={{ float: 'right' }}>Register</Link>
        </Form>
    </Card>
  );
};
export default memo(ResetPassword);