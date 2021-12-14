const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
// https://stackoverflow.com/questions/65893787/create-react-app-with-typescript-and-npm-link-enums-causing-module-parse-failed
module.exports = {
  webpack: {
    configure: (webpackConfig) => ({
      ...webpackConfig,
      module: {
        ...webpackConfig.module,
        rules: webpackConfig.module.rules.map((rule) => {
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
        }),
      },
    }),
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
            plugin => !(plugin instanceof ModuleScopePlugin)
          );
          return webpackConfig
        }
      }
    }
  ],
};