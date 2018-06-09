import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'app/components/page-wrapper';
import RSVP from 'app/components/sections/rsvp/rsvp';
import Registry from 'app/components/sections/registry';
import Travel from 'app/components/sections/travel';

const Index = ({ data }) => (
  <PageWrapper background={data.background} position="bottom right">
    <RSVP type="wedding" accepted={data.accepted} declined={data.declined} />
    <Registry registry={data.registry} />
    <Travel travel={data.travel} />
  </PageWrapper>
);

Index.propTypes = {
  data: PropTypes.shape({
    background: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const query = graphql`
query IndexQuery {
  background: file(relativePath: {eq: "background/index.jpg"}) {
    ...BackgroundImages
  }
  accepted: file(name: {eq: "accepted"}) {
    ...RSVPMarkdown
  }
  declined: file(name: {eq: "declined"}) {
    ...RSVPMarkdown
  }
  registry: allFile(filter: {relativeDirectory: {eq: "registry"}}) {
    ...RegistryFiles
  }
  travel: allFile(filter: {relativeDirectory: {eq: "travel"}}) {
    ...TravelFiles
  }
}
`;

export default Index;
