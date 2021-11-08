const { DefinePlugin } = require('webpack');
const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const envs = require('./env');

const envName = (process.argv[2] && process.argv[2].split('=')[1]) || 'development';

module.exports = {
  webpack: {
    plugins: {
      add: [
        new DefinePlugin(envs.get(envName)),
        new AntdDayjsWebpackPlugin(),
      ]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            importedLoaders: 1,
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
};