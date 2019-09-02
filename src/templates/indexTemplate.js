/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { graphql, navigate } from 'gatsby';
import { Button, Box } from 'grommet';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { initAuth } from '../app/services/auth';
import BlogRoll from '../components/BlogRoll';
import WhiteBox from '../components/WhiteBox';

initAuth();

const navTo = (href) => (e) => {
  e.preventDefault();
  navigate(href);
};

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
          <p>{frontmatter.description}</p>
          <Box gap="small" direction="row">
            <Button label="Arrangementer" href="/program/" onClick={navTo('/program/')} />
            <Button label="Bli speider" href="/bli-speider/" onClick={navTo('/bli-speider/')} />
          </Box>
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
        image {
          childImageSharp {
            fluid(maxWidth: 2080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
