import React from "react"
import styled from "styled-components"

import parseDate from "./parseDate"

const Container = styled.div`
  width: 65px;
  flex-shrink: 0;
  margin-right: 5px;
`

const BigDate = styled.div`
  font-size: 20px;
  line-height: 22px;
  font-weight: 600;
  text-align: center;
  word-wrap: normal;
  letter-spacing: -1px;
  white-space: nowrap;
`

const SmallDay = styled.div`
  font-size: 12px;
  text-align: center;
  word-wrap: normal;
  white-space: nowrap;
  line-height: 10px;
`

const EventDate = ({ start: startRaw, end: endRaw }) => {
  const start = parseDate(startRaw)
  const end = parseDate(endRaw)
  const span = !start.isSame(end, "day")

  return (
    <Container>
      <BigDate>
        {start.format("D")}
        {span && end.format("-D")}
      </BigDate>
      <SmallDay>
        {start.format("ddd")}
        {span && end.format("-ddd")}
      </SmallDay>
    </Container>
  )
}

export default EventDate
