import { ComponentStory, ComponentMeta } from '@storybook/react';
import Path from './Path';

export default {
  title: 'ZRender/Graphic/Path',
  component: Path,
} as ComponentMeta<typeof Path>;

const Template: ComponentStory<typeof Path> = (args) => <Path {...args} />;

export const PrimaryPath = Template.bind({});
PrimaryPath.args = {
  type: 'primary',
};

export const RectPath = Template.bind({});
RectPath.args = {
  type: 'rect',
};

export const Arc1Path = Template.bind({});
Arc1Path.args = {
  type: 'arc1',
};

export const Arc2Path = Template.bind({});
Arc2Path.args = {
  type: 'arc2',
};

export const Arc3Path = Template.bind({});
Arc3Path.args = {
  type: 'arc3',
};
