import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmptyCase from './Empty';

export default {
  title: 'Antd/Empty',
  component: EmptyCase
} as ComponentMeta<typeof EmptyCase>;

const Template: ComponentStory<typeof EmptyCase> = ({ type, theme }) => <EmptyCase type={type} theme={theme} />;

export const PrimaryEmpty = Template.bind({});
PrimaryEmpty.args = {
  type: 'primary'
};

export const SmallEmpty = Template.bind({});
SmallEmpty.args = {
  type: 'small'
};

export const NormalEmpty = Template.bind({});
NormalEmpty.args = {
  type: 'normal'
};

export const SimpleEmpty = Template.bind({});
SimpleEmpty.args = {
  type: 'simple'
};

export const ThemeEmpty = Template.bind({});
ThemeEmpty.args = {
  type: 'primary',
  theme: 'dark-theme'
};