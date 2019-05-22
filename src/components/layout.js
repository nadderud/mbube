/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { grommet, Grommet, Box, Text, Heading as GrHeading } from "grommet"
import { deepMerge } from "grommet/utils"
import "sanitize.css"

import Header from "./header"

export const MaxWidthContainer = ({ children, ...props }) => (
  <Box
    style={{
      maxWidth: 960,
      width: "100%",
    }}
    margin={{ horizontal: "auto" }}
    pad={{ horizontal: "medium" }}
    {...props}
  >
    {children}
  </Box>
)

export const Heading = ({ children }) => (
  <GrHeading margin={{ bottom: "xsmall", top: "medium" }}>{children}</GrHeading>
)

const myStyle = {
  global: {
    colors: {
      brand: "#367f99",
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
        <Box
          background="light-2"
          pad={{ vertical: "medium" }}
          margin={{ top: "medium" }}
        >
          <MaxWidthContainer>
            <Text size="small" color="dark-2">
              © 2009&ndash;{new Date().getFullYear()} Nadderud speidergruppe
              {"  |  "}
              <Link to="/kontakt">Kontakt oss</Link>
            </Text>
          </MaxWidthContainer>
        </Box>
      </Grommet>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
