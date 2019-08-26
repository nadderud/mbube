const axios = require("axios")
const crypto = require("crypto")
const fs = require("fs")

const getEventsUri = (calendarId, apiKey) =>
  `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`

exports.sourceNodes = async ({ actions }, { apiKey, path }) => {
  const { createNode } = actions
  const contents = fs.readFileSync(path)
  const calendars = JSON.parse(contents)

  for (calendar of calendars) {
    await createNode({
      ...calendar,
      parent: null,
      internal: {
        type: "Calendar",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(calendar))
          .digest(`hex`),
      },
    })
    const events = await getEvents(apiKey, calendar.id)
    for (event of events) {
      if (event.status === "confirmed") {
        await createNode({
          ...event,
          id: `${calendar.id}${event.id}`,
          calendar: calendar.name,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          parent: null,
          internal: {
            type: "Event",
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(event))
              .digest(`hex`),
          },
        })
      }
    }
  }
}

const getEvents = async (apiKey, calendarId) => {
  const events = await gapi(getEventsUri(calendarId, apiKey))
  return events
}

const gapi = async uri => {
  const result = await axios.get(uri)
  if (result.data) {
    return result.data.items || []
  }
  throw new Error("No data returned from Google...")
}
