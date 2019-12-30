import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"
import { Box, Grid, Heading, Text, Paragraph, Anchor } from "grommet"

import PreviewCompatibleImage from "./PreviewCompatibleImage"


const BlogRoll = ({ posts }) => (
    <Grid alignContent="stretch" columns="300px" gap="medium" fill="vertical">
    {posts &&
      posts.map(({ node: post }) => (
        <div>
        <Box elevation="xsmall" animation={{"type":"fadeIn","size":"medium"}} round="xsmall">
          <Box height="small" background={{"dark":false,"color":"light-2"}} round={{"corner":"top","size":"xsmall"}}>
            <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      style: { width: "100%" },
                    }}
                  />
          </Box>
          <Box direction="column" margin="small">
            <Link to={post.fields.slug} style={{textDecoration:"None"}}> 
              <Heading color="black" level="2" size="small" margin="none" textAlign="start" margin={{"horizontal":"small", "vertical":"xsmall"}}>
                {post.frontmatter.title}
              </Heading>
            </Link>

            <Paragraph fill="true" size="medium" fontSize="xsmall"  responsive="true" textAlign="start" margin={{"horizontal":"small", "top":"xsmall"}}>
              {post.excerpt}
            </Paragraph>
  
            <Box align="center" direction="row" flex="false" gap="none" justify="between">
              <Box margin="small" width="90px">
                <Link to={post.fields.slug}> 
                  <Anchor label="Les mer..." color="#4d647c" margin="none"/>
                </Link>
              </Box>
              <Box alignSelf="end" margin={{"horizontal":"small"}}>
                <Text size="small" color="grey" margin="small" alignSelf="end">
                  Laget: {post.frontmatter.date}
                </Text> 
              </Box>
            </Box>
          </Box>

        </Box>
        </div>
      ))}
  </Grid >   
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
