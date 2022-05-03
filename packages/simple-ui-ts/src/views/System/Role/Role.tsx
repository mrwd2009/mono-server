import { FC, memo, useState, useMemo } from 'react';
import forEach from 'lodash/forEach';
import { Row, Col, Spin, Button, Tree, Card, Form, Radio, Typography, Input, Tooltip } from 'antd';
import { PlusOutlined, TeamOutlined, DeleteOutlined, InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import Panel from '../../../components/Panel';
import Empty from '../../../components/Empty';
import { useHookedModal } from '../../../components/HookedModal';
import ScrollShadow from '../../../components/ScrollShadow';
import CreateRole from './CreateRole';
import AssignPermission from './AssignPermission';
import { showConfirm } from '../../../util';
import { useGetRoleListQuery, useUpdateRoleMutation, useReparentRoleMutation, useDeleteRoleMutation } from './services';

const Detail: FC<{ detail: { key: number; enabled: boolean; name: string; description: string } }> = ({ detail }) => {
  const [editing, setEditing] = useState(false);
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

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
            updateRole({
              id: detail.key,
              enabled: formData.enabled,
              name: formData.name,
              description: formData.description,
            }).then(() => {
              setEditing(false);
            });
          }}
        >
          <Form.Item
            label="Status"
            name="enabled"
            initialValue={detail.enabled}
          >
            <Radio.Group>
              <Radio value={true}>Enabled</Radio>
              <Radio value={false}>Disabled</Radio>
            </Radio.Group>
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
        <Form.Item label="Status">
          <Typography.Paragraph
            className="mb-0"
            editable={{ onStart: () => setEditing(true) }}
          >
            {detail.enabled ? 'Enabled' : 'Disabled'}
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

const Role: FC = () => {
  const { isLoading, data } = useGetRoleListQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [reparentRole] = useReparentRoleMutation();
  const [selectedKeys, setSelectedKeys] = useState<Array<number>>([]);
  const modal = useHookedModal();
  const assignModal = useHookedModal();

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
            enabled: item.data.enabled,
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
        showConfirm({
          title: 'Reposition',
          content: 'Are you sure to reposition current item?',
          onConfirm: () => {
            return reparentRole({
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
                  className="mr-2"
                  icon={<LockOutlined />}
                  onClick={() => {
                    assignModal.changeVisible(true, selected);
                  }}
                >
                  Assign
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
                        return deleteRole(selected.key);
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
            <ScrollShadow>
              <Tree
                className="text-nowrap"
                draggable
                treeData={roots}
                showIcon
                selectedKeys={selectedKeys}
                onSelect={(keys) => {
                  setSelectedKeys(keys as number[]);
                }}
                icon={<TeamOutlined />}
                onDrop={handleDrop}
              />
            </ScrollShadow>
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
        <Empty description="No available roles to show.">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => {
              modal.changeVisible(true, null);
            }}
          >
            New Role
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
          Role&nbsp;
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
      <CreateRole hookedModal={modal} />
      <AssignPermission hookedModal={assignModal} />
    </Panel>
  );
};

export default memo(Role);