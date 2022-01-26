import { ComponentStory, ComponentMeta } from '@storybook/react';
import Circle from './Circle';

export default {
  title: 'ZRender/Shape/Circle',
  component: Circle,
} as ComponentMeta<typeof Circle>;

const Template: ComponentStory<typeof Circle> = (args) => <Circle {...args} />;

export const PrimaryCircle = Template.bind({});
PrimaryCircle.args = {
  type: 'primary',
};