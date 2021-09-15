import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { Box, Text, Button, ResponsiveContext, Layer } from "grommet"

import { Menu as MenuIcon, Close } from "grommet-icons"

import MaxWidthContainer from "./MaxWidthContainer"
import HideOnPrintBox from "./HideOnPrintBox"
import { LayoutSEO } from "./seo"

export const navProps = (to) => ({
  as: "a",
  href: to,
  onClick: (e) => {
    e.preventDefault()
    navigate(to)
  },
})

const isMobile = (size) => size === "xsmall" || size === "small"

const NavButton = ({ to, label }) => (
  <Button plain hoverIndicator="dark-1" {...navProps(to)}>
    {label}
  </Button>
)

const NavButtonLabel = ({ children }) => (
  <Box pad={{ horizontal: "small", vertical: "small" }}>{children}</Box>
)

const ResponsiveMenu = ({ isMobile, items }) => {
  const [show, setShow] = useState();
  if (isMobile)
    return (
      <Box margin={{ vertical: "small" }}>
        <Button label="Meny" onClick={() => setShow(true)} icon={ <MenuIcon />} reverse={true} plain/>
        {show && (
            <Layer
              onEsc={() => setShow(false)}
              onClickOutside={() => setShow(false)}
              background="light-1"
              responsive={false}
              position="right"
              full="vertical"
            >
              <Box>
              <Button 
                margin={{bottom:"medium", right:"xsmall", top:"xsmall"}} 
                color="brand"
                alignSelf="end"
                icon={<Close color="brand"/>}
                onClick={() => setShow(false)}
              />
              <Box pad={{horizontal:"xlarge"}}>
                 {items.map((item)=>(
                    <Box margin={{vertical:"medium"}} key={item.to} {...navProps(item.to)}>
                     <Text alignSelf="center">
                      {item.label}
                     </Text>
                   </Box>
                 ))}
                 </Box>
               </Box>
            </Layer>
        )}
      </Box>
    )
  return items.map((item) => (
    <NavButton label={item.label} key={item.to} to={item.to} />
  ))
}

const MbubeHeader = ({ siteTitle }) => (
  <>
    <LayoutSEO siteTitle={siteTitle} />
    <Box background="dark-1" pad={{ vertical: "5px" }}>
      <MaxWidthContainer margin={{ horizontal: "auto" }}>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box direction="row" gap="medium">
              <Box margin={{ vertical: "small" }}>
                <Text size="large" style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to="/"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <img src="/img/nsf.png" alt="" className="logo" />
                    {siteTitle}
                  </Link>
                </Text>
              </Box>
              <HideOnPrintBox
                direction="row"
                gap="small"
                alignSelf="end"
                margin={{ left: "auto" }}
              >
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
                      label: <NavButtonLabel>Bilder</NavButtonLabel>,
                      to: "/bilder/",
                      onClick: () => navigate("/bilder/"),
                    },
                    {
                      label: <NavButtonLabel>Bli speider</NavButtonLabel>,
                      to: "/bli-speider/",
                      onClick: () => navigate("/bli-speider/"),
                    },
                  ]}
                />
              </HideOnPrintBox>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </MaxWidthContainer>
    </Box>
  </>
)

MbubeHeader.propTypes = {
  siteTitle: PropTypes.string,
}

MbubeHeader.defaultProps = {
  siteTitle: "",
}

export default MbubeHeader
