import { Meta, ComponentStory, Story } from '@storybook/react';
import Village from './Village';

export default {
  title: 'Chapter2/Village',
  component: Village,
} as Meta;

export const PrimaryVillage: ComponentStory<typeof Village> = (args) => {
  return <Village {...args} />;
};
PrimaryVillage.args = {
  title: 'Primary',
};