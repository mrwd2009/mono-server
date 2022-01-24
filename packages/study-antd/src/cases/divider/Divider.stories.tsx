import { ComponentStory, ComponentMeta } from '@storybook/react';
import DividerCase from './Divider';

export default {
  title: 'Antd/Divider',
  component: DividerCase,
} as ComponentMeta<typeof DividerCase>;

const Template: ComponentStory<typeof DividerCase> = (args) => <DividerCase {...args} />;

export const PrimaryDivider = Template.bind({});
PrimaryDivider.args = {
  type: 'primary',
};