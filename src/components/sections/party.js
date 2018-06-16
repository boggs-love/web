import React from 'react';
import PropTypes from 'prop-types';
import Section from 'app/components/sections/section';

const Picture = ({
  srcSet,
  srcSetWebp,
  src,
  alt,
}) => (
  <picture>
    <source srcSet={srcSetWebp} type="image/webp" />
    <source srcSet={srcSet} />
    <img src={src} srcSet={srcSet} alt={alt} className="img-fluid" />
  </picture>
);

Picture.propTypes = {
  srcSet: PropTypes.string.isRequired,
  srcSetWebp: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

class Party extends React.Component {
  constructor(props) {
    super(props);

    this.selectPerson = this.selectPerson.bind(this);

    this.state = {
      selected: undefined,
    };
  }

  selectPerson(selected) {
    this.setState({
      ...this.state,
      selected,
    });
  }

  render() {
    let index = 0;
    if (this.state.selected) {
      index = this.props.party.edges.findIndex(({ node }) => (
        node.data.id === this.state.selected
      ));
    }

    const selected = this.props.party.edges[index].node.data;

    const additional = [
      ...this.props.party.edges.slice(0, index),
      ...this.props.party.edges.slice(index + 1),
    ];

    const pictures = (
      <div className="row no-gutters mb-3">
        <div className="col-8">
          <button className="btn btn-link border-0 p-0" onClick={() => this.selectPerson(undefined)}>
            <Picture
              alt={selected.meta.name}
              {...selected.meta.image.sizes.square}
            />
          </button>
        </div>
        <div className="col-4">
          {additional.map(({ node }) => (
            <button
              key={node.data.id}
              className="btn btn-link border-0 p-0"
              onClick={() => this.selectPerson(node.data.id)}
            >
              <Picture
                alt={node.data.meta.name}
                {...node.data.meta.image.sizes.square}
              />
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <Section title={this.props.title}>
        {pictures}
        <h5>{selected.meta.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: selected.html }} />
      </Section>
    );
  }
}

Party.propTypes = {
  title: PropTypes.string.isRequired,
  party: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export const query = graphql`
fragment PartyFiles on FileConnection {
  edges {
    node {
      data: childMarkdownRemark {
        id
        meta: frontmatter {
          name
          image {
            sizes: childImageSharp {
              square: resolutions(width: 424, height: 424, cropFocus: CENTER, quality: 85) {
                src
                srcSet
                srcSetWebp
              }
            }
          }
        }
        html
      }
    }
  }
}
`;

export default Party;
