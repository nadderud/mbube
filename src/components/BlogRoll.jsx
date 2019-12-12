import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"
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
        <Box pad="small">
          <Link to={post.fields.slug} style={{textDecoration:"None"}}> 
            <Heading color="black" level="2" size="small" margin="none" textAlign="start" margin={{"horizontal":"small", "vertical":"xsmall"}}>
            
            {post.frontmatter.title}
            
            </Heading>
            </Link>
        
          <Paragraph fill="true" size="medium" fontSize="xsmall" responsive="true" textAlign="start" margin={{"horizontal":"small", "top":"xsmall"}}>
            {post.excerpt}
          </Paragraph>

          <Grid columns="50%" fill="vertical" pad={{"top":"xsmall"}}>
          <Box margin="small">
          <Link to={post.fields.slug}> 
            <Anchor label="Les mer..." color="#4d647c" margin="none"/>
          </Link>
          </Box>

          <Box align="end" margin={{"horizontal":"small"}}>
          <Text size="small" color="grey" margin="small" alignSelf="end">
            {post.frontmatter.date}
          </Text> 
          </Box>

          </Grid>

        
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
