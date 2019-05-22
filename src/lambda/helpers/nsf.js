import https from "https"

const error = e => ({
  statusCode: 500,
  body: JSON.stringify({
    message: e.message,
  }),
})

const fetchMembers = () =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: "min.speiding.no",
      port: 443,
      path: "/api/group/memberlist",
      method: "GET",
      auth: `${process.env.MIN_SPEIDING_ID}:${
        process.env.MIN_SPEIDING_MEMBERLIST_KEY
      }`,
    }

    https
      .get(options, response => {
        let data = ""

        response.on("data", chunk => {
          data += chunk
        })
        response.on("end", () => {
          resolve(JSON.parse(data))
        })
      })
      .on("error", error => reject(error))
  })

const getValue = value => value && value.value

const isMobile = val => {
  const re = /^(?:\+47\s*|00\s*47\s*)?[49](?:\s*\d){7}$/
  return re.test(String(val))
}

const isEmail = val => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(val).toLowerCase())
}

const scanFor = (item, scanner) =>
  Object.values(item).reduce((result, value) => {
    const val = getValue(value)
    if (val && scanner(val)) {
      return [...result, val]
    }
    return result
  }, [])

const cleanItem = item => ({
  name: [getValue(item.first_name), getValue(item.last_name)].join(" "),
  unit: getValue(item.unit),
  patrol: getValue(item.patrol),
  status: getValue(item.status),
  currentTerm: getValue(item.current_term),
  emails: scanFor(item, isEmail).length,
  mobiles: scanFor(item, isMobile).length,
  photo: getValue(item.contact_photo_use),
  createdAt: getValue(item.created_at),
  confirmedAt: getValue(item.confirmed_at),
})

const cleanDisplay = data =>
  Object.keys(data).reduce(
    (result, key) => ({
      ...result,
      [key]: cleanItem(data[key]),
    }),
    {}
  )

export const getMembers = () =>
  fetchMembers().then(data => cleanDisplay(data.data))
