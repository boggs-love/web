import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'styles/styles.scss';
import Header from 'app/components/header';
import Background from 'app/components/background';
import Stylesheet from 'app/components/stylesheet';

const Index = ({ children, data }) => (
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
                {children()}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Index.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({
    background: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const query = graphql`
query LayoutQuery {
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
}

fragment backgroundImageFields on ImageSharpResolutions {
  width
  srcSet
  srcSetWebp
}
`;

export default Index;
