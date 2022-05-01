import React from "react"
import { Box, Paragraph, Text } from "grommet"
import { Link } from "gatsby"

// project components
import MaxWidthContainer from "../layout/MaxWidthContainer"
import HideOnPrintBox from "../miscellaneous/HideOnPrintBox"

const Footer = ({ isFrontpage = false }) => (
  <HideOnPrintBox>
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
  </HideOnPrintBox>
)

export default Footer
