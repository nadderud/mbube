const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
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
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // create markdown pages
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${node.frontmatter.templateKey || 'page'}Template.js`,
        ),
        context: {
          slug: node.fields.slug,
        },
      });
    });

    // create calendar pages
    createPage({
      path: 'program',
      component: path.resolve('src/templates/programTemplate.js'),
      context: { calendarId: null },
    });

    result.data.allCalendar.edges.forEach(({ node }) => {
      const calendarIdParts = node.slug.split('/');
      const calendarIds = calendarIdParts.length ? ['', calendarIdParts[0], node.slug] : [''];
      createPage({
        path: `program/${node.slug}`,
        component: path.resolve('src/templates/programTemplate.js'),
        context: { calendarId: node.slug, calendarIds },
      });
    });

    return Promise.resolve();
  });
};
