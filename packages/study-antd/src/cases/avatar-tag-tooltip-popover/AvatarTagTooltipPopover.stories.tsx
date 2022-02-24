import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvatarTagTooltipPopover from './AvatarTagTooltipPopover';

export default {
  title: 'Antd/AvatarTagTooltipPopover',
  component: AvatarTagTooltipPopover,
} as ComponentMeta<typeof AvatarTagTooltipPopover>;

const Template: ComponentStory<typeof AvatarTagTooltipPopover> = (args) => <AvatarTagTooltipPopover {...args} />;

export const Avatar = Template.bind({});
Avatar.args = {
  type: 'avatar',
};

export const Tag = Template.bind({});
Tag.args = {
  type: 'tag',
};

export const Tooltip = Template.bind({});
Tooltip.args = {
  type: 'tooltip',
};

export const Popover = Template.bind({});
Popover.args = {
  type: 'popover',
};