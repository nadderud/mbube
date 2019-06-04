import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"
import { Heading, Paragraph } from "grommet"
import PreviewCompatibleImage from "./PreviewCompatibleImage"
import Byline from "./Byline"

const BlogRoll = ({ posts }) => (
  <div className="columns is-multiline">
    {posts &&
      posts.map(({ node: post }) => (
        <div className="is-parent column is-6" key={post.id}>
          <article
            className={`blog-list-item tile is-child box notification ${
              post.frontmatter.featuredpost ? "is-featured" : ""
            }`}
          >
            <header>
              {post.frontmatter.featuredimage ? (
                <div className="featured-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.title}`,
                    }}
                  />
                </div>
              ) : null}
              <Heading level={2} size="medium" margin={{ bottom: "xxsmall" }}>
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
          </article>
        </div>
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
