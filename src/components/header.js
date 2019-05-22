import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Text, Stack, Button, ResponsiveContext } from "grommet"
import { MaxWidthContainer } from "./layout"

export const navProps = to => ({
  as: "a",
  href: to,
  onClick: e => {
    e.preventDefault()
    navigate(to)
  },
})

const isMobile = size => size === "xsmall" || size === "small"

const NavButton = ({ to, label }) => (
  <Button plain hoverIndicator="dark-1" {...navProps(to)}>
    <Box pad="small">{label}</Box>
  </Button>
)

const Header = ({ siteTitle }) => (
  <header>
    <Box background="brand" pad={{ vertical: "medium", horizontal: "small" }}>
      <MaxWidthContainer>
        <Box direction="row" gap="medium">
          <ResponsiveContext.Consumer>
            {size =>
              isMobile(size) ? (
                <Text size="xlarge" weight="bold">
                  <Link
                    to="/"
                    style={{
                      color: "white",
                      textDecoration: `none`,
                    }}
                  >
                    {siteTitle}
                  </Link>
                </Text>
              ) : (
                <Stack anchor="bottom-right">
                  <Box pad={{ bottom: "20px" }}>
                    <Text
                      size="xxlarge"
                      weight="bold"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <Link
                        to="/"
                        style={{
                          color: "white",
                          textDecoration: `none`,
                        }}
                      >
                        {siteTitle}
                      </Link>
                    </Text>
                  </Box>
                  <Text>- spennende friluftsliv</Text>
                </Stack>
              )
            }
          </ResponsiveContext.Consumer>
          <Box
            direction="row"
            gap="small"
            alignSelf="end"
            margin={{ left: "auto" }}
          >
            <NavButton label="Program" to="/program" />
            <NavButton label="Bli speider" to="/bli-speider" />
          </Box>
        </Box>
      </MaxWidthContainer>
    </Box>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
