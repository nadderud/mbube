import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

import { unitColor } from "../style/unitColor"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const UnitLink = styled(Link)`
  text-decoration: none;
  padding: 1px 5px;
  margin: 1px;
  border: 3px solid transparent;
  box-sizing: border-box;
  white-space: nowrap;
  ${(props) => unitColor}
`

const Calendars = ({ calendars = [] }) => (
  <Container>
    {calendars.map(({ node: calendar }) => {
      const slugs = calendar.slug.split("/")
      const isMain = slugs.length === 1
      return (
        <UnitLink
          key={calendar.slug}
          unit={slugs[0]}
          to={`/program/${calendar.slug}/`}
          activeStyle={{ borderColor: "#333" }}
        >
          {isMain ? (
            <>
              <strong>{calendar.name}</strong>
              {calendar.nameExt}
            </>
          ) : (
            calendar.name
          )}
        </UnitLink>
      )
    })}
  </Container>
)

Calendars.propTypes = {
  calendars: PropTypes.arrayOf(PropTypes.shape),
}

Calendars.defaultProps = {
  calendars: [],
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query CalendarsQuery {
        allCalendar(
          filter: { visible: { eq: true } }
          sort: { fields: [sortKey, slug], order: ASC }
        ) {
          edges {
            node {
              id
              name
              nameExt
              slug
            }
          }
        }
      }
    `}
    render={(data) => (
      <Calendars calendars={data.allCalendar.edges} {...props} />
    )}
  />
)
