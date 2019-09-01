/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { graphql } from 'gatsby';
import {
  Paragraph, Button, Box, Grid,
} from 'grommet';

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
      isFrontPage
      title={frontmatter.title}
      image={frontmatter.image}
      before={(
        <WhiteBox>
          <Grid
            columns={['auto', 'auto']}
            rows={['auto']}
            gap="small"
            areas={[
              { name: 'desc', start: [0, 0], end: [0, 0] },
              { name: 'cta', start: [1, 0], end: [1, 0] },
            ]}
          >
            <Box gridArea="desc">
              <Paragraph>{frontmatter.description}</Paragraph>
            </Box>
            <Box gridArea="cta" margin={{ left: 'small', vertical: 'small' }}>
              <Box gap="small">
                <Button label="Bli speider" />
                <Button label="Arrangementer" />
              </Box>
            </Box>
          </Grid>
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
        image
      }
    }
  }
`;
