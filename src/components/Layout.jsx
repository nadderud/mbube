/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { grommet, Grommet, Box, Text } from "grommet"
import { deepMerge } from "grommet/utils"
import "sanitize.css"
import "./layout.css"

import Header from "./Header"
import Footer from "./Footer"
import MaxWidthContainer from "./MaxWidthContainer"

const myStyle = {
  global: {
    colors: {
      brand: "#43b02a",
    },
    font: {
      family: "'LFT Etica','Helvetica Neue',Arial,sans-serif",
    },
    hover: {
      color: { dark: "brand", light: "brand" },
    },
  },
}

const mergedStyle = deepMerge(myStyle, grommet)

const Layout = ({ children, location }) => (
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
    render={data => (
      <Grommet theme={mergedStyle}>
        <Box background="#f5f5f5">
          <Header siteTitle={data.site.siteMetadata.title} />
          {children}
          {location.pathname !== "/" ? (
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
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
