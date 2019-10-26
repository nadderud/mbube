const proxy = require("http-proxy-middleware")

require("dotenv").config({
  path: ".env",
})

module.exports = {
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  siteMetadata: {
    title: "Nadderud speidergruppe",
    description:
      "Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",
    author: "@gatsbyjs",
  },
  plugins: [
    {
      resolve: "@horacioh/gatsby-theme-instagram",
      options: {
        type: `account`, // optional. `account` is the default `type` value
        username: "nadderudspeidergruppe",
      },
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: ["/app/*"] },
    },
    "gatsby-plugin-react-helmet",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/static/img/upload`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "images",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-styled-components",
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gcal",
      options: {
        path: `${__dirname}/src/data/calendars.json`,
        apiKey: process.env.GOOGLE_KEY,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
}
