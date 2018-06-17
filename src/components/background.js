import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { OrderedMap } from 'immutable';
/* global Modernizr */

class Background extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      webp: null,
    };
  }

  componentDidMount() {
    // Determine if the brwoser supports webp.
    Modernizr.on('webp', webp => (
      this.setState({
        ...this.state,
        webp: !!webp,
      })
    ));
  }

  render() {
    // If webp support hasn't been determined, return only the metadata.
    if (this.state.webp === null) {
      return (
        <Helmet>
          <meta name="og:image" content={this.props.data.meta.original.src} />
        </Helmet>
      );
    }

    const sizes = new OrderedMap(this.props.data.sizes)
      // Sort from largest to smallest.
      .sortBy(size => size.width)
      .reverse()
      .map((size) => {
        const set = this.state.webp ? size.srcSetWebp : size.srcSet;

        // Take the srcSet response and convert it to a map.
        const srcSet = set.split(',\n')
          .reduce((map, img) => {
            const [src, dppx] = img.split(' ');
            return map.set(dppx.replace('x', ''), src);
          }, new OrderedMap())
          .sortBy((src, dppx) => dppx);

        return {
          ...size,
          srcSet,
        };
      });

    const first = sizes.first();

    const styles = [
      `
        .background {
          background-position: ${this.props.position}
        }
      `,
      sizes.map(size => (
        size.srcSet.map((src, dppx) => {
          // The first size is the largest. If the screen exceeds this size, we
          // should at least show the largest size even if it's not big enough.
          if (first === size) {
            return `
              @media
                only screen and (-webkit-min-device-pixel-ratio: ${dppx}),
                only screen and (min-device-pixel-ratio: ${dppx}),
                only screen and (min-resolution: ${dppx}dppx) {
                  .background {
                    background-image: url('${src}');
                  }
                }
            `;
          }

          return `
            @media
              only screen and (max-width: ${size.width}px) and (-webkit-min-device-pixel-ratio: ${dppx}),
              only screen and (max-width: ${size.width}px) and (min-device-pixel-ratio: ${dppx}),
              only screen and (max-width: ${size.width}px) and (min-resolution: ${dppx}dppx) {
                .background {
                  background-image: url('${src}');
                }
              }
          `;
        }).join('\n')
      )).toArray(),
    ].join('\n');

    return (
      <div className="background-wrapper">
        <Helmet>
          <style type="text/css">
            {styles}
          </style>
          <meta name="og:image" content={this.props.data.meta.original.src} />
        </Helmet>
        <div className="background" />
      </div>
    );
  }
}

Background.propTypes = {
  data: PropTypes.shape({
    meta: PropTypes.object,
    sizes: PropTypes.object,
  }).isRequired,
  position: PropTypes.string.isRequired,
};

export const query = graphql`
fragment BackgroundImage on ImageSharpResolutions {
  width
  srcSet
  srcSetWebp
}

fragment BackgroundImages on File {
  meta: childImageSharp {
    original {
      src
    }
  }
  sizes: childImageSharp {
    xs: resolutions(width: 576, quality: 85) {
      ...BackgroundImage
    }
    sm: resolutions(width: 768, quality: 85) {
      ...BackgroundImage
    }
    md: resolutions(width: 992, quality: 85) {
      ...BackgroundImage
    }
    lg: resolutions(width: 1200, quality: 85) {
      ...BackgroundImage
    }
    xl: resolutions(width: 1920, quality: 85) {
      ...BackgroundImage
    }
  }
}
`;

export default Background;
