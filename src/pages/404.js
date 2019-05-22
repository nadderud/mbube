import React from "react"

import Layout, { Heading } from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="Siden har gått seg vill" />
    <Heading>Denne siden har gått seg vill</Heading>
    <div className="page-content">
      <p>Vi kan ikke finne siden du leter etter på denne plasseringen.</p>
      <ul>
        <li>
          Prøv å gå tilbake og se om du kan finne noen andre spor å følge.
        </li>
        <li>
          Hvis du blir bekymret for siden må du gjerne gi oss beskjed, så skal
          vi sende ut en patrulje som kan lete etter den.
        </li>
      </ul>
    </div>
  </Layout>
)

export default NotFoundPage
