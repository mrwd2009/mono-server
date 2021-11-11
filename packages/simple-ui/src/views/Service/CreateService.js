import React, { memo } from 'react';
import { Form, Input } from 'antd';
import { ModelContainer } from '../../components/ModelContainer';
import CommandList from './CommandList';

const { Item, useForm } = Form;
const CreateService = ({ modelContainer }) => {
  return (
    <ModelContainer modelContainer={modelContainer} title="Create Service" okText="Create">
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Item label="Name" rules={[{ required: true, message: 'Name is required.' }]}><Input /></Item>
        <Item label="Category" rules={[{ required: true, message: 'Category is required.' }]}><Input /></Item>
        <Item label="Description"><Input.TextArea rows={4} /></Item>
        <Item label="Command"><CommandList /></Item>
      </Form>
    </ModelContainer>
  );
};

export default memo(CreateService);