import { ComponentMeta, ComponentStory } from '@storybook/react';
import TypographyCase from './Typography';

export default {
  title: 'Antd/Typography',
  component: TypographyCase,
} as ComponentMeta<typeof TypographyCase>;

const Template: ComponentStory<typeof TypographyCase> = (args) => <TypographyCase {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'text',
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  type: 'paragraph',
};

export const Title = Template.bind({});
Title.args = {
  type: 'title',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
};
