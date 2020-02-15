import React from "react"
import PropTypes from "prop-types"

const Content = ({ content }) => content

export const HTMLContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)

Content.propTypes = {
  content: PropTypes.node,
}

HTMLContent.propTypes = Content.propTypes

export default Content
