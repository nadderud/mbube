/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql } from "gatsby"

// project components
import WhiteBox from "../components/layout/WhiteBox"
import MaxWidthContainer from "../components/layout/MaxWidthContainer"
import SEO from "../components/navigation/seo"
import Hero from "../components/layout/Hero"
import Calendars from "../components/calendar/Calendars"
import EventList from "../components/calendar/EventList"
import AllEventsList from "../components/calendar/AllEventsList"

const title = (slug, name) => (slug ? `Program for ${name}` : "Program")

export default function Template({ data: { calendar, allEvent, image } }) {
  const { slug, name } = calendar || {}
  return (
    <>
      <SEO title={title(slug, name)} />
      <Hero title={title(slug, name)} image={image} />
      <WhiteBox>
        Her finner du møter og turer vi har planlagt fremover. Troppen (5. 10.
        klasse) bruker også Spond.
      </WhiteBox>
      <MaxWidthContainer margin={{ horizontal: "auto", bottom: "small" }}>
        <Calendars selected={slug} />
        {slug ? <EventList events={allEvent.nodes} /> : <AllEventsList />}
      </MaxWidthContainer>
    </>
  )
}

export const pageQuery = graphql`
  query ($calendarId: String, $calendarIds: [String]) {
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
        calendar
      }
    }
    image: file(name: { eq: "vann" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
