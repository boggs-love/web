import React from 'react';
import PropTypes from 'prop-types';
import RSVP from 'app/components/sections/rsvp/rsvp';

const Rehearsal = ({ data }) => (
  <div>
    <RSVP event="Rehearsal Dinner" accepted={data.accepted} declined={data.declined} />
  </div>
);

Rehearsal.propTypes = {
  data: PropTypes.shape({
    accepted: PropTypes.string,
    declined: PropTypes.string,
  }).isRequired,
};

export const query = graphql`
query RehersalQuery {
  accepted: file(name: {eq: "accepted"}) {
    ...markdownFile
  }
  declined: file(name: {eq: "declined"}) {
    ...markdownFile
  }
}
`;

export default Rehearsal;
