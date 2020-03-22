import React from "react"

import { Box, Paragraph, Text } from "grommet"
import MaxWidthContainer from "./MaxWidthContainer"
import { Link } from "gatsby"

const Footer = ({ isFrontpage = false }) => (
  <MaxWidthContainer>
    <Box justify="center" align="center" direction="row" gap="medium" wrap>
      {!isFrontpage && (
        <Text size="small">
          <Link to="/">Tilbake til forsiden</Link>
        </Text>
      )}
      <Text size="small">
        <Link to="/info/">Om speidergruppen</Link>
      </Text>
      <Text size="small">
        <Link to="/personvern/">Personvern (cookies)</Link>
      </Text>
      <Paragraph color="dark-3" size="small">
        © {new Date().getFullYear()}
        {" Nadderud speidergruppe"}
      </Paragraph>
    </Box>
  </MaxWidthContainer>
)

export default Footer
