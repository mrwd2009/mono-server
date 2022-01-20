import { ComponentStory, ComponentMeta } from '@storybook/react';
import GridCase from './grid';

export default {
  title: 'Antd/Grid',
  component: GridCase,
} as ComponentMeta<typeof GridCase>;

const Template: ComponentStory<typeof GridCase> = ({ ...args }) => <GridCase {...args} />;

export const PrimaryGrid = Template.bind({});
PrimaryGrid.args = {
  type: 'primary',
};