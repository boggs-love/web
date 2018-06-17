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
        <div key={node.data.id} className="row justify-content-center mb-5">
          <a href={node.data.url} className="d-block col-6 col-sm-4">
            <img src={node.data.logo.url} alt={node.data.title} className="img-fluid" />
          </a>
        </div>
      );
    }

    return (
      <div key={node.data.id} className="row mb-5">
        <div className="col text-center">
          {node.data.description}
        </div>
      </div>
    );
  });

  return (
    <Section title="Gift Registry">
      <div className="mt-5">
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
