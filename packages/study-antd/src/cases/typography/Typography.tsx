import { FC } from 'react';
import Typography from '../../components/typography';
import './index.less';

export interface Props {
  type: string;
}

const TypographyCase: FC<Props> = ({ type }) => {
  let el: any = null;

  switch (type) {
    case 'paragraph': {
      el = (
        <Typography.Paragraph copyable editable ellipsis={{
          rows: 2,
          expandable: true,
          suffix: '###',
        }}>
          long<button tabIndex={0}>F</button>longlonglonglonglonglonglonglonglong
        </Typography.Paragraph>
      );
      break;
    }
    case 'text': {
      el = <Typography.Text ellipsis>longlonglonglonglonglong</Typography.Text>;
      break;
    }
    case 'title': {
      el = <Typography.Title level={3} ellipsis>longlonglonglonglonglong</Typography.Title>;
      break;
    }
    case 'link': {
      el = <Typography.Link href="#" ellipsis>longlonglonglonglonglong</Typography.Link>;
      break;
    }
  }

  return (
    <div style={{ width: 200 }}>
      {el}
    </div>
  );
};

export default TypographyCase;