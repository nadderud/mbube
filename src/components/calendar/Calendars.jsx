import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

import unitColor from "../style/unitColor"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const ItemLink = styled(Link)`
  text-decoration: none;
  padding: 1px 5px;
  margin: 1px;
  border: 3px solid transparent;
  box-sizing: border-box;
  white-space: nowrap;
`

const Calendars = ({ calendars = [] }) => (
  <Container>
    {calendars.map(({ node: calendar }) => {
      const slugs = calendar.slug.split("/")
      const isMain = slugs.length === 1
      const UnitLink = unitColor(ItemLink, slugs[0])
      return (
        <UnitLink
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

export default props => (
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
    render={data => <Calendars calendars={data.allCalendar.edges} {...props} />}
  />
)
