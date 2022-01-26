import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonCase from './Button';

export default {
  title: 'Antd/Button',
  component: ButtonCase,
} as ComponentMeta<typeof ButtonCase>;

const Template: ComponentStory<typeof ButtonCase> = (args) => <ButtonCase {...args} />;

export const ButtonDivider = Template.bind({});
ButtonDivider.args = {
  type: 'primary',
};