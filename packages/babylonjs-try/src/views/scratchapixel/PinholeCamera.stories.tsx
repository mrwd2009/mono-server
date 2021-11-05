import { Meta, ComponentStory, Story } from '@storybook/react';
import PinholeCamera, { Props } from './PinholeCamera';

export default {
  title: 'ScratchAPixel/PinholeCamera',
  component: PinholeCamera,
} as Meta;

export const PrimaryPinholeCamera: Story<Props> = (args) => {
  return <PinholeCamera {...args} />;
};
PrimaryPinholeCamera.args = {
  title: 'Primary',
};