import React from "react"
import { Box } from "grommet"

// project components
import MaxWidthContainer from "../layout/MaxWidthContainer"

const WhiteBox = ({ children }) => (
  <Box
    background="white"
    pad={{ vertical: "medium" }}
    margin={{ bottom: "medium" }}
  >
    <MaxWidthContainer margin={{ horizontal: "auto" }}>
      {children}
    </MaxWidthContainer>
  </Box>
)

export default WhiteBox
