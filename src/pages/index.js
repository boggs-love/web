import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'styles/styles.scss';
import Header from 'app/components/header';
import Background from 'app/components/background';
import Stylesheet from 'app/components/stylesheet';
import RSVP from 'app/components/sections/rsvp/rsvp';
import Registry from 'app/components/sections/registry';
import Travel from 'app/components/sections/travel';

const Index = ({ data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
    <Stylesheet href="https://fonts.googleapis.com/css?family=Kaushan+Script|Lato" />
    <Background data={data.background} />
    <div className="app">
      <Header title={data.site.siteMetadata.title} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 pl-0 pr-0">
            <section className="pt-4 pb-4">
              <div className="container">
                <RSVP accepted={data.accepted} declined={data.declined} />
                <Registry registry={data.registry} />
                <Travel travel={data.travel} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
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
query MainQuery {
  site {
    siteMetadata {
      title
    }
  }
  background: file(name: {eq: "background"}) {
    sizes: childImageSharp {
      xs: resolutions(width: 576, quality: 85) {
        ...backgroundImageFields
      }
      sm: resolutions(width: 768, quality: 85) {
        ...backgroundImageFields
      }
      md: resolutions(width: 992, quality: 85) {
        ...backgroundImageFields
      }
      lg: resolutions(width: 1200, quality: 85) {
        ...backgroundImageFields
      }
      xl: resolutions(width: 1920, quality: 85) {
        ...backgroundImageFields
      }
    }
  }
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

fragment backgroundImageFields on ImageSharpResolutions {
  width
  srcSet
  srcSetWebp
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
