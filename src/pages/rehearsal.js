import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'app/components/page-wrapper';
import RSVP from 'app/components/sections/rsvp/rsvp';

const Rehearsal = ({ data }) => (
  <PageWrapper background={data.background} position="bottom left">
    <RSVP type="rehearsal" accepted={data.accepted} declined={data.declined} />
  </PageWrapper>
);

Rehearsal.propTypes = {
  data: PropTypes.shape({
    background: PropTypes.object,
    accepted: PropTypes.object,
    declined: PropTypes.object,
  }).isRequired,
};

export const query = graphql`
query RehersalQuery {
  background: file(relativePath: {eq: "background/rehearsal.jpg"}) {
    ...BackgroundImages
  }
  accepted: file(name: {eq: "accepted"}) {
    ...RSVPMarkdown
  }
  declined: file(name: {eq: "declined"}) {
    ...RSVPMarkdown
  }
}
`;

export default Rehearsal;
