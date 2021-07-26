import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { getRouter } from '../../config/router';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import useForgotPassword from './hooks/useForgotPassword';

const { Title, Paragraph } = Typography;

const ForgotPassword = () => {
    const {
      loading,
      forgot,
      handleForgot,
    } = useForgotPassword();
  let outputEle = null;
  if (forgot) {
    outputEle = (
      <>
        <Title level={5}>An email has been sent</Title>
        <Paragraph>We’ve sent you an email with a link to finish resetting your password. Can’t find the email? Try checking your spam folder. If you still can’t log in, please contact support.</Paragraph>
        <Link to={getRouter('login').pathname}>Return to login</Link>
      </>
    );
  } else {
    outputEle = (
      <>
        <Title level={5}>Forgot your password</Title>
        <Paragraph>We will send you an email that will help you create a new password for your account.</Paragraph>
        <Form onFinish={handleForgot} layout="vertical">
          <Form.Item name="Email" label="Email" rules={[
            {
              required: true,
              type: 'email',
              message: 'Please provide your email',
            },
          ]}
          ><Input size="large" /></Form.Item>
          <Form.Item style={{ marginBottom: 12 }}>
            <Button type="primary" htmlType="submit" className="login-form-button" size="large" block loading={loading}>Submit</Button>
          </Form.Item>
          <Link to={getRouter('login').pathname}>Login</Link>
          <Link to={getRouter('register').pathname} style={{ float: 'right' }}>Register</Link>
        </Form>
      </>
    );
  }
  return (
    <Card style={{ maxWidth: 360, margin: 'auto' }} className="login">
      <div className="login__logo-wrapper" style={{ textAlign: 'center' }}>
        <Logo title="GridX Logo" className="login__logo" style={{ maxWidth: 137, margin: '24px auto 36px' }} />
      </div>
      {outputEle}
    </Card>
  );
};
export default memo(ForgotPassword);