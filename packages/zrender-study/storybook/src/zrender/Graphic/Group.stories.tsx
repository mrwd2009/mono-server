import { ComponentStory, ComponentMeta } from '@storybook/react';
import Group from './Group';

export default {
  title: 'ZRender/Graphic/Group',
  component: Group,
} as ComponentMeta<typeof Group>;

const Template: ComponentStory<typeof Group> = (args) => <Group {...args} />;

export const PrimaryGroup = Template.bind({});
PrimaryGroup.args = {
  type: 'primary',
};
