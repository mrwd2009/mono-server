import { ComponentStory, ComponentMeta } from '@storybook/react';
import LayoutCase from './Layout';

export default {
  title: 'Antd/Layout',
  component: LayoutCase,
} as ComponentMeta<typeof LayoutCase>;

const Template: ComponentStory<typeof LayoutCase> = ({ type, theme }) => <LayoutCase type={type} theme={theme} />;


export const PrimaryLayout = Template.bind({});
PrimaryLayout.args = {
  type: 'primary',
};

export const CollapseLayout = Template.bind({});
CollapseLayout.args = {
  type: 'collapse',
};

export const BreakpointLayout = Template.bind({});
BreakpointLayout.args = {
  type: 'breakpoint',
};