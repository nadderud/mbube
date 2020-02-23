import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Grid } from "grommet"

import BlogRollItem from "./BlogRollItem"

const BlogRoll = ({ posts }) => (
  <Grid alignContent="stretch" columns="300px" gap="medium" fill="vertical">
    {posts &&
      posts.map(({ node: post }) => (
        <BlogRollItem
          key={post.fields.slug}
          image={post.frontmatter.featuredimage}
          slug={post.fields.slug}
          {...post.frontmatter}
        />
      ))}
  </Grid>
)

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            isFuture: { eq: false }
            isExpired: { eq: false }
            frontmatter: { templateKey: { eq: "blog-post" } }
          }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
                date(formatString: "D. MMMM YYYY", locale: "nb")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 300, quality: 100) {
                      ...GatsbyImageSharpFluid
                      presentationWidth
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <BlogRoll posts={data.allMarkdownRemark.edges} count={count} />
    )}
  />
)
