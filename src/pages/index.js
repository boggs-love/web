import React from 'react';
import PropTypes from 'prop-types';
import RSVP from 'app/components/sections/rsvp/rsvp';
import Registry from 'app/components/sections/registry';
import Travel from 'app/components/sections/travel';

const Index = ({ data }) => (
  <div>
    <RSVP accepted={data.accepted} declined={data.declined} />
    <Registry registry={data.registry} />
    <Travel travel={data.travel} />
  </div>
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
  accepted: file(name: {eq: "accepted"}) {
    ...markdownFile
  }
  declined: file(name: {eq: "declined"}) {
    ...markdownFile
  }
  registry: allFile(filter: {relativeDirectory: {eq: "registry"}}) {
    edges {
      node {
        data: childRegistryYaml {
          id
          title
          logo {
            url: publicURL
          }
          url
        }
      }
    }
  }
  travel: allFile(filter: {relativeDirectory: {eq: "travel"}}) {
    edges {
      node {
        data: childTravelYaml {
          id
          name
          title
          url
          address
        }
      }
    }
  }
}

fragment markdownFile on File {
  data: childMarkdownRemark {
    meta: frontmatter {
      title
    }
    html
  }
}
`;

export default Index;
