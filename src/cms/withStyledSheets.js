import React from "react"
import { StyleSheetManager } from "styled-components"

const withStyledSheets = Wrapped => props => {
  const iframe = document.querySelector("#nc-root iframe")
  const iframeHeadElem = iframe && iframe.contentDocument.head

  if (!iframeHeadElem) {
    return null
  }

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <Wrapped {...props} />
    </StyleSheetManager>
  )
}

export default withStyledSheets
