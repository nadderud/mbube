import React from "react"
import PropTypes from "prop-types"
import { Heading as GrommetHeading } from "grommet"
import styled from "styled-components"

import HeroBackground from "./HeroBackground"

const Heading = styled(GrommetHeading)`
  font-style: italic;
  font-family: "Next", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  text-align: center;
  line-height: 1.4;
  padding: 2px 0;
`

const HeadingText = styled.span`
  background-color: #f00;
  color: #fff;
  display: inline;
  padding: 0.45rem 0.75rem;
  box-decoration-break: clone;
`

const Hero = ({ title, image, height }) => (
  <HeroBackground image={image} height={height}>
    {title && (
      <Heading>
        <HeadingText>{title}</HeadingText>
      </Heading>
    )}
  </HeroBackground>
)

Hero.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  height: PropTypes.oneOf(["small", "medium"]),
}

Hero.defaultProps = {
  title: null,
  image: null,
  height: "small",
}

export default Hero
