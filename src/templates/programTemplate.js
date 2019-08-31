/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import WhiteBox from '../components/WhiteBox';
import MaxWidthContainer from '../components/MaxWidthContainer';
import SEO from '../components/seo';
import Calendars from '../components/Calendars';
import Events from '../components/Events';

const title = (name) => (name ? `Program for ${name}` : 'Program');

export default function Template({ data: { calendar, allEvent } }) {
  const { slug, name } = calendar || {};
  return (
    <Layout
      title={title(name)}
      before={(
        <>
          <WhiteBox>
            Her finner du møter og turer vi har planlagt fremover. Velg din enhet eller patrulje.
          </WhiteBox>
          <MaxWidthContainer>
            <Calendars selected={slug} />
          </MaxWidthContainer>
        </>
)}
    >
      <SEO title={title(name)} />
      {name ? <Events events={allEvent.nodes} /> : null}
    </Layout>
  );
}

export const pageQuery = graphql`
  query($calendarId: String, $calendarIds: [String]) {
    calendar(slug: { eq: $calendarId }) {
      slug
      name
    }
    allEvent(sort: { fields: start, order: ASC }, filter: { calendar: { in: $calendarIds } }) {
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
`;
