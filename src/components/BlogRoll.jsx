import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { Box, Grid, Heading, Text, Paragraph, Anchor } from "grommet"

import PreviewCompatibleImage from "./PreviewCompatibleImage"


import CustomTheme from "./customTheme"

const BlogRoll = ({ posts }) => (
  <CustomTheme>
    <Grid alignContent="center" columns="medium" gap="medium" fill="vertical">
    {posts &&
      posts.map(({ node: post }) => (
        <Box elevation="xsmall" direction="column" animation={{"type":"fadeIn","size":"medium"}} wrap={false} align="stretch" round="xsmall">
        <Box align="center" justify="center" height="small" background={{"dark":false,"color":"light-2"}} fill="horizontal" round={{"corner":"top","size":"xsmall"}}>
        <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  style: { width: "100%" },
                }}
              />
        </Box>
        <Box align="start" justify="center" pad="small" direction="column">
          <Box justify="center" direction="row" align="end" gap="small" margin={{"top":"xsmall","horizontal":"small"}} alignSelf="start">
            <Heading level="2" size="small" margin="none" textAlign="start">
            {post.frontmatter.title}
            </Heading>
            <Text textAlign="end" size="small" color="neutral-3" truncate={false}>
              {post.frontmatter.date}
            </Text>
          </Box>
          <Paragraph fill="true" size="medium" fontSize="xsmall" responsive="true" textAlign="start" margin={{"horizontal":"small"}}>
            {post.excerpt}
          </Paragraph>
          <Anchor label="Les mer..." color="neutral-3" margin="small"/>
        </Box>
            
      </Box>
      ))}
  </Grid>   
  </CustomTheme>
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
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 300)
              id
              fields {
                slug
              }
              frontmatter {
                title
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
