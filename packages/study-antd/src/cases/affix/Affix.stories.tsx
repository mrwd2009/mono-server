import { ComponentMeta, ComponentStory } from '@storybook/react';
import AffixCase from './Affix';

export default {
  title: 'Antd/Affix',
  component: AffixCase,
} as ComponentMeta<typeof AffixCase>;

const Template: ComponentStory<typeof AffixCase> = (args) => <AffixCase {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};
