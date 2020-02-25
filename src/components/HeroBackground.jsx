import React from "react"
import PropTypes from "prop-types"
import { Box } from "grommet"
import BackgroundImage from "gatsby-background-image"

const HeroBackground = ({ image, height, children }) => {
  const innerBox = (
    <Box pad="large" height={height} alignContent="center">
      {children}
    </Box>
  )
  if (!!image && image.childImageSharp) {
    return (
      <BackgroundImage
        Tag="div"
        fluid={image.childImageSharp.fluid}
        backgroundColor="steelblue"
      >
        {innerBox}
      </BackgroundImage>
    )
  }

  if (!!image && typeof image === "string") {
    console.log(image)
    return (
      <Box
        background={{
          color: "steelblue",
          dark: true,
          opacity: true,
          position: "center",
          size: "cover",
          image: `url(${image})`,
        }}
      >
        {innerBox}
      </Box>
    )
  }

  return <Box background="steelblue">{innerBox}</Box>
}

HeroBackground.propTypes = {
  image: PropTypes.object,
  height: PropTypes.oneOf(["normal", "medium"]),
  children: PropTypes.node,
}

HeroBackground.defaultProps = {
  image: null,
  height: "normal",
  children: null,
}

export default HeroBackground
