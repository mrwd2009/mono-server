import { FC, memo, useState, useEffect } from 'react';
import { Upload, Form, Input, Spin, Button, Typography } from 'antd';
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
  const { avatar, username, user, profileEditable } = useAppSelector(selectUserInfo);
  const { loading, editing, setEditing, saveProfile } = useUserProfile();
  let editable: any = false;
  if (profileEditable) {
    editable = {
      onStart: () => {
        setEditing(true);
      },
    };
  }
  return (
    <Form
      layout="horizontal"
      className="app-ex-editable-form"
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
      {editing ? (
        <>
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
        </>
      ) : (
        <>
          <Form.Item label="Photo">
            <Typography.Paragraph
              className="mb-0"
              editable={editable}
            >
              <div className="ant-upload-list ant-upload-list-picture-card d-inline app-ex-no-hover">
                <div className="ant-upload-list-picture-card-container m-0">
                  <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
                    <div className="ant-upload-list-item-info">
                      <span className="ant-upload-span">
                        <span className="ant-upload-list-item-thumbnail">
                          <img
                            src={avatar.base64 || avatar.url}
                            alt="User"
                            className="ant-upload-list-item-image"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Typography.Paragraph>
          </Form.Item>
          <Form.Item label="Full Name">
            <Typography.Paragraph
              className="mb-0"
              editable={editable}
            >
              <span className="ant-form-text">{username}</span>
            </Typography.Paragraph>
          </Form.Item>
        </>
      )}
      <Form.Item label="Email">
        <span className="ant-form-text">{user}</span>
      </Form.Item>
      {editing ? (
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
            className="mr-2"
            loading={loading}
          >
            Save
          </Button>
          <Button
            htmlType="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

export default memo(UserProfile);
