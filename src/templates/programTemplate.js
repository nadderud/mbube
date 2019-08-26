import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Text } from "grommet"

import Layout, { Heading } from "../components/layout"
import SEO from "../components/seo"
import Calendars from "../components/Calendars"
import Events from "../components/Events"

const title = name => (name ? `Program for ${name}` : "Program")

export default function Template({ data: { calendar, allEvent } }) {
  const { id, name } = calendar || {}
  return (
    <Layout>
      <SEO title={title(name)} />
      <Heading>{title(name)}</Heading>
      <div>
        <Calendars selected={id} />
        {name ? <Events events={allEvent.nodes} /> : null}
      </div>
      <hr />
      <Text>
        <Link to="/">Tilbake til forsiden</Link>
      </Text>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($calendarId: String, $calendarName: String) {
    calendar(id: { eq: $calendarId }) {
      id
      name
    }
    allEvent(
      sort: { fields: start, order: ASC }
      filter: { calendar: { eq: $calendarName } }
    ) {
      nodes {
        id
        summary
        start
        organizer
        end
        location
        description
      }
    }
  }
`
