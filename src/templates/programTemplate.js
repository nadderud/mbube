/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import WhiteBox from "../components/WhiteBox"
import MaxWidthContainer from "../components/MaxWidthContainer"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import Calendars from "../components/Calendars"
import Events from "../components/Events"

const title = (slug, name) => (slug ? `Program for ${name}` : "Program")

export default function Template({ data: { calendar, allEvent } }) {
  const { slug, name } = calendar || {}
  return (
    <Layout>
      <SEO title={title(slug, name)} />
      <Hero title={title(slug, name)} />
      <WhiteBox>
        Her finner du møter og turer vi har planlagt fremover. Velg din enhet
        eller patrulje.
      </WhiteBox>
      <MaxWidthContainer margin={{ horizontal: "auto", bottom: "small" }}>
        <Calendars selected={slug} />
      </MaxWidthContainer>
      <WhiteBox>
        {slug ? (
          <Events events={allEvent.nodes} />
        ) : (
          <div className="nothing">Velg en enhet eller patrulje.</div>
        )}
      </WhiteBox>
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
