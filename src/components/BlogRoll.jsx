import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, navigate } from "gatsby"
import { Grid, Box, Button } from "grommet"

import BlogRollItem from "./BlogRollItem"

import { Archive } from 'grommet-icons';

const BlogRoll = ({ posts }) => (
  <Box>
    <Grid columns="300px" gap="medium">
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
    <Box 
      width="medium" 
      align="center" 
      alignSelf="center"
      margin="medium"
    >
      <Button
        size="small"
        icon={<Archive />}
        label="Arkiverte artikkler"
        onClick={() => navigate("/artikkler")}
      />
    </Box>
  </Box>
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
