/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { grommet, Grommet, Heading as GrHeading } from "grommet"
import { deepMerge } from "grommet/utils"
import "sanitize.css"

import Header from "./Header"
import Footer from "./Footer"
import MaxWidthContainer from "./MaxWidthContainer"

export const Heading = ({ children }) => (
  <GrHeading margin={{ bottom: "xsmall", top: "medium" }}>{children}</GrHeading>
)

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

const Layout = ({ children }) => (
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
      <Grommet theme={mergedStyle} full>
        <Header siteTitle={data.site.siteMetadata.title} />
        <MaxWidthContainer>{children}</MaxWidthContainer>
        <Footer />
      </Grommet>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
