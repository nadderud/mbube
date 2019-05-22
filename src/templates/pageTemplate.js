import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Text } from "grommet"

import Layout, { Heading } from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Heading>{frontmatter.title}</Heading>
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <hr />
      <Text>
        <Link to="/">Tilbake til forsiden</Link>
      </Text>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
