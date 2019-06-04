import React from "react"
import { Paragraph } from "grommet"

const Byline = ({ frontmatter = {}, children }) => (
  <Paragraph size="small" color="dark-2" margin={{ vertical: "none" }}>
    {frontmatter.date}
    {children}
  </Paragraph>
)

export default Byline
