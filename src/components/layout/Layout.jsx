import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Box } from "grommet"

import "sanitize.css"
import "../style/layout.css"

// project components
import Header from "../navigation/header"
import Footer from "../navigation/footer"
import CustomTheme from "../style/customTheme"

export const LayoutTemplate = ({ children, isFrontpage, siteTitle }) => (
  <CustomTheme>
    <Box background="light-2" height={{ min: "100vh" }} justify="between">
      <Box>
        <Header siteTitle={siteTitle} />
        {children}
      </Box>
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
