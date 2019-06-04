import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Text, Button } from "grommet"
import { FormNext as FormNextIcon } from "grommet-icons"

import Layout, { Heading } from "../components/layout"
import SEO from "../components/seo"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Heading>{frontmatter.title}</Heading>
      <div>
        <Button
          margin={{ vertical: "small" }}
          href="#skjema"
          color="accent-1"
          label={
            <>
              Registrer deg i speideren <FormNextIcon />
            </>
          }
        />
        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <h2 id="skjema">Innmeldingsskjema</h2>
        <p>Bruk dette skjemaet for å registrere deg som ny speider:</p>
        <div style={{ maxWidth: 600 }}>
          <iframe
            src="https://min.speiding.no/register/in/group/1003"
            frameBorder={0}
            style={{ width: "100%", height: 2100 }}
            title="Innmeldingsskjema"
          />
        </div>
      </div>
      <hr />
      <Text>
        <Link to="/">Tilbake til forsiden</Link>
      </Text>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
