import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { Box, Text } from 'grommet';
import MaxWidthContainer from './MaxWidthContainer';

const Footer = ({ data }) => (
  <Box background="dark-1" pad={{ vertical: 'large' }} margin={{ top: 'medium' }}>
    <MaxWidthContainer>
      <Text size="small" color="light-1">
        © 2009&ndash;
        {new Date().getFullYear()}
        {' '}
Nadderud speidergruppe
        {'  |  '}
        <Link to="/kontakt/">Kontakt oss</Link>
      </Text>
      <Text>{data.description}</Text>
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
