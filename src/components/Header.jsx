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

const NavButton = ({ to, label, ...props}) => (
    <Button plain hoverIndicator="dark-1" {...props} {...navProps(to)}>
      {label}
    </Button>
)

const ResponsiveMenu = ({ isMobile, items }) => {
  const [show, setShow] = useState();
  if (isMobile)
    return (
      <Box alignSelf="center">
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
              <Box pad={{horizontal:"xlarge"}} gap="large">
                 {items.map((item)=>(
                      <NavButton 
                        label={item.label} 
                        key={item.to} 
                        to={item.to} 
                        hoverIndicator="light-1"
                        />
                 ))}
                 </Box>
               </Box>
            </Layer>
        )}
      </Box>
    )
  return items.map((item)=> (
        <NavButton label={item.label} key={item.to} to={item.to} alignSelf="center" margin={{horizontal:"small"}} />
      ))
}

const MbubeHeader = ({ siteTitle }) => (
  <>
    <LayoutSEO siteTitle={siteTitle} />
    <Box background="dark-1" pad={{ vertical: "7px" }}>
      <MaxWidthContainer margin={{ horizontal: "auto" }}>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box direction="row" height="xxsmall">
              <Box alignSelf="center">
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
                margin={{ left: "auto" }}
              >
                <ResponsiveMenu
                  isMobile={isMobile(size)}
                  items={[
                    {
                      label: "Program",
                      to: "/program/"
                    },
                    {
                      label: "Informasjon",
                      to: "/info/"
                    },
                    {
                      label: "Bilder",
                      to: "/bilder/"
                    },
                    {
                      label: "Bli speider",
                      to: "/bli-speider/"
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
