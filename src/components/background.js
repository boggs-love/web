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
    // If webp support hasn't been determined, return nothing.
    if (this.state.webp === null) {
      return null;
    }

    if (!this.props.data.edges[0]) {
      return null;
    }

    const sizes = new OrderedMap(this.props.data.edges[0].node)
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

    const styles = sizes.map(size => (
      size.srcSet.map((src, dppx) => {
        // The first size is the largest. If the screen exceeds this size, we
        // should at least show the largest size even if it's not big enough.
        if (first === size) {
          return `
            @media
              only screen and (min-device-pixel-ratio: ${dppx}),
              only screen and (min-resolution: ${dppx}dppx) {
                .app {
                  background-image: url('${src}');
                }
              }
          `;
        }

        return `
          @media
            only screen and (max-width: ${size.width}px) and (min-device-pixel-ratio: ${dppx}),
            only screen and (max-width: ${size.width}px) and (min-resolution: ${dppx}dppx) {
              .app {
                background-image: url('${src}');
              }
            }
        `;
      }).join('\n')
    )).join('\n');

    return (
      <Helmet>
        <style>
          {styles}
        </style>
      </Helmet>
    );
  }
}

Background.propTypes = {
  data: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

export default Background;
