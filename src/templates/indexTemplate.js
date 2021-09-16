/* eslint-disable react/jsx-filename-extension */
import React, {useRef} from "react"
import { graphql, navigate } from "gatsby"
import { Button, Box, Heading, Text } from "grommet"
import HeroBackground from "../components/HeroBackground"
import SEO from "../components/seo"
import { initAuth } from "../app/services/auth"
import BlogRoll from "../components/BlogRoll"
import WhiteBox from "../components/WhiteBox"
import MaxWidthContainer from "../components/MaxWidthContainer"
import Panel from "../components/panel"
import { CaretDown as Down } from "grommet-icons"

initAuth()

const navTo = href => e => {
  e.preventDefault()
  navigate(href)
}

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter: { title, description, imageOne, imageTwo, imageThree }, html } = markdownRemark
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView({behavior: 'smooth'})
  return (
    <>
      <SEO title={title} description={description} />
      <Box height="93vh" fill="horizontal" background="accent-4">
        <HeroBackground image={imageOne} height="85vh">
          <MaxWidthContainer animation="fadeIn" fill="vertical" justify="center">
            <Box margin={{bottom:"xlarge", top:"0"}}>
              <Heading color="brand" margin="0" style={{textShadow: "1px 1px 10px #fafafa"}}>
                Friluft, mestring og sammhold!
            </Heading>
            <Heading margin="0" level="2" color="white">
              Prøv speideing da vel!
            </Heading>
            </Box>
          
          </MaxWidthContainer>
        </HeroBackground>

        <Box background="white" height="100px" fill="horizontal" justify="center">
          <Box 
            alignSelf="center" 
            height="xxsmall" 
            width="xxsmall"  
            align="center"
            justify="center"
            onClick={()=> executeScroll()}
            hoverIndicator={true}
            animation="pulse"
            >
              <Down />
          </Box>
          <div ref={myRef}></div>
        </Box>
        
      </Box>
      <Panel
        image={imageTwo}
        title="Litt om oss"
        text={description}
      />
      <Box gap="small" direction="row" justify="center" background="white" fill="horizontal" pad={{bottom:"medium", top:"xsmall"}}>
          <Button
            label="Arrangementer"
            href="/program/"
            onClick={navTo("/program/")}
          />
          <Button
            label="Bli speider"
            href="/bli-speider/"
            onClick={navTo("/bli-speider/")}
            primary
          />
        </Box>
      <BlogRoll />
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
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageTwo {
          childImageSharp {
            fluid(maxWidth: 600) {
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
