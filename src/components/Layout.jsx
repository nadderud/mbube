/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { Box, Text } from "grommet"

import "sanitize.css"
import "./layout.css"

import Header from "./Header"
import Footer from "./Footer"

import CustomTheme from "./customTheme"

export const LayoutTemplate = ({ children, isFrontpage, siteTitle }) => (
  <CustomTheme>
    <Box background="#f5f5f5">
      <Header siteTitle={siteTitle} />
      {children}
      <Footer isFrontpage={isFrontpage} />
    </Box>
  </CustomTheme>
)

LayoutTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
  isFrontpage: PropTypes.bool,
}

LayoutTemplate.defaultProps = {
  siteTitle: "",
  isFrontpage: false,
}

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
    render={(data) => (
      <LayoutTemplate
        siteTitle={data.site.siteMetadata.title}
        isFrontpage={location.pathname === "/"}
      >
        {children}
      </LayoutTemplate>
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
