import React from "react"
import PropTypes from "prop-types"
import { Heading } from "grommet"

import HeroBackground from "./HeroBackground"

const Hero = ({ title, image, height }) => (
  <HeroBackground image={image} height={height}>
    {title && (
      <Heading className="mainHeader">
        <span>{title}</span>
      </Heading>
    )}
  </HeroBackground>
)

Hero.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  height: PropTypes.oneOf(["normal", "medium"]),
}

Hero.defaultProps = {
  title: null,
  image: null,
  height: "normal",
}

export default Hero
