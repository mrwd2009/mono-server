import { ComponentStory, ComponentMeta } from '@storybook/react';
import BezierCurve from './BezierCurve';

export default {
  title: 'ZRender/Shape/BezierCurve',
  component: BezierCurve,
} as ComponentMeta<typeof BezierCurve>;

const Template: ComponentStory<typeof BezierCurve> = (args) => <BezierCurve {...args} />;

export const PrimaryBezierCurve = Template.bind({});
PrimaryBezierCurve.args = {
  type: 'primary',
};

export const PartialBezierCurve = Template.bind({});
PartialBezierCurve.args = {
  type: 'partial',
};