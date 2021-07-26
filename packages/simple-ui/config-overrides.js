const {
  override,
  addLessLoader,
  fixBabelImports,
  overrideDevServer,
  addWebpackPlugin,
} = require('customize-cra');
const webpack = require('webpack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const envs = require('./env');

module.exports = function override(config, env) {
  config = addLessLoader({
    importedLoaders: 1,
    javascriptEnabled: true,
    //noIeCompat: true
    // modifyVars: {
    //   "@primary-color": "#ed8a11"
    // }
  })(config, env);

  // because we use designer provided style, we disable this feature now.
  // config = fixBabelImports('import', {
  //   libraryName: 'antd',
  //   // libraryDirectory: 'es',
  //   // style: 'css'
  //   style: true,
  // })(config, env);

  const envName = process.argv[2].split('=')[1];
  config = addWebpackPlugin(new webpack.DefinePlugin(envs.get(envName)))(config);
  // add dayjs replacement plugin for antd
  config = addWebpackPlugin(new AntdDayjsWebpackPlugin())(config);

  // config = devServer((configFunction) => {
  //   return (proxy, allowedHost) => {
  //     const devConfig = configFunction(proxy, allowedHost);
  //     devConfig.port = 8001;
  //     //config.historyApiFallback.rewrites = [{ from: /^\/login\.html/, to: '/build/login.html' }];
  //     return devConfig;
  //   };
  // });

  return config;
}

// module.exports = override(
//   addLessLoader({
//     importedLoaders: 1,
//     javascriptEnabled: true,
//     //noIeCompat: true
//     modifyVars: {
//       "@primary-color": "#ed8a11"
//     }
//   }),
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     // libraryDirectory: 'es',
//     // style: 'css'
//     style: true,
//   }),
// );