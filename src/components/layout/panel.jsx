import React from "react"
import { Box, Heading, Paragraph } from "grommet"
import PropTypes from "prop-types"

// project components
import PreviewCompatibleImage from "../layout/PreviewCompatibleImage"
import MaxWidthContainer from "../layout/MaxWidthContainer"

function Panel({ title, text, image, color, elevation }) {
  return (
    <Box
      background={color}
      elevation={elevation}
      pad={{ vertical: "medium" }}
      style={{ zIndex: 1 }}
    >
      <MaxWidthContainer
        direction="row-responsive"
        gap="medium"
        pad={{ vertical: "medium", horizontal: "medium" }}
      >
        <Box alignSelf="center" flex="grow" width="medium" animation="fadeIn">
          <PreviewCompatibleImage
            imageInfo={{
              image,
            }}
          />
        </Box>
        <Box alignSelf="center" margin="small">
          <Heading level="2" margin={{ vertical: "small" }}>
            {title}
          </Heading>
          <Paragraph fill>{text}</Paragraph>
        </Box>
      </MaxWidthContainer>
    </Box>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  image: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  color: PropTypes.string,
  elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

Panel.defaultProps = {
  color: "white",
  elevation: false,
}

export default Panel
