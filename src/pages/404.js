/* eslint-disable react/jsx-filename-extension */
import React from "react"

import SEO from "../components/seo"
import Hero from "../components/Hero"

const NotFoundPage = () => (
  <>
    <SEO title="Siden har gått seg vill" />
    <Hero title="Denne siden har gått seg vill" />
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
  </>
)

export default NotFoundPage
