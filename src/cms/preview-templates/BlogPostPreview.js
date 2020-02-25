import React, { useState } from "react"
import PropTypes from "prop-types"
import { BlogPostTemplate } from "../../templates/blog-postTemplate"
import { LayoutTemplate } from "../../components/Layout"

const BlogPostPreview = ({ entry, widgetFor, getAsset }) => {
  const tags = entry.getIn(["data", "tags"])
  const [featuredImage, setFeaturedImage] = useState()
  getAsset(entry.getIn(["data", "featuredimage"])).then(a =>
    setFeaturedImage(a.url)
  )
  return (
    <LayoutTemplate>
      <BlogPostTemplate
        content={widgetFor("body")}
        featuredimage={featuredImage}
        tags={tags && tags.toJS()}
        description={entry.getIn(["data", "description"])}
        title={entry.getIn(["data", "title"])}
        date={entry.getIn(["data", "date"]).toString()}
      />
    </LayoutTemplate>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
