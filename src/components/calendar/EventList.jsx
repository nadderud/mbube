import React from "react"
import PropTypes from "prop-types"

import parseDate from "./parseDate"
import EventItem from "./EventItem"
import styled from "styled-components"
import { Heading } from "grommet"
import moment from "moment"

const StyledMonth = styled(Heading)`
  background: #333;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 0;
  padding: 8px 10px;
  line-height: 1;
  font-size: 16px;
  max-width: none;
`

const Month = ({ children }) => (
  <StyledMonth level={2} margin={{ top: "medium", bottom: "none" }}>
    {children}
  </StyledMonth>
)

const currentFilter = (events) =>
  events.filter((item) => parseDate(item.end).isSameOrAfter(moment(), "day"))

const EventList = ({ events = [] }) => {
  const currentEvents = currentFilter(events)
  if (currentEvents.length < 1) {
    return <div className="nothing">Terminlisten er tom.</div>
  }

  let currentMonth = null

  const monthRow = function monthRow(date) {
    const thisMonth = new Date(date).getMonth()
    if (currentMonth === thisMonth) {
      return null
    }
    currentMonth = thisMonth
    return <Month>{parseDate(date).format("MMMM")}</Month>
  }

  return (
    <div>
      {currentEvents.map((item) => (
        <React.Fragment key={item.id}>
          {monthRow(item.start)}
          <EventItem data={item} />
        </React.Fragment>
      ))}
    </div>
  )
}

EventList.propTypes = {
  events: PropTypes.array,
}

export default EventList
