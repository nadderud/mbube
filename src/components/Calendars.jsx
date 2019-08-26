import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

const Calendars = ({ calendars, selected }) => (
  <div className="columns is-multiline">
    {calendars &&
      calendars.map(({ node: calendar }) => (
        <div className="is-parent column is-6" key={calendar.id}>
          <Link to={`/program/${calendar.slug}/`}>
            {calendar.name} {selected === calendar.id ? " (VALGT)" : ""}
          </Link>
        </div>
      ))}
  </div>
)

Calendars.propTypes = {
  calendars: PropTypes.array,
  selected: PropTypes.string,
}

export default props => (
  <StaticQuery
    query={graphql`
      query CalendarsQuery {
        allCalendar {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `}
    render={data => <Calendars calendars={data.allCalendar.edges} {...props} />}
  />
)
