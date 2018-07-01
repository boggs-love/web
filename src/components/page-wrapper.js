import React from 'react';
import PropTypes from 'prop-types';
import Background from './background';
import Event from './event';

const PageWrapper = ({
  background,
  event,
  position,
  children,
}) => (
  <div>
    <Background data={background} position={position} />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7 pl-0 pr-0">
          <Event data={event} />
          <section className="pt-4">
            <div className="container">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

PageWrapper.propTypes = {
  background: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  event: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  position: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
