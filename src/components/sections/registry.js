import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';

const Registry = ({ registry }) => {
  if (!registry) {
    return null;
  }

  const locations = registry.edges.map(({ node }) => {
    if (node.data.logo) {
      return (
        <a key={node.data.id} href={node.data.url} className="d-block col-6 col-sm-4 mb-5">
          <img src={node.data.logo.url} alt={node.data.title} className="img-fluid" />
        </a>
      );
    }

    return (
      <div key={node.data.id} className="mb-5">
        {node.data.description}
      </div>
    );
  });

  return (
    <Section title="Gift Registry">
      <div className="row justify-content-center mt-5">
        {locations}
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
        description
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
