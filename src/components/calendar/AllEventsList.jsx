import React from "react"
import { graphql, StaticQuery } from "gatsby"

import EventList from "./EventList"

export default props => (
  <StaticQuery
    query={graphql`
      query AllEventsQuery {
        allEvent(sort: { fields: start, order: ASC }) {
          nodes {
            id
            summary
            start
            organizer
            end
            location
            description
            calendar
          }
        }
      }
    `}
    render={data => <EventList events={data.allEvent.nodes} {...props} />}
  />
)
