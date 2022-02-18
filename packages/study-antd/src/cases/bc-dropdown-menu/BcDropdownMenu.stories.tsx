import { ComponentMeta, ComponentStory } from '@storybook/react';
import BcDropdownMenu from './BcDropdownMenu';

export default {
  title: 'Antd/BcDropdownMenu',
  component: BcDropdownMenu,
} as ComponentMeta<typeof BcDropdownMenu>;

const Template: ComponentStory<typeof BcDropdownMenu> = (args) => <BcDropdownMenu {...args} />;

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {
  type: 'breadcrumb',
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  type: 'dropdown',
};

export const Menu = Template.bind({});
Menu.args = {
  type: 'menu',
};