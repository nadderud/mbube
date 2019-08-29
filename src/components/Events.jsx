import React from "react"
import PropTypes from "prop-types"
import { locale, parseZone } from "moment"
import { Location as LocationIcon } from "grommet-icons"

locale("nb", {
  months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
    "_"
  ),
  monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
  weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
  weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY [kl.] HH:mm",
    LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
  },
  calendar: {
    sameDay: "[i dag kl.] LT",
    nextDay: "[i morgen kl.] LT",
    nextWeek: "dddd [kl.] LT",
    lastDay: "[i går kl.] LT",
    lastWeek: "[forrige] dddd [kl.] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "noen sekunder",
    ss: "%d sekunder",
    m: "ett minutt",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dager",
    M: "en måned",
    MM: "%d måneder",
    y: "ett år",
    yy: "%d år",
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
})

const eventTime = (startRaw, endRaw) => {
  const start = parseZone(startRaw)
  const end = parseZone(endRaw)

  start.locale("nb")
  end.locale("nb")

  if (start.isSame(end, "day")) {
    return `${start.format("D. MMM \nHH:mm")}–${end.format("HH:mm")}`
  }

  if (start.isSame(end, "month")) {
    return `${start.format("D.")}–${end.format("D. MMM")}`
  }

  return `${start.format("D. MMM")}–${end.format("D. MMM")}`
}

const Events = ({ events }) => {
  if (!events || !events.length) {
    return <div className="nothing">Terminlisten er tom.</div>
  }
  return (
    <table className="terminliste">
      <thead>
        <th>Tid</th>
        <th>Tema og sted</th>
        <th>Ansvar</th>
        <th>Merknad</th>
      </thead>
      <tbody>
        {events.map(
          ({ id, start, end, summary, location, description, organizer }) => (
            <tr className="event" key={id}>
              <td>{eventTime(start, end)}</td>
              <td>
                <strong>{summary}</strong>
                <br />
                <LocationIcon /> {location}
              </td>
              <td>{organizer}</td>
              <td>{description}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

Events.propTypes = {
  events: PropTypes.array,
}

export default Events
