import { ComponentStory, ComponentMeta } from '@storybook/react';
import LocaleProviderCase from './LocaleProvider';

export default {
  title: 'Antd/LocaleProvider',
  component: LocaleProviderCase
} as ComponentMeta<typeof LocaleProviderCase>;

const Template: ComponentStory< typeof LocaleProviderCase> = ({ type }) => <LocaleProviderCase type={type} />;

export const PrimaryLocaleProvider = Template.bind({});
PrimaryLocaleProvider.args = {
  type: 'primary',
};
