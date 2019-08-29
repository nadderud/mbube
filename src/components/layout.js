/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { grommet, Grommet, Heading as GrHeading, Box, Stack } from "grommet"
import { deepMerge } from "grommet/utils"
import "sanitize.css"
import "./layout.css"

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

const TitleContainer = ({ title }) => {
  if (!title) {
    return null
  }
  return (
    <Box background="steelblue" pad="large" alignContent="center">
      <GrHeading className="mainHeader">
        <span>{title}</span>
      </GrHeading>
    </Box>
  )
}

const Layout = ({ title, before, children, after }) => (
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
        <Box background="#f5f5f5">
          <Header siteTitle={data.site.siteMetadata.title} />
          <TitleContainer title={title} />
          {before}
          <MaxWidthContainer>{children}</MaxWidthContainer>
          {after}
          <Footer />
        </Box>
      </Grommet>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
