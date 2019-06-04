import React from "react"
import PropTypes from "prop-types"
import { Box } from "grommet"

const MaxWidthContainer = ({ children, ...props }) => (
  <Box
    style={{
      maxWidth: 960,
      width: "100%",
    }}
    margin={{ horizontal: "auto" }}
    pad={{ horizontal: "medium" }}
    {...props}
  >
    {children}
  </Box>
)

MaxWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MaxWidthContainer
