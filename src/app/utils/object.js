export const getGroups = (data, attr) =>
  byKey(
    Object.keys(data).reduce((groups, key) => {
      const item = data[key]
      const group = item[attr] || "0"
      return {
        ...groups,
        [group]: [...(groups[group] || []), key],
      }
    }, {})
  )

export const subset = (data, keys) =>
  keys.reduce((result, key) => ({ ...result, [key]: data[key] }), {})

const byKey = obj =>
  Object.keys(obj)
    .sort()
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})

export const byName = (keys, data) =>
  keys.sort((a, b) => {
    const nameA = data[a].name.toUpperCase()
    const nameB = data[b].name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
