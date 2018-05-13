import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';

const Travel = ({ travel }) => {
  if (!travel) {
    return null;
  }

  const locations = travel.edges.map(({ node }) => {
    const Link = node.data.url ? 'a' : 'span';

    return (
      <div key={node.data.id} className="mb-5 mt-5 text-center">
        <h6>{node.data.name}</h6>
        <div>
          <Link href={node.data.url} className="d-block">{node.data.title}</Link>
          {node.data.address.map(line => (<div key={line}>{line}</div>))}
        </div>
      </div>
    );
  });

  return (
    <Section title="Travel">
      <div className="row justify-content-center">
        <div className="col">
          {locations}
        </div>
      </div>
    </Section>
  );
};

Travel.propTypes = {
  travel: PropTypes.shape({
    edges: PropTypes.array.isRequired,
  }),
};

Travel.defaultProps = {
  travel: null,
};

export default Travel;
