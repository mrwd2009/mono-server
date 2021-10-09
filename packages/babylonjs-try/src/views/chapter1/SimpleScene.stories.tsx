import { ComponentStory, Meta, Story } from '@storybook/react';
import SimpleScene, { HelloWorldScene } from './SimpleScene';

export default {
  title: 'Chapter1/SimpleScene',
  component: SimpleScene,
} as Meta;

const Template: ComponentStory<typeof SimpleScene> = (args) => <SimpleScene {...args} />;

export const PrimaryScene = Template.bind({});
PrimaryScene.args = {
  label: 'PrimaryScene',
};


export const SecondScene = Template.bind({});
SecondScene.args = {
  label: 'SecondScene',
};

export const HelloWorldScenePreview: Story = () => {
  return <HelloWorldScene />;
};
HelloWorldScenePreview.storyName = 'Hello World Scene';
