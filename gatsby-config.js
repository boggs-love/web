module.exports = {
  // @TODO Use ENV
  siteMetadata: {
    title: 'A + J',
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://0358d4baa01f428e9b5b0c1d54b1df44@sentry.io/1235411',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8,
      },
    },
  ],
};
