import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'app/components/page-wrapper';
import RSVP from 'app/components/sections/rsvp/rsvp';
import Registry from 'app/components/sections/registry';
import Travel from 'app/components/sections/travel';
import Party from 'app/components/sections/party';

const Index = ({ data }) => (
  <PageWrapper background={data.background} position="bottom right">
    <RSVP type="wedding" accepted={data.accepted} declined={data.declined} />
    <Party title="Ladies" party={data.ladies} />
    <Party title="Gentlemen" party={data.gentlemen} />
    <Registry registry={data.registry} />
    <Travel travel={data.travel} />
  </PageWrapper>
);

Index.propTypes = {
  data: PropTypes.shape({
    background: PropTypes.object,
    accepted: PropTypes.object,
    declined: PropTypes.object,
    ladies: PropTypes.object,
    gentlemen: PropTypes.object,
    registry: PropTypes.object,
    travel: PropTypes.object,
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
  ladies: allFile(filter: {relativeDirectory: {eq: "ladies"}, extension: {eq: "md"}}, sort: {order: ASC, fields: [relativePath]}) {
    ...PartyFiles
  }
  gentlemen: allFile(filter: {relativeDirectory: {eq: "gentlemen"}, extension: {eq: "md"}}, sort: {order: ASC, fields: [relativePath]}) {
    ...PartyFiles
  }
  registry: allFile(filter: {relativeDirectory: {eq: "registry"}, extension: {eq: "yaml"}}, sort: {order: ASC, fields: [relativePath]}) {
    ...RegistryFiles
  }
  travel: allFile(filter: {relativeDirectory: {eq: "travel"}, extension: {eq: "yaml"}}, sort: {order: ASC, fields: [relativePath]}) {
    ...TravelFiles
  }
}
`;

export default Index;
