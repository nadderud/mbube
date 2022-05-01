import React from "react"
import { graphql } from "gatsby"
import { Paragraph, Heading } from "grommet"

// project components
import SEO from "../components/navigation/seo"
import Byline from "../components/miscellaneous/Byline"
import Hero from "../components/layout/Hero"
import WhiteBox from "../components/layout/WhiteBox"
import Content, { HTMLContent } from "../components/miscellaneous/Content"

export const BlogPostTemplate = ({
  title,
  featuredimage,
  date,
  description,
  content,
  contentComponent,
}) => {
  const RenderContent = contentComponent || Content
  return (
    <>
      <SEO title={title} />
      <Hero image={featuredimage} height="medium" />
      <WhiteBox>
        <Byline date={date} />
        <Heading level="1" margin={{ top: "small", bottom: "none" }}>
          {title}
        </Heading>
        {description && (
          <Paragraph
            fill
            size="large"
            margin={{ top: "small", bottom: "none" }}
          >
            {description}
          </Paragraph>
        )}
        <RenderContent content={content} />
      </WhiteBox>
    </>
  )
}

const BlogPost = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <BlogPostTemplate
      {...frontmatter}
      content={html}
      contentComponent={HTMLContent}
    />
  )
}

export default BlogPost

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
        description
        featuredimage {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
