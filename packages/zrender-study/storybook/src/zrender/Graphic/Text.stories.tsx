import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from './Text';

export default {
  title: 'ZRender/Graphic/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const PlainText = Template.bind({});
PlainText.args = {
  type: 'plain',
};

export const RichText = Template.bind({});
RichText.args = {
  type: 'rich',
};

export const MatrixText = Template.bind({});
MatrixText.args = {
  type: 'matrix',
};
