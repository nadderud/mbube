import CMS from "netlify-cms-app"
import withStyledSheets from "./withStyledSheets"
import BlogPostPreview from "./preview-templates/BlogPostPreview"

CMS.registerPreviewTemplate("artikler", withStyledSheets(BlogPostPreview))
