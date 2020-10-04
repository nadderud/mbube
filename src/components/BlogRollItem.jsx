import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { Box, Heading, Text, Paragraph } from "grommet"

import PreviewCompatibleImage from "./PreviewCompatibleImage"

const BlogRollItem = ({ image, slug, title, description, date, compact }) => (
  <Box
    elevation="xsmall"
    animation={{ type: "fadeIn", size: "medium" }}
    round="xsmall"
    direction="column"
    onClick={() => navigate(slug)}
    background="white"
  >
    <Box
      height={compact ? "xsmall" : "small"}
      background={{ dark: false, color: "light-2" }}
      round={{ corner: "top", size: "5px" }}
    >
      <PreviewCompatibleImage
        imageInfo={{
          image,
          style: { width: "100%", height:"100%", borderRadius: "5px 5px 0px 0px"},
        }}
      />
    </Box>
    <Box margin="medium" flex>
      <Heading color="black" level={compact ? "3" : "2"} size="small" margin="none">
          {title}
      </Heading> 
      {compact  
      ? ""
      : <Paragraph margin={{ vertical: "xsmall" }}>{description}</Paragraph>
      }
      <Box flex justify="between" direction="row" justify="end" align="end">
        <Text size="xsmall" color="grey">
          {date}
        </Text>
      </Box>
    </Box>
  </Box>
)

BlogRollItem.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default BlogRollItem
