import React from "react"
import { graphql } from "gatsby"
import WhiteBox from "../components/WhiteBox"
import Hero from "../components/Hero"
import SEO from "../components/seo"
import Instagram from "../components/Instagram"

const BilderInstagram = ({ data: { markdownRemark } }) => {
  const {
    frontmatter: { title, description, image },
  } = markdownRemark
  return (
    <div>
      <SEO title={title} description={description} />
      <Hero title={title} image={image} />
      <WhiteBox>{description}</WhiteBox>
      <WhiteBox>
        <h1>Bilder fra Instagram</h1>
        <Instagram />
        <p>
          Trykk for å gå til{" "}
          <a href="https://www.instagram.com/nadderudspeidergruppe/?hl=nb">
            nadderudspeidergruppe
          </a>{" "}
          på Instagram{" "}
        </p>
      </WhiteBox>
    </div>
  )
}

export default BilderInstagram

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
