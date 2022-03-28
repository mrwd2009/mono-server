import { ReactNode, PureComponent, ChangeEventHandler, MouseEventHandler } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ResponsiveContainer from '../../components/ResponsiveContainer';
import { constants } from '../../config';

const { TextArea } = Input;

interface CommentItem {
  author: string;
  avatar: ReactNode;
  content: ReactNode;
  datetime: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
}: {
  onChange: ChangeEventHandler;
  onSubmit: MouseEventHandler;
  submitting: boolean;
  value: string;
}) => (
  <ResponsiveContainer>
    <Form.Item
      wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 }, lg: { span: 16 }, xl: { span: 12 } }}
    >
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Log
      </Button>
    </Form.Item>
  </ResponsiveContainer>
);

class TreeComment extends PureComponent<{ initMsg?: string }> {
  state = {
    comments: [
      {
        author: 'You',
        avatar: (
          <Avatar
            icon={<UserOutlined />}
            alt="User"
            className="bg-primary"
          />
        ),
        content: <p>{this.props.initMsg || 'Add new logic for climate'}</p>,
        datetime: dayjs().format(constants.dateFormat),
      },
    ],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'You',
            avatar: (
              <Avatar
                icon={<UserOutlined />}
                alt="User"
                className="bg-primary"
              />
            ),
            content: <p>{this.state.value}</p>,
            datetime: dayjs().format(constants.dateFormat),
          },
        ],
      });
    }, 400);
  };

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              icon={<UserOutlined />}
              alt="User"
              className="bg-primary"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

export default TreeComment;
