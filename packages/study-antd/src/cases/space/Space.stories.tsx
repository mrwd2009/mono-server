import { ComponentStory, ComponentMeta } from '@storybook/react';
import SpaceCase from './Space';

export default {
  title: 'Antd/Space',
  component: SpaceCase,
} as ComponentMeta<typeof SpaceCase>;

const Template: ComponentStory<typeof SpaceCase> = (args) => <SpaceCase {...args} />;

export const PrimarySpace = Template.bind({});
PrimarySpace.args = {
  type: 'primary',
};