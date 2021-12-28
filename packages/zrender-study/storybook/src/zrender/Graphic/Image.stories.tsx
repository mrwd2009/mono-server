import { ComponentStory, ComponentMeta } from '@storybook/react';
import ZRImage from './Image';

export default {
  title: 'ZRender/Graphic/Image',
  component: ZRImage,
} as ComponentMeta<typeof ZRImage>;

const Template: ComponentStory<typeof ZRImage> = (args) => <ZRImage {...args} />;

export const PrimaryImage = Template.bind({});
PrimaryImage.args = {
  type: 'primary',
};
