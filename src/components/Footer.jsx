import React from "react"
import { Link } from "gatsby"
import { Box, Text } from "grommet"
import MaxWidthContainer from "./MaxWidthContainer"

const Footer = () => (
  <Box
    background="light-2"
    pad={{ vertical: "large" }}
    margin={{ top: "medium" }}
  >
    <MaxWidthContainer>
      <Text size="small" color="dark-2">
        © 2009&ndash;{new Date().getFullYear()} Nadderud speidergruppe
        {"  |  "}
        <Link to="/kontakt/">Kontakt oss</Link>
      </Text>
    </MaxWidthContainer>
  </Box>
)

export default Footer
