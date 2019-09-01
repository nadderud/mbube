import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Box, Paragraph } from 'grommet';
import MaxWidthContainer from './MaxWidthContainer';

const Footer = ({ data }) => (
  <Box background="dark-1" pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
    <MaxWidthContainer>
      <div>
        <p>
          <small>
            © 2009&ndash;
            {new Date().getFullYear()}
            {' Nadderud speidergruppe'}
          </small>
        </p>
        <p>{data.description}</p>
      </div>
    </MaxWidthContainer>
  </Box>
);

export default () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(fields: { slug: { eq: "/" } }) {
          frontmatter {
            description
          }
        }
      }
    `}
    render={(data) => <Footer data={data.markdownRemark.frontmatter} />}
  />
);
