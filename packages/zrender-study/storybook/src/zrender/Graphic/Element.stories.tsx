import { ComponentStory, ComponentMeta } from '@storybook/react';
import Element from './Element';

export default {
  title: 'ZRender/Graphic/Element',
  component: Element,
} as ComponentMeta<typeof Element>;

const Template: ComponentStory<typeof Element> = (args) => <Element {...args} />;

export const PrimaryElement = Template.bind({});
PrimaryElement.args = {
  type: 'primary',
};

export const DraggableElement = Template.bind({});
DraggableElement.args = {
  type: 'draggable',
};

export const ClippathElement = Template.bind({});
ClippathElement.args = {
  type: 'clippath',
};
