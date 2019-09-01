/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, graphql } from 'gatsby';

import { Text } from 'grommet';

import Layout from '../components/Layout';
import WhiteBox from '../components/WhiteBox';
import SEO from '../components/seo';

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout
      title={frontmatter.title}
      before={(
        <WhiteBox>
          Her finner du møter og turer vi har planlagt fremover. Velg din enhet eller patrulje.
        </WhiteBox>
)}
    >
      <SEO title={frontmatter.title} />
      <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image
      }
    }
  }
`;
