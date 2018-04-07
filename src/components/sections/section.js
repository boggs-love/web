import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <div className="row">
    <div className="col-12">
      <h4 className="text-center">{title}</h4>
      {children}
    </div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
