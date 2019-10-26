import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Box, Anchor } from "grommet"
import MaxWidthContainer from "./MaxWidthContainer"
import styled from "styled-components"
import { Link } from "gatsby"


const TextInfo = styled.div`
  float: none;
  margin-top: 20px;
  @media (min-width: 576px) {
    float: right;
    margin-top: 0px;
  }
`


const Footer = () => (
  <Box
    color="black"
    background="none"
    pad={{ top: "0px" }}
    margin={{ top: "0px" }}
  >
    <MaxWidthContainer>
      
          <p>
              © 2009&ndash;
              {new Date().getFullYear()}
              {" Nadderud speidergruppe"}
              <TextInfo>
                <Link to="/info/" style={{color:"black"}}>mere informasjon</Link>
              </TextInfo>
          </p>
          
          
        
    </MaxWidthContainer>
  </Box>
)

Footer.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      }).isRequired
    ),
  }),
}

Footer.defaultProps = {
  data: { description: "", contacts: [] },
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(fields: { slug: { eq: "/" } }) {
          frontmatter {
            description
            contacts {
              name
              title
              email
              phone
            }
          }
        }
      }
    `}
    render={data => <Footer data={data.markdownRemark.frontmatter} />}
  />
)
