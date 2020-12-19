/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql, navigate } from "gatsby"
import { Button, Box, Heading } from "grommet"

import SEO from "../components/seo"
import { initAuth } from "../app/services/auth"
import BlogRoll from "../components/BlogRoll"
import WhiteBox from "../components/WhiteBox"

import MaxWidthContainer from "../components/MaxWidthContainer"
import ImageCarousel from "../components/ImageCarousel"

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
      <ImageCarousel 
        height="90vh"
        speed={9000}
        data={[{
          image: frontmatter.imageOne.childImageSharp.fluid,
          header: "Nadderud Speidergruppe",
          text: frontmatter.description
        },
         {
          image: frontmatter.imageTwo.childImageSharp.fluid,
          header: "Flokken 3.-4. klasse",
          text: frontmatter.description
        },
         {
          image: frontmatter.imageThree.childImageSharp.fluid,
          header: "Troppen 5.-10. klasse",
          text: frontmatter.description
        }]}
      />
      
      <WhiteBox>
        <p style={{"display":"none"}}>{frontmatter.description}</p>
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

      <Box 
        background={{
          "image": "url(https://www.transparenttextures.com/patterns/dark-stripes-light.png)",
          "color": "neutral-3",
          "repeat": "repeat",
          "size": "auto",
          "opacity": "strong",
        }} 
        pad={{vertical:"medium"}} 
      >
        <MaxWidthContainer>
          <Heading level="2" margin="small">Nye artikler</Heading>
          <Box style={{height:"1px", width:"100%", background:"white"}} />
        </MaxWidthContainer>

        <Box fill="horizontal" pad="small" overflow="scroll">
          <MaxWidthContainer>
            <BlogRoll />
          </MaxWidthContainer>
        </Box>
      </Box>
    
      <WhiteBox>
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
        imageOne {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageThree {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageTwo {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
