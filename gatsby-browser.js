import WebFont from 'webfontloader';
import 'modernizr';

exports.onClientEntry = () => {
  WebFont.load({
    google: {
      families: [
        'Kaushan Script',
        'Lato:400',
      ],
    },
  });
};
