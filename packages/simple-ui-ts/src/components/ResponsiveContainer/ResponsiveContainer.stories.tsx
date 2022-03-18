import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Row, Col } from 'antd';
import ResponsiveContainer from './ResponsiveContainer';
import { useBreakpoint } from './hooks';
import '../../assets/stylesheets/default.less';

export default {
  title: 'Components/ResponsiveContainer',
  component: ResponsiveContainer,
} as ComponentMeta<typeof ResponsiveContainer>;

const InnerContent = () => {
  const breakpoint = useBreakpoint();
  return (
    <div>
      Responsive Container({breakpoint})
      <Row>
        <Col
          sm={{ offset: 4 }}
          md={{ offset: 6 }}
          lg={{ offset: 8 }}
        >
          col
        </Col>
      </Row>
    </div>
  );
};

const Template: ComponentStory<typeof ResponsiveContainer> = args => {
  return (
    <ResponsiveContainer {...args}>
      <InnerContent />
    </ResponsiveContainer>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
