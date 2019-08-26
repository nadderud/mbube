import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Text, Button, ResponsiveContext, Menu } from "grommet"
import { Menu as MenuIcon } from "grommet-icons"

import MaxWidthContainer from "./MaxWidthContainer"

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
    {label}
  </Button>
)

const NavButtonLabel = ({ children }) => (
  <Box pad={{ horizontal: "small", vertical: "small" }}>{children}</Box>
)

const ResponsiveMenu = ({ isMobile, items }) => (
  <Box direction="row" gap="small" alignSelf="end" margin={{ left: "auto" }}>
    {isMobile ? (
      <Menu
        items={items}
        dropProps={{ align: { top: "bottom", right: "right" } }}
        dropBackground="dark-1"
        icon={<MenuIcon />}
        messages={{
          openMenu: "Vis navigasjon",
          closeMenu: "Skjul navigasjon",
        }}
      />
    ) : (
      items.map(item => (
        <NavButton label={item.label} key={item.to} to={item.to} />
      ))
    )}
  </Box>
)

const MbubeHeader = ({ siteTitle }) => (
  <header>
    <Box background="dark-1" pad={{ vertical: "5px" }}>
      <MaxWidthContainer>
        <ResponsiveContext.Consumer>
          {size => (
            <Box direction="row" gap="medium">
              <Box margin={{ vertical: "small" }}>
                <Text size="large" style={{ whiteSpace: "nowrap" }}>
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
              <ResponsiveMenu
                isMobile={isMobile(size)}
                items={[
                  {
                    label: <NavButtonLabel>Program</NavButtonLabel>,
                    to: "/program/",
                    onClick: () => navigate("/program/"),
                  },
                  {
                    label: <NavButtonLabel>Informasjon</NavButtonLabel>,
                    to: "/info/",
                    onClick: () => navigate("/info/"),
                  },
                  {
                    label: <NavButtonLabel>Bli speider</NavButtonLabel>,
                    to: "/bli-speider/",
                    onClick: () => navigate("/bli-speider/"),
                  },
                ]}
              />
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </MaxWidthContainer>
    </Box>
  </header>
)

MbubeHeader.propTypes = {
  siteTitle: PropTypes.string,
}

MbubeHeader.defaultProps = {
  siteTitle: ``,
}

export default MbubeHeader
