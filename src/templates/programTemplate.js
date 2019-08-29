import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Text } from "grommet"

import Layout, { Heading } from "../components/layout"
import WhiteBox from "../components/WhiteBox"
import SEO from "../components/seo"
import Calendars from "../components/Calendars"
import Events from "../components/Events"

const title = name => (name ? `Program for ${name}` : "Program")

export default function Template({ data: { calendar, allEvent } }) {
  const { slug, name } = calendar || {}
  return (
    <Layout
      title={title(name)}
      before={
        <WhiteBox>
          Her finner du møter og turer vi har planlagt fremover. Velg din enhet
          eller patrulje.
        </WhiteBox>
      }
    >
      <SEO title={title(name)} />
      <div>
        <Calendars selected={slug} />
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
  query($calendarId: String, $calendarIds: [String]) {
    calendar(slug: { eq: $calendarId }) {
      slug
      name
    }
    allEvent(
      sort: { fields: start, order: ASC }
      filter: { calendar: { in: $calendarIds } }
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
