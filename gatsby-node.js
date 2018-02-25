const path = require('path');

exports.modifyWebpackConfig = ({ config, _stage }) => {
  // Make Modernizr a global since it only runs on the browser.
  config.loader('expose-loader?Modernizr', {
    test: /\.modernizrrc(\.json)?$/,
  });

  config.loader('modernizr!json', {
    test: /\.modernizrrc(\.json)?$/,
  });

  config.merge({
    resolve: {
      alias: {
        styles: path.resolve(config._config.context, 'styles'),
        app: path.resolve(config._config.context, 'src'),
        modernizr$: path.resolve(config._config.context, '.modernizrrc'),
      },
    },
  });

  return config;
};
