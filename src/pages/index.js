import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'styles/styles.scss';
import Form from 'app/components/form';
import Background from 'app/components/background';

const Index = ({ data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
    <Background data={data.background} />
    <div className="app">
      <header className="fixed-top pt-1 pb-1">
        <h1 className="text-center">{data.site.siteMetadata.title}</h1>
      </header>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 pl-0 pr-0">
            <section className="pt-3 pb-3">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h4 className="text-center">RSVP</h4>
                    <Form />
                  </div>
                </div>
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
  background: allImageSharp(limit: 1) {
    edges {
      node {
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
  }
}

fragment backgroundImageFields on ImageSharpResolutions {
  width
  srcSet
  srcSetWebp
}
`;

export default Index;
