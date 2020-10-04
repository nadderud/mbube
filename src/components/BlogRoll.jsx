import React, { useContext } from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, navigate } from "gatsby"

import { Grid, Box, ResponsiveContext, Button } from "grommet"
import { Archive } from 'grommet-icons';

import BlogRollItem from "./BlogRollItem"


const BlogRoll = ({ posts }) => {
  const size = useContext(ResponsiveContext);
  return(
    <Grid columns={["auto","auto","auto","auto","auto","auto"]} gap="small">
    {posts &&
      posts.map(({ node: post }) => (
        <Box width={size !== "small" ? "medium" : "85vw"} >
          <BlogRollItem
            key={post.fields.slug}
            image={post.frontmatter.featuredimage}
            slug={post.fields.slug}
            {...post.frontmatter}
          />
        </Box>
      ))}
      <Box 
          width="300px" 
          align="start" 
          alignSelf="center"
          margin="medium"
        >
          <Button
            size="small"
            icon={<Archive />}
            label="Alle artikler"
            onClick={() => navigate("/artikler")}
            primary
          />
        </Box>
    </Grid>
  )
}

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
