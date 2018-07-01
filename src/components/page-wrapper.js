import React from 'react';
import PropTypes from 'prop-types';
import Background from './background';

const PageWrapper = ({ background, position, children }) => (
  <div>
    <Background data={background} position={position} />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7 pl-0 pr-0">
          <div className="row justify-content-center m-0">
            <div className="col-11 col-sm-12 p-0">
              <div className="details row align-content-end align-items-end justify-content-between flex-wrap m-0">
                <h5 className="text-center w-100 w-md-auto">
                  <span className="text-nowrap">232 N Jungle Rd.</span> <span className="text-nowrap">Geneva, Florida</span>
                </h5>
                <h5 className="text-nowrap">10.20.18</h5>
                <h5 className="text-nowrap">4:30 PM</h5>
              </div>
            </div>
          </div>
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
  position: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
