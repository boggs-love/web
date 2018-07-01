import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ data }) => {
  const { address, date, time } = data.meta;

  return (
    <div className="row justify-content-center m-0">
      <div className="col-11 col-sm-12 p-0">
        <div className="details row align-content-end align-items-end justify-content-between flex-wrap m-0">
          <h5 className="text-center w-100 w-md-auto">
            {address.map(line => (<span><span key={line} className="text-nowrap">{line}</span> </span>))}
          </h5>
          <h5 className="text-nowrap">{date}</h5>
          <h5 className="text-nowrap">{time}</h5>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
fragment EventFile on File {
  meta: childEventsYaml {
      address
      date
      time
    }
}
`;

Event.propTypes = {
  data: PropTypes.shape({
    meta: PropTypes.shape({
      address: PropTypes.arrayOf(PropTypes.string).isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Event;
