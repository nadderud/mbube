/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql, navigate } from "gatsby"
import { Button, Box } from "grommet"

import SEO from "../components/seo"
import { initAuth } from "../app/services/auth"
import BlogRoll from "../components/BlogRoll"
import WhiteBox from "../components/WhiteBox"
import Hero from "../components/Hero"

import { Archive } from 'grommet-icons';

initAuth()

const navTo = href => e => {
  e.preventDefault()
  navigate(href)
}

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <SEO title={frontmatter.title} />
      <Hero image={frontmatter.image} height="medium" />
      <WhiteBox>
        <p>{frontmatter.description}</p>
        <Box gap="small" direction="row">
          <Button
            label="Arrangementer"
            href="/program/"
            onClick={navTo("/program/")}
          />
          <Button
            label="Bli speider"
            href="/bli-speider/"
            onClick={navTo("/bli-speider/")}
          />
        </Box>
      </WhiteBox>
      <WhiteBox>
        <BlogRoll />
        <Box 
          width="medium" 
          align="center" 
          alignSelf="center"
          margin="medium"
        >
          <Button
            size="small"
            icon={<Archive />}
            label="Flere artikkler"
            onClick={() => navigate("/artikler")}
          />
        </Box>
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
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
