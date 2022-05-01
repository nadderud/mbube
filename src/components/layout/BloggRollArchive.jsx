import React, { useEffect, useState } from "react"
import { Stack, Box, Grid, Text, FormField, Form, TextInput } from "grommet"
import { FormSearch } from "grommet-icons"

import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"

// project components
import BlogRoll from "../layout/BlogRoll"
import BlogRollItem from "../layout/BlogRollItem"

const BlogRollGrid = ({ posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <Grid columns="250px" gap="small">
          {posts &&
            posts.map(({ node: post }) => {
              return (
                <BlogRollItem
                  key={post.fields.slug}
                  image={post.frontmatter.featuredimage}
                  slug={post.fields.slug}
                  compact={true}
                  {...post.frontmatter}
                />
              )
            })}
        </Grid>
      ) : (
        <Text weight="bold">Beklager, vi fant ikke det som du lette etter</Text>
      )}
    </>
  )
}

const postFilter = (post, query) =>
  post.node.frontmatter.title.toLowerCase().includes(query) ||
  post.node.frontmatter.date.toLowerCase().includes(query)

const BloggRollArchive = ({ posts = [] }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(posts)

  useEffect(() => {
    if (query.length > 0) {
      setResults(posts.filter((post) => postFilter(post, query.toLowerCase())))
    } else {
      setResults(posts)
    }
  }, [query, posts])

  return (
    <>
      <Form>
        <FormField name="name" label="Søk etter tittel eller dato ">
          <Box width="medium" margin={{ vertical: "small" }}>
            <Stack anchor="top-right">
              <TextInput
                placeholder="Søk her..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FormSearch size="large" color="brand" />
            </Stack>
          </Box>
        </FormField>
      </Form>

      <BlogRollGrid posts={results} />
    </>
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
      query {
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
                description
                templateKey
                date(formatString: "D. MMMM YYYY", locale: "nb")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 300, quality: 50) {
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
      <BloggRollArchive posts={data.allMarkdownRemark.edges} />
    )}
  />
)
