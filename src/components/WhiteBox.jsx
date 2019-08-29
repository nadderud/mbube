import React from "react"
import { Box } from "grommet"
import MaxWidthContainer from "./MaxWidthContainer"

const WhiteBox = ({ children }) => (
  <Box
    background="white"
    pad={{ horizontal: "small", vertical: "large" }}
    margin={{ bottom: "large" }}
  >
    <MaxWidthContainer>{children}</MaxWidthContainer>
  </Box>
)

export default WhiteBox
