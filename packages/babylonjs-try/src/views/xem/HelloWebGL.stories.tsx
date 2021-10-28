import { Meta, ComponentStory, Story } from '@storybook/react';
import HelloWebGL, { Props } from './HelloWebGL';

export default {
  title: 'XEM/HelloWebGL',
  component: HelloWebGL,
} as Meta;

export const PrimaryHello: Story<Props> = (args) => {
  return <HelloWebGL {...args} />;
};
PrimaryHello.args = {
  title: 'Primary',
};