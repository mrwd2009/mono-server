const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv')
const NODE_ENV = process.env.NODE_ENV;

const envFile = path.join(__dirname, `.env.${NODE_ENV}`);
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile});
} else {
  dotenv.config();
}

const { getLoaders, loaderByName } = require('@craco/craco');
// forked craco-less is used to support 'style-loader' in production mode.
// because we want to change theme dinamically without refresh browser
const CracoLessPlugin = require('./craco/craco-less/craco-less');

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
    // CRA uses different style loaders in different environments.
    // the related source code as following
    // isEnvDevelopment && require.resolve('style-loader'),
    // isEnvProduction && {
    //   loader: MiniCssExtractPlugin.loader,
    //   // css is located in `static/css`, use '../../' to locate index.html folder
    //   // in production `paths.publicUrlOrPath` can be a relative path
    //   options: paths.publicUrlOrPath.startsWith('.')
    //     ? { publicPath: '../../' }
    //     : {},
    // },
    // reference https://stackoverflow.com/questions/65163676/how-to-add-webpack-style-loader-nonce-attribute-to-a-craco-config
    configure: (webpackConfig) => {
      let hasFoundAny, matches;
      if (NODE_ENV !== 'production') {
        const result = getLoaders(webpackConfig, loaderByName('style-loader'));
        hasFoundAny = result.hasFoundAny;
        matches = result.matches;
      } else {
        const result = getLoaders(webpackConfig, loaderByName('mini-css-extract-plugin'));
        hasFoundAny = result.hasFoundAny;
        matches = result.matches;
      }
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