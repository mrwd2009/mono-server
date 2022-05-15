import { FC, memo, useState, useEffect } from 'react';
import { Upload, Form, Input, Spin, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { selectUserInfo } from '../../Auth/slices';
import { useAppSelector } from '../../../hooks';
import { useUserProfile } from './hooks';

const defaultIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjUxMDM5MTQ5NzMxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwODQ1IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBmZWVkYmFjay1pY29uZm9udDsgc3JjOiB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmYyP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZjIiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS53b2ZmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LnR0Zj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoInRydWV0eXBlIik7IH0KPC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk4My45NjY4NjggMTQyLjAyOTY5OGgtMzMuOTk4ODU1VjQwLjAzMzEzMmEzOS45OTg2NTMgMzkuOTk4NjUzIDAgMSAwLTc5Ljk5NzMwNyAwdjEwMS45OTY1NjZoLTc5Ljk5NzMwNlY0MC4wMzMxMzJhMzkuOTk4NjUzIDM5Ljk5ODY1MyAwIDEgMC03OS45OTczMDYgMHYxMDEuOTk2NTY2aC0zNS45OTg3ODhhMzkuOTk4NjUzIDM5Ljk5ODY1MyAwIDAgMC0zOS45OTg2NTMgMzkuOTk4NjUzVjI4NC4wMjQ5MTZjMCA5Mi43NDg4NzcgNjUuMDg1ODA4IDE3MC41NzAyNTcgMTUxLjk5NDg4MiAxOTAuMjAxNTk2djIxMy4zNjg4MTVDNzg1Ljk3MzUzNSA4MjguOTc0NTY3IDY3MC45Mzc0MDggOTQ0LjAwMjY5NCA1MjkuNTU4MTY5IDk0NC4wMDI2OTRjLTExNi41NjQwNzUgMC0yMTguMjcyNjUtNzguODEzMzQ2LTI0Ny40MTU2NjktMTkxLjcwNTU0NS0xLjEwMzk2My00LjY4Nzg0Mi0zMS41NjY5MzctMTM3LjEyMzM4MyAxMi4yMzE1ODgtMjg3LjA2MjMzNGEzOS45OTg2NTMgMzkuOTk4NjUzIDAgMSAwLTc2Ljc5NzQxNC0yMi40MzEyNDVjLTI4LjIzOTA0OSA5Ni42ODQ3NDQtMjkuNTM1MDA2IDE4NS43ODU3NDQtMjQuODc5MTYyIDI0Ni44MjM2ODktMjMuMTU5MjItMTEuMzI3NjE5LTQ5LjAzODM0OS0yNy40MzkwNzYtNzAuMDQ1NjQyLTUyLjcyNjIyNS0zNC4yMzg4NDctNDEuMjM4NjExLTQ3Ljk2NjM4NS05OS41NzI2NDctNDAuODA2NjI2LTE3My40MDIxNjEgMTYuMzUxNDQ5LTE2OC42MzQzMjIgMTU1LjIxMDc3NC0zMTAuNTY1NTQzIDIxNy40MTY2NzktMzY2LjI5OTY2NiA1MC4yNzgzMDcgNjYuOTg5NzQ0IDE1OS40ODI2MyAyMzQuMTc2MTE1IDE0My4wNTExODMgNDAzLjY0MjQwOS02LjE1OTc5MyA2My40NjE4NjMtMjUuOTk5MTI1IDExMS4xOTYyNTYtNjAuNjYxOTU3IDE0NS45NjMwODVhMzkuOTk4NjUzIDM5Ljk5ODY1MyAwIDEgMCA1Ni42MzgwOTMgNTYuNDg2MDk4YzQ4LjI3MDM3NS00OC4zOTgzNyA3NS42Mjk0NTMtMTEyLjA5MjIyNiA4My42NDUxODMtMTk0LjcyOTQ0M0M1MzIuMTQyMDgyIDQwMy4zNDA4OTkgNTAyLjg2MzA2OCAyODQuMjE2OTEgNDM3LjI2NTI3NiAxNjQuMDg0OTU1IDM5NC4wMjY3MzIgODQuOTAzNjIxIDM0OC43MDAyNTkgMjkuODI1NDc2IDMzNy40NDQ2MzggMTYuNjI1OTJhMzkuOTk4NjUzIDM5Ljk5ODY1MyAwIDAgMC01Ni41OTgwOTUtOC40NzE3MTVjLTIuNTkxOTEzIDEuOTc1OTMzLTY0LjM0MTgzMyA0OS4xMDIzNDctMTI5LjM1NTY0NCAxMjYuODY3NzI5QzY0LjAzNzg0NCAyMzkuNTk0NDEyIDEyLjQyMzU4MiAzNTAuNTAyNjc4IDIuMjE1OTI1IDQ1NS43NzkxMzMtNy4wNjM3NjIgNTUxLjYxNTkwNiAxMi43NDM1NzEgNjI5Ljc0OTI3NSA2MS4xMTc5NDIgNjg4LjAwMzMxNGM0My44Mzg1MjQgNTIuNzkwMjIyIDEwMS4xMDA1OTYgNzYuNDQ1NDI2IDEzMS44Njc1NiA4OS4xNTY5OTggMy42Nzk4NzYgMS41MTk5NDkgNy44ODc3MzQgMy4yNjM4OSAxMS4xMTk2MjUgNC42ODc4NDIgMS4zOTE5NTMgMS42MzE5NDUgMi45Mjc5MDEgMy4xMjc4OTUgNC41NTk4NDcgNC41MTk4NDhDMjUxLjUxOTUzMSA5MjcuMDI3MjY1IDM4MS4zODcxNTggMTAyNCA1MjkuNTU4MTY5IDEwMjRjMTg1LjQ4OTc1NCAwIDMzNi4zOTY2NzMtMTUwLjkwNjkxOSAzMzYuMzk2NjczLTMzNi4zOTY2NzNWNDc1LjQ4MjQ3Qzk1NS44NTU4MTUgNDU4LjE0NzA1MyAxMDIzLjk2NTUyMSAzNzguOTAxNzIyIDEwMjMuOTY1NTIxIDI4NC4wMjQ5MTZWMTgyLjAyODM1MWEzOS45OTg2NTMgMzkuOTk4NjUzIDAgMCAwLTM5Ljk5ODY1My0zOS45OTg2NTN6IG0tMzkuOTk4NjUzIDE0MS45OTUyMThjMCA2My40MTM4NjUtNTEuNTk4MjYzIDExNC45OTYxMjgtMTE1LjAwNDEyOCAxMTQuOTk2MTI4LTYzLjQwNTg2NSAwLTExNC45OTYxMjgtNTEuNTgyMjYzLTExNC45OTYxMjgtMTE0Ljk5NjEyOHYtNjEuOTk3OTEySDk0My45NjgyMTV2NjEuOTk3OTEyeiIgc3R5bGU9ImZpbGw6ICM4MGJjMDA7IiBwLWlkPSIyMDg0NiI+PC9wYXRoPjwvc3ZnPg==';
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
          url: base64 || url || defaultIcon,
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
              <div className="ant-upload-list ant-upload-list-picture-card d-inline-block  app-ex-no-hover">
                <div className="ant-upload-list-picture-card-container m-0">
                  <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
                    <div className="ant-upload-list-item-info">
                      <span className="ant-upload-span">
                        <span className="ant-upload-list-item-thumbnail">
                          <img
                            src={avatar.base64 || avatar.url || defaultIcon}
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
