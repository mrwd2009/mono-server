const CracoLessPlugin = require('craco-less');
// const path = require('path');

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
  // webpack: {
  //   alias: {
  //     '@rc-util': path.resolve(__dirname, 'dependents/util/src'),
  //   }
  // }
};