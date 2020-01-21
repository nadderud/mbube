import React from "react"
import { graphql } from "gatsby"
import { Heading } from "grommet"

import SEO from "../components/seo"
import Byline from "../components/Byline"
import Hero from "../components/Hero"
import WhiteBox from "../components/WhiteBox"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <SEO title={frontmatter.title} />
      <Hero
        
        image={frontmatter.featuredimage}
        height="medium"
      />
      <WhiteBox>
        <Byline frontmatter={frontmatter} />
        <Heading level="2" margin={{"top":"small", "bottom":"none"}}>{frontmatter.title}</Heading>
        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </WhiteBox>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "D. MMMM YYYY", locale: "nb")
        title
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
