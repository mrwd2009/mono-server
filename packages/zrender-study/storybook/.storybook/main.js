const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  webpackFinal(config) {
    config.module.rules = config.module.rules.map((rule) => {
      if (!rule.oneOf) return rule;
      return {
        ...rule,
        oneOf: rule.oneOf.map((ruleObject) => {
          if (
            !new RegExp(ruleObject.test).test('.ts') ||
            !ruleObject.include
          )
            return ruleObject;
          return { ...ruleObject, include: undefined };
        }),
      };
    });
    config.resolve.plugins = config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    );
    return config;
  }
}