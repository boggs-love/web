import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'styles/styles.scss';
import Header from 'app/components/header';
import Stylesheet from 'app/components/stylesheet';

const Index = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
    <Stylesheet href="https://fonts.googleapis.com/css?family=Kaushan+Script|Lato" />
    <div className="app">
      <Header title={data.site.siteMetadata.title} />
      {children()}
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
}
`;

export default Index;
