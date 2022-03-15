const CracoLessPlugin = require('craco-less');
const config = require('../craco.config');

const lessPlugin = config.plugins.find(item => {
  return item.plugin === CracoLessPlugin;
});

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: (webpackConfig) => {
    // https://stackoverflow.com/questions/59761361/storybook-ui-with-css-modules-and-less
    const { loadCracoConfig } = require('@craco/craco/lib/config');
    const { getCraPaths } = require('@craco/craco/lib/cra');
    const context = { env: process.env.NODE_ENV };
    const cracoConfig = loadCracoConfig(context);
    context.paths = getCraPaths(cracoConfig);
    const { overrideWebpackConfig } = require('craco-less');
    overrideWebpackConfig({
      context,
      webpackConfig,
      pluginOptions: lessPlugin.options,
    });
    return webpackConfig;
  }
}