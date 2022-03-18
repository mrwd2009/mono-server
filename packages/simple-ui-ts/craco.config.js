const { getLoaders, loaderByName } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {

            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
  webpack: {
    // reference https://stackoverflow.com/questions/65163676/how-to-add-webpack-style-loader-nonce-attribute-to-a-craco-config
    configure: (webpackConfig) => {
      const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName('style-loader'));
      if (hasFoundAny) {
        matches.forEach((match) => {
          match.parent[match.index] = {
            loader: require.resolve('style-loader'),
            options: { injectType: 'lazyStyleTag' }
          };
        });
      }
      return webpackConfig;
    }
  }
};