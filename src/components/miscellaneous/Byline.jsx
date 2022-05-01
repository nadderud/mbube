import React from "react"
import { Paragraph } from "grommet"

// project components
import parseDate from "../calendar/parseDate"

const Byline = ({ date }) => (
  <Paragraph size="small" color="dark-2" margin={{ vertical: "none" }}>
    {date && parseDate(date).format("dddd D. MMMM YYYY")}
  </Paragraph>
)

export default Byline
