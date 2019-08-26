/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
      allCalendar {
        edges {
          node {
            slug
            name
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    // create markdown pages
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${node.frontmatter.templateKey || "page"}Template.js`
        ),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    // create calendar pages
    createPage({
      path: `program`,
      component: path.resolve("src/templates/programTemplate.js"),
      context: { calendarId: null },
    })
    result.data.allCalendar.edges.forEach(({ node }) => {
      createPage({
        path: `program/${node.slug}`,
        component: path.resolve("src/templates/programTemplate.js"),
        context: { calendarId: node.id, calendarName: node.name },
      })
    })
  })
}
