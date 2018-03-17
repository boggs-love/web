import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Stylesheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rel: 'preload',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      ...this.state,
      rel: 'stylesheet',
    });
  }

  render() {
    return (
      <Helmet>
        <link rel={this.state.rel} href={this.props.href} as="style" />
      </Helmet>
    );
  }
}

Stylesheet.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Stylesheet;
