import { ComponentStory, ComponentMeta } from '@storybook/react';
import Color from './Color';

export default {
  title: 'Antd/Style/Color',
  component: Color,
} as ComponentMeta<typeof Color>;

const Template: ComponentStory<typeof Color> = (args) => <Color {...args} />;

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  type: 'primary',
};