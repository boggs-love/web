import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';

const Registry = ({ registry }) => {
  if (!registry) {
    return null;
  }

  const locations = registry.edges.map(({ node }) => {
    let row;

    console.log("NODE", node);

    if (node.data[0].html) {
      row = (
        <div className="col text-center">
          <div dangerouslySetInnerHTML={{ __html: node.data[0].html }} />
        </div>
      );
    } else if (node.data[0].logo) {
      row = (
        <a href={node.data[0].url} className="d-block col-6 col-sm-4">
          <img src={node.data[0].logo.url} alt={node.data[0].title} className="img-fluid" />
        </a>
      );
    }

    return (
      <div key={node.data[0].id} className="row justify-content-center mb-5">
        {row}
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
      data: children {
        id
        ... on MarkdownRemark {
          html
        }
        ... on RegistryYaml {
          title
          logo {
            url: publicURL
          }
          url
        }
      }
    }
  }
}
`;

export default Registry;
