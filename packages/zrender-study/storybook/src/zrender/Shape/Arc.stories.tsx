import { ComponentStory, ComponentMeta } from '@storybook/react';
import Arc from './Arc';

export default {
  title: 'ZRender/Shape/Arc',
  component: Arc,
} as ComponentMeta<typeof Arc>;

const Template: ComponentStory<typeof Arc> = (args) => <Arc {...args} />;

export const PrimaryArc = Template.bind({});
PrimaryArc.args = {
  type: 'primary',
};

export const NotAntiArc = Template.bind({});
NotAntiArc.args = {
  type: 'anticlockwise',
};