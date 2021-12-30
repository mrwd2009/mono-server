import { ComponentStory, ComponentMeta } from '@storybook/react';
import Animation from './Animation';
import easing from '../../../../src/animation/easing';

export default {
  title: 'ZRender/Graphic/Animation',
  component: Animation,
  argTypes: {
    easing: {
      options: Object.keys(easing),
      control: { type: 'select' }
    }
  }
} as ComponentMeta<typeof Animation>;

const Template: ComponentStory<typeof Animation> = (args) => <Animation {...args} />;

export const PrimaryAnimation = Template.bind({});
PrimaryAnimation.args = {
  type: 'primary',
  duration: 2000,
  easing: 'backInOut',
};

export const CubicAnimation = Template.bind({});
CubicAnimation.args = {
  type: 'cubic',
  duration: 2000,
  easing: 'backInOut',
};

export const RectAnimation = Template.bind({});
RectAnimation.args = {
  type: 'rect',
  duration: 2000,
  easing: 'backInOut',
};

export const PositionAnimation = Template.bind({});
PositionAnimation.args = {
  type: 'position',
  duration: 2000,
  easing: 'backInOut',
  delay: 0,
};