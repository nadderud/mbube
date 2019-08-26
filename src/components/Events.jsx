import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

const Events = ({ events }) => (
  <div className="columns is-multiline">
    {events &&
      events.map(event => (
        <div className="is-parent column is-6" key={event.id}>
          {event.summary}
        </div>
      ))}
  </div>
)

Events.propTypes = {
  events: PropTypes.array,
}

export default Events /* ({ calendar }) => (
  <StaticQuery
    CANNOT USE VARIABLES !!!!! DUH
    query={graphql`
      query EventsQuery($calendar: String!) {
        allEvent(
          sort: { fields: start, order: ASC }
          filter: { calendar: { eq: $calendar } }
        ) {
          nodes {
            id
            summary
            start
            organizer {
              displayName
            }
            end
            location
            description
          }
        }
      }
    `}
    render={data => <Events events={data.allEvent.edges} />}
  />
)
*/
