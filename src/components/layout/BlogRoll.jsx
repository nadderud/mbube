import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, Link } from "gatsby"

import { Box, ResponsiveContext, Text, Heading } from "grommet"
import { Archive } from "grommet-icons"
import styled from "styled-components"

// project components
import MaxWidthContainer from "./MaxWidthContainer"
import BlogRollItem from "./BlogRollItem"

const Container = styled.div`
  padding: 1rem;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`
const Child = styled.div`
  scroll-snap-align: center;
  display: inline-block;
  border-radius: 3px;
  margin-right: 3rem;
`

const isMobile = (size) => size === "xsmall" || size === "small"

const BlogRoll = ({ posts }) => {
  const size = React.useContext(ResponsiveContext)
  return (
    <Box background="light-1" pad={{ vertical: "medium" }}>
      <Heading level="2" margin="small" alignSelf="center">
        Artikler
      </Heading>
      <Container>
        {isMobile(size) ? (
          ""
        ) : (
          <Child>
            {" "}
            <div style={{ width: "250px" }} />
          </Child>
        )}

        {posts &&
          posts.map(({ node: post }) => {
            return (
              <Child key={post.id}>
                <BlogRollItem
                  key={post.fields.slug}
                  image={post.frontmatter.featuredimage}
                  slug={post.fields.slug}
                  width={isMobile(size) ? "300px" : "medium"}
                  {...post.frontmatter}
                />
              </Child>
            )
          })}
      </Container>

      <MaxWidthContainer>
        <Link to="/artikler/" style={{ alignSelf: "center" }}>
          <Box direction="row" gap="small">
            <Archive color="dark-2" />
            <Text color="dark-2"> Eldre innlegg </Text>
          </Box>
        </Link>
      </MaxWidthContainer>
    </Box>
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
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 5
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
