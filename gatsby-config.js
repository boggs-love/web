module.exports = {
  // @TODO Use ENV
  siteMetadata: {
    title: 'A + J'
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pictures',
        path: `${__dirname}/content/pictures/`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      }
    }
  ]
}
