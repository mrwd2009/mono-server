import { FC, memo, useState, useMemo } from 'react';
import forEach from 'lodash/forEach';
import { Row, Col, Spin, Button, Tree, Card, Form, Select, Typography, Input, Tooltip } from 'antd';
import {
  PlusOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  LockOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Panel from '../../../components/Panel';
import Empty from '../../../components/Empty';
import { useHookedModal } from '../../../components/HookedModal';
import CreatePermission from './CreatePermission';
import { showConfirm } from '../../../util';
import {
  useGetPermissionListQuery,
  useUpdatePermissionMutation,
  useReparentPermissionMutation,
  useDeletePermissionMutation,
} from './services';

const Detail: FC<{ detail: { key: number; type: string; name: string; description: string } }> = ({ detail }) => {
  const [editing, setEditing] = useState(false);
  const [updatePermission, { isLoading }] = useUpdatePermissionMutation();

  if (editing) {
    return (
      <Card style={{ width: 320 }}>
        <Form
          key="edit"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelWrap
          onFinish={(formData) => {
            updatePermission({
              id: detail.key,
              type: formData.type,
              name: formData.name,
              description: formData.description,
            }).then(() => {
              setEditing(false);
            });
          }}
        >
          <Form.Item
            label="Type"
            initialValue={detail.type}
            name="type"
          >
            <Select>
              <Select.Option value="category">
                <FolderOutlined className="mr-1" />
                Category
              </Select.Option>
              <Select.Option value="permission">
                <LockOutlined className="mr-1" />
                Permission
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            initialValue={detail.name}
            name="name"
            rules={[{ required: true, message: 'Name is required.' }]}
          >
            <Input
              maxLength={50}
              showCount
            />
          </Form.Item>
          <Form.Item
            label="Description"
            initialValue={detail.description}
            name="description"
            rules={[{ required: true, message: 'Description is required.' }]}
          >
            <Input.TextArea
              maxLength={300}
              showCount
              rows={4}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              className="mr-2"
              loading={isLoading}
              htmlType="submit"
            >
              Save
            </Button>
            <Button onClick={() => setEditing(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  return (
    <Card style={{ width: 320 }}>
      <Form
        key="info"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelWrap
      >
        <Form.Item label="Type">
          <Typography.Paragraph
            className="mb-0"
            editable={{ onStart: () => setEditing(true) }}
          >
            {detail.type === 'permission' ? <LockOutlined className="mr-1" /> : <FolderOutlined className="mr-1" />}
            {detail.type === 'permission' ? 'Permission' : 'Category'}
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Name">
          <Typography.Paragraph
            className="mb-0"
            editable={{ onStart: () => setEditing(true) }}
          >
            {detail.name}
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Description">
          <Typography.Paragraph
            className="mb-0"
            editable={{ onStart: () => setEditing(true) }}
          >
            {detail.description}
          </Typography.Paragraph>
        </Form.Item>
      </Form>
    </Card>
  );
};

const Permission: FC = () => {
  const { isLoading, data } = useGetPermissionListQuery();
  const [deletePermission] = useDeletePermissionMutation();
  const [reparentPermission] = useReparentPermissionMutation();
  const [selectedKeys, setSelectedKeys] = useState<Array<number>>([]);
  const modal = useHookedModal();

  const selected = useMemo(() => {
    if (!data) {
      return null;
    }
    if (!selectedKeys.length) {
      return null;
    }
    const getItem = (key: number, roots: any) => {
      let result: any = null;
      forEach(roots, (item) => {
        if (item.key === key) {
          result = {
            key,
            name: item.title,
            type: item.data.type,
            description: item.data.description,
          };
          return false;
        }
        if (item.children) {
          result = getItem(key, item.children);
          if (result) {
            return false;
          }
        }
      });
      return result;
    };

    return getItem(selectedKeys[0], data.roots);
  }, [selectedKeys, data]);

  let content: any;
  if (data) {
    const { keys, roots } = data;
    if (keys.length) {
      const handleDrop = (info: any) => {
        if (!info.dropToGap && info.node.data.type === 'permission') {
          return;
        }
        showConfirm({
          title: 'Reposition',
          content: 'Are you sure to reposition current item?',
          onConfirm: () => {
            return reparentPermission({
              sourceId: info.dragNode.key,
              targetId: info.node.key,
              position: info.dropToGap ? 'below' : 'child',
            });
          },
        });
      };
      content = (
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Row justify="end">
              <Col flex="none">
                <Button
                  disabled={selected?.type === 'permission'}
                  type="primary"
                  className="mr-2"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    modal.changeVisible(true, selected);
                  }}
                >
                  New
                </Button>
              </Col>
              <Col flex="none">
                <Button
                  disabled={!selected}
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    showConfirm({
                      title: 'Delete',
                      content: 'Are you sure to delete current item?',
                      onConfirm: () => {
                        return deletePermission(selected.key);
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Col>
          <Col flex="auto">
            <Tree
              draggable
              treeData={roots}
              showIcon
              selectedKeys={selectedKeys}
              onSelect={(keys) => {
                setSelectedKeys(keys as number[]);
              }}
              icon={(props) => {
                if ((props as any).data.data.type === 'category') {
                  if (props.expanded) {
                    return <FolderOpenOutlined />;
                  }
                  return <FolderOutlined />;
                }
                return <LockOutlined />;
              }}
              onDrop={handleDrop}
            />
          </Col>
          <Col flex="none">
            {selected && (
              <Detail
                key={selected.key}
                detail={selected}
              />
            )}
          </Col>
        </Row>
      );
    } else {
      content = (
        <Empty description="No available permissions to show.">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => {
              modal.changeVisible(true, null);
            }}
          >
            New Permission
          </Button>
        </Empty>
      );
    }
  } else {
    content = <Empty />;
  }

  return (
    <Panel
      title={
        <span>
          Permission{' '}
          <Tooltip
            arrowPointAtCenter
            placement="topLeft"
            title="You can reposition each item by dragging."
          >
            <span>
              <InfoCircleOutlined className="text-primary" />
            </span>
          </Tooltip>
        </span>
      }
    >
      <Spin spinning={isLoading}>{content}</Spin>
      <CreatePermission hookedModal={modal} />
    </Panel>
  );
};

export default memo(Permission);
