/* eslint-disable react/jsx-filename-extension */
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

// project components
import WhiteBox from "../components/layout/WhiteBox"
import SEO from "../components/navigation/seo"
import Hero from "../components/layout/Hero"

export default function Template({ data: { markdownRemark } }) {
  const {
    frontmatter: { title, description, image },
    html,
  } = markdownRemark
  return (
    <>
      <SEO title={title} description={description} />
      <Hero title={title} image={image} />
      {description && <WhiteBox>{description}</WhiteBox>}
      <WhiteBox>
        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </WhiteBox>
    </>
  )
}

Template.propTypes = {
  data: PropTypes.shape({ markdownRemark: PropTypes.shape({}) }).isRequired,
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image 
      }
    }
  }
`
