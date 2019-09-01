/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  grommet, Grommet, Heading, Box, Text,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import 'sanitize.css';
import './layout.css';

import Header from './Header';
import Footer from './Footer';
import MaxWidthContainer from './MaxWidthContainer';
import WhiteBox from './WhiteBox';

const myStyle = {
  global: {
    colors: {
      brand: '#43b02a',
    },
    font: {
      family: "'LFT Etica','Helvetica Neue',Arial,sans-serif",
    },
    hover: {
      color: { dark: 'brand', light: 'brand' },
    },
  },
};

const mergedStyle = deepMerge(myStyle, grommet);

const TitleContainer = ({ title, image, isFrontPage }) => {
  if (!title && !isFrontPage) {
    return null;
  }
  return (
    <Box
      background={image ? { image: `url(${image})`, size: 'cover' } : 'steelblue'}
      pad="large"
      alignContent="center"
      height={isFrontPage ? 'medium' : false}
    >
      {!isFrontPage && (
        <Heading className="mainHeader">
          <span>{title}</span>
        </Heading>
      )}
    </Box>
  );
};

TitleContainer.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  isFrontPage: PropTypes.bool.isRequired,
};

TitleContainer.defaultProps = {
  title: null,
  image: null,
};
const Layout = ({
  title, before, children, after, isFrontPage, image,
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <Grommet theme={mergedStyle}>
        <Box background="#f5f5f5">
          <Header siteTitle={data.site.siteMetadata.title} />
          <TitleContainer title={title} image={image} isFrontPage={isFrontPage} />
          {before}
          <WhiteBox>{children}</WhiteBox>
          {after}
          {!isFrontPage ? (
            <MaxWidthContainer>
              <Text>
                <Link to="/">Tilbake til forsiden</Link>
              </Text>
            </MaxWidthContainer>
          ) : null}
          <Footer />
        </Box>
      </Grommet>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isFrontPage: PropTypes.bool,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  before: PropTypes.node,
  after: PropTypes.node,
};

Layout.defaultProps = {
  isFrontPage: false,
  image: null,
  before: null,
  after: null,
};

export default Layout;
