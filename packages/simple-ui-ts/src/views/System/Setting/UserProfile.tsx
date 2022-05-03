import { FC, memo, useState, useEffect } from 'react';
import { Upload, Form, Input, Spin, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { selectUserInfo } from '../../Auth/slices';
import { useAppSelector } from '../../../hooks';
import { useUserProfile } from './hooks';

interface Props {
  avatar: {
    url?: string;
    base64?: string;
  };
  value?: any;
  onChange?: (value: any) => void;
}
const ImgUpload: FC<Props> = ({ avatar, onChange }) => {
  const [fileList, setFileList] = useState<any>([]);
  const { url, base64 } = avatar;

  useEffect(() => {
    if (url || base64) {
      setFileList([
        {
          uid: '-1',
          name: 'photo.png',
          status: 'done',
          url: base64 || url,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [url, base64]);

  const handleChange = ({ fileList: newFileList }: any) => {
    const newFiles = newFileList.slice(-1);
    if (newFiles.length) {
      onChange?.(newFiles[0].originFileObj);
    } else {
      onChange?.(null);
    }
    setFileList(newFiles);
  };
  return (
    <ImgCrop
      rotate
      shape="round"
      grid
      modalTitle="Edit Photo"
      fillColor="#ccc"
    >
      <Upload
        listType="picture-card"
        fileList={fileList as any}
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: true,
        }}
        accept="image/*"
        onChange={handleChange}
        customRequest={(config) => {
          config.onSuccess!(null);
        }}
      >
        <UploadOutlined className="mr-1" />
        Upload
      </Upload>
    </ImgCrop>
  );
};

const UserProfile: FC = () => {
  const { avatar, username, user } = useAppSelector(selectUserInfo);
  const { loading, saveProfile } = useUserProfile();
  return (
    <Form
      layout="horizontal"
      labelCol={{
        sm: {
          span: 8,
        },
        md: {
          span: 6,
        },
        lg: {
          span: 4,
        },
      }}
      wrapperCol={{
        sm: {
          span: 16,
        },
        md: {
          span: 12,
        },
        lg: {
          span: 8,
        },
      }}
      onFinish={saveProfile}
    >
      <Form.Item label="Photo">
        <Spin spinning={avatar.loading}>
          <Form.Item
            noStyle
            name="photo"
          >
            <ImgUpload avatar={avatar} />
          </Form.Item>
        </Spin>
      </Form.Item>
      <Form.Item
        label="Full Name"
        name="displayName"
        initialValue={username}
        rules={[{ required: true, message: 'Full name is required.' }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item label="Email">
        <span className="ant-form-text">{user}</span>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          sm: {
            offset: 8,
          },
          md: {
            offset: 6,
          },
          lg: {
            offset: 4,
          },
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(UserProfile);
