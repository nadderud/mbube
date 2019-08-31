/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { graphql } from 'gatsby';
import { Paragraph } from 'grommet';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { initAuth } from '../app/services/auth';
import BlogRoll from '../components/BlogRoll';
import WhiteBox from '../components/WhiteBox';

initAuth();

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout
      showNavBack={false}
      before={(
        <WhiteBox>
          <Paragraph>{frontmatter.description}</Paragraph>
        </WhiteBox>
)}
    >
      <SEO title={frontmatter.title} />
      <div>
        <BlogRoll />
        <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
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
        description
      }
    }
  }
`;
