import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"
import { Heading, Paragraph, Box } from "grommet"
import PreviewCompatibleImage from "./PreviewCompatibleImage"
import Byline from "./Byline"

const BlogRoll = ({ posts }) => (
  <div className="columns is-multiline">
    {posts &&
      posts.map(({ node: post }) => (
        <Box padding={{ vertical: "medium" }} key={post.id}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: "1 0 200px", paddingRight: ".5em" }}>
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail"></div>
                ) : null}
                <Heading
                  level={2}
                  size="medium"
                  margin={{ bottom: "xxsmall", top: "none" }}
                >
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                </Heading>
                <Byline frontmatter={post.frontmatter} />
              </header>
              <Paragraph margin={{ top: "xsmall" }}>{post.excerpt}</Paragraph>
            </div>
            <div style={{ width: "100%", flex: "0 1 400px" }}>
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  style: { width: "100%" },
                }}
              />
            </div>
          </div>
        </Box>
      ))}
  </div>
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
              excerpt(pruneLength: 400)
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
