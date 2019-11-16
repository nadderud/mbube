import React from "react"

import { Box } from "grommet"
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
  <Box>
    <MaxWidthContainer>
          <p>
              © 2009&ndash;
              {new Date().getFullYear()}
              {" Nadderud speidergruppe"}
              <TextInfo>
                <Link to="/info/" style={{color:"black"}}>mer informasjon</Link>
              </TextInfo>
          </p>
    </MaxWidthContainer>
  </Box>
)

export default Footer