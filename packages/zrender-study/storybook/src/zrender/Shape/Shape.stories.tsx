import { ComponentStory, ComponentMeta } from '@storybook/react';
import Shape from './Shape';

export default {
  title: 'ZRender/Shape',
  component: Shape,
} as ComponentMeta<typeof Shape>;

const Template: ComponentStory<typeof Shape> = (args) => <Shape {...args} />;

export const DropletShape = Template.bind({});
DropletShape.args = {
  type: 'droplet',
};

export const EllipseShape = Template.bind({});
EllipseShape.args = {
  type: 'ellipse',
};

export const HeartShape = Template.bind({});
HeartShape.args = {
  type: 'heart',
};

export const IsogonShape = Template.bind({});
IsogonShape.args = {
  type: 'isogon',
};

export const LineShape = Template.bind({});
LineShape.args = {
  type: 'line',
};

export const PolygonShape = Template.bind({});
PolygonShape.args = {
  type: 'polygon',
};

export const RingShape = Template.bind({});
RingShape.args = {
  type: 'ring',
};

export const RoseShape = Template.bind({});
RoseShape.args = {
  type: 'rose',
};

export const SectorShape = Template.bind({});
SectorShape.args = {
  type: 'sector',
};

export const StarShape = Template.bind({});
StarShape.args = {
  type: 'star',
};

export const TrochoidShape = Template.bind({});
TrochoidShape.args = {
  type: 'trochoid',
};