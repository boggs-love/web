const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {
  // Make Modernizr a global since it only runs on the browser.
  config.loader('expose-loader?Modernizr', {
    test: /\.modernizrrc(\.json)?$/,
  });

  config.loader('modernizr!json', {
    test: /\.modernizrrc(\.json)?$/,
  });

  config.merge(current => (
    {
      ...current,
      resolve: {
        ...current.resolve,
        alias: {
          ...current.resolve.alias,
          styles: path.resolve(current.context, 'styles'),
          app: path.resolve(current.context, 'src'),
          modernizr$: path.resolve(current.context, '.modernizrrc'),
        },
      },
    }
  ));

  config.merge((current) => {
    switch (stage) {
      case 'develop':
        // Replace the paths with the reverse-proxy.
        return {
          ...current,
          output: {
            ...current.output,
            publicPath: current.output.publicPath.replace('0.0.0.0:80', '127.0.0.1:8888'),
          },
          entry: {
            ...current.entry,
            commons: current.entry.commons.map(entry => entry.replace('0.0.0.0:80', '127.0.0.1:8888')),
          },
        };
      default:
        return current;
    }
  });

  return config;
};
