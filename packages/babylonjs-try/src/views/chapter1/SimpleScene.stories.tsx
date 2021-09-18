import { ComponentStory } from '@storybook/react';
import SimpleScene from './SimpleScene';

export default {
  title: 'Chapter1/SimpleScene',
  component: SimpleScene,
}

const Template: ComponentStory<typeof SimpleScene> = (args) => <SimpleScene {...args} />;

export const PrimaryScene = Template.bind({});
PrimaryScene.args = {
  label: 'PrimaryScene',
};

console.log(Object.keys(PrimaryScene))

export const SecondScene = Template.bind({});
SecondScene.args = {
  label: 'SecondScene',
};
