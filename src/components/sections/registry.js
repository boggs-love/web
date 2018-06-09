import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';

const Registry = ({ registry }) => {
  if (!registry) {
    return null;
  }

  const locations = registry.edges.map(({ node }) => (
    <a key={node.data.id} href={node.data.url} className="d-block mb-5 mt-5">
      <img src={node.data.logo.url} alt={node.data.title} className="img-fluid" />
    </a>
  ));

  return (
    <Section title="Gift Registry">
      <div className="row justify-content-center">
        <div className="col-6 col-sm-4">
          {locations}
        </div>
      </div>
    </Section>
  );
};

Registry.propTypes = {
  registry: PropTypes.shape({
    edges: PropTypes.array.isRequired,
  }),
};

Registry.defaultProps = {
  registry: null,
};

export const query = graphql`
fragment RegistryFiles on FileConnection {
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
`;

export default Registry;
