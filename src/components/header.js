import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const doc = this.link.ownerDocument;
    const win = doc.defaultView || doc.parentWindow;

    event.preventDefault();

    // Scroll the user to the top.
    // If the browser suppors smooth scrolling, use that.
    if (win.scroll) {
      win.scroll({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      doc.documentElement.scrollTop = 0;
      doc.body.scrollTop = 0;
    }
  }

  render() {
    return (
      <header className="fixed-top pt-1 pb-1">
        <h1 className="text-center"><a href="/" ref={(element) => { this.link = element; }} onClick={this.handleClick}>{this.props.title}</a></h1>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
