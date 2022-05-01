import React from "react"
import {
  Location as LocationIcon,
  Clock as ClockIcon,
  Tip as TipIcon,
} from "grommet-icons"
import { Heading, Text } from "grommet"
import styled from "styled-components"

import parseDate from "./parseDate"
import EventDate from "./EventDate"
import UnitBadge from "../layout/UnitBadge"

const Container = styled.div`
  display: flex;
  align-items: stretch;
  padding: 10px 5px 10px 0;
  margin: 0 0 1px 0;
  background-color: #fff;
`

const MainItem = styled.div`
  flex-grow: 2;
`

const MarginLeft = styled.span`
  margin-left: 3px;
`

const EventTagBase = ({ className, Icon, children }) => (
  <Text size="small" className={className}>
    <EventTagInner>
      <Icon size="small" />
      <MarginLeft>{children}</MarginLeft>
    </EventTagInner>
  </Text>
)

const EventTag = styled(EventTagBase)`
  margin: 0 15px 2px 0;
  line-height: 1.25;
`

const EventTagInner = styled.div`
  margin-left: 15px;
  text-indent: -15px;
`

const EventNoteTag = styled(EventTag)`
  background: #ffffcc;
  padding: 2px 4px;
  margin: -2px 0px 3px -4px;
`

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const eventTime = (startRaw, endRaw) => {
  const start = parseDate(startRaw)
  const end = parseDate(endRaw)

  start.locale("nb")
  end.locale("nb")

  if (start.isSame(end, "day")) {
    return (
      <EventTag Icon={ClockIcon}>
        {start.format("HH:mm")}–{end.format("HH:mm")}
      </EventTag>
    )
  }

  return null
}

const calendarUnit = (calendar) => calendar.split("/")[0]

const EventItem = ({
  data: { id, start, end, summary, location, description, organizer, calendar },
}) => (
  <Container key={id}>
    <EventDate start={start} end={end} />
    <MainItem>
      <UnitBadge name={organizer} unit={calendarUnit(calendar)} />
      <Heading level={3} size="17px" margin="none" responsive={false}>
        {summary}
      </Heading>
      <EventMeta>
        {eventTime(start, end)}
        {location && <EventTag Icon={LocationIcon}>{location}</EventTag>}
        {description && (
          <EventNoteTag Icon={TipIcon}>{description}</EventNoteTag>
        )}
      </EventMeta>
    </MainItem>
  </Container>
)

export default EventItem
