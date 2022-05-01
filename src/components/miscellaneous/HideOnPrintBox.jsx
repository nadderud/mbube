import styled from "styled-components"
import { Box } from "grommet"

const HideOnPrintBox = styled(Box)`
  @media print {
    display: none;
  }
`

export default HideOnPrintBox
