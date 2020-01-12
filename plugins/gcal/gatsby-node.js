const axios = require("axios")
const crypto = require("crypto")
const fs = require("fs")

const TIME_MIN = new Date(Date.now() - 86400000).toISOString()

const getEventsUri = (calendarId, apiKey) =>
  `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${TIME_MIN}&key=${apiKey}`

exports.sourceNodes = async ({ actions, schema }, { apiKey, path }) => {
  const { createNode, createTypes } = actions
  const contents = fs.readFileSync(path)
  const calendars = JSON.parse(contents)

  const typeDefs = [
    schema.buildObjectType({
      name: "Event",
      fields: {
        status: "String!",
        htmlLink: "String",
        created: "Date",
        updated: "Date",
        summary: "String",
        location: "String",
        organizer: "String",
        start: "Date!",
        end: "Date!",
        iCalUID: "String",
        sequence: "Int",
        calendar: "String!",
        description: "String",
      },
      interfaces: ["Node"],
      extensions: {
        infer: true,
      },
    }),
  ]

  createTypes(typeDefs)

  for (var calendar of calendars) {
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
    console.log("Loading gcal ", calendar.id)
    const events = await getEvents(apiKey, calendar.id)
    for (var event of events) {
      if (event.status === "confirmed") {
        await createNode({
          ...event,
          id: `${event.id}`,
          calendar: calendar.slug,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          organizer: event.organizer ? event.organizer.displayName : null,
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
