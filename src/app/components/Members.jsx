import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { CheckBox, Collapsible, Box, Button, Text, Heading } from "grommet"
import { FormNext, FormDown, Refresh } from "grommet-icons"

import Loading from "./Loading"
import { getUser } from "../services/auth"
import { subset, getGroups } from "../utils/object"

export const transformStateForToggleItem = item => currState => ({
  selected: toggleItem(currState.selected, item),
})
export const transformStateForSetItems = (items, add) => currState => ({
  selected: toggleItems(currState.selected, items, add),
})

const toggleItem = (target, item) =>
  target.includes(item) ? target.filter(x => x !== item) : [...target, item]

const toggleItems = (target, items, add) =>
  add
    ? [...target, ...items].filter(uniqueFilter)
    : target.filter(x => !items.includes(x))

const intersect = (setA, setB) => setA.filter(x => setB.includes(x))
const arrayEql = (setA, setB) => {
  if (setA.length !== setB.length) {
    return false
  }
  return intersect(setA, setB).length === setA.length
}
const uniqueFilter = (x, index, self) => self.indexOf(x) === index

const useStateWithSessionStorage = localStorageKey => {
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem(localStorageKey)) || {}
  )

  useEffect(() => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

const useMembers = () => {
  const [items, setItems] = useStateWithSessionStorage("members")
  const [invalidated, setInvalidated] = useState(items === {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = getUser()
      setLoading(true)
      fetch("/.netlify/functions/get-members", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token.access_token,
        },
      })
        .then(response => response.json())
        .then(setItems)
        .finally(() => {
          setLoading(false)
          setInvalidated(false)
        })
    }

    if (!loading && invalidated) {
      fetchData()
    }
  }, [invalidated])

  const invalidate = () => setInvalidated(true)

  return { items, loading, invalidate }
}

const Members = ({ selected, toggleSelected, setSelectedItems }) => {
  const { items, loading, invalidate } = useMembers()

  if (loading) {
    return <Loading />
  }

  const units = getGroups(items, "unit")
  return (
    <Box>
      <Heading level={3} margin={{ bottom: "small" }}>
        Medlemmer fra NSF{" "}
        <Button onClick={invalidate}>
          <Refresh />
        </Button>
      </Heading>
      {Object.keys(units).map(unit => {
        const unitKeys = units[unit]
        const patrols = getGroups(subset(items, unitKeys), "patrol")
        return (
          <Members.Unit
            size="medium"
            key={unit}
            name={unit}
            keys={unitKeys}
            selected={intersect(unitKeys, selected)}
            setSelectedItems={setSelectedItems}
          >
            {Object.keys(patrols).map(patrol => {
              const patrolKeys = patrols[patrol]
              return (
                <Members.Unit
                  size="small"
                  key={patrol}
                  name={patrol}
                  keys={patrolKeys}
                  selected={intersect(patrolKeys, selected)}
                  setSelectedItems={setSelectedItems}
                >
                  {patrolKeys.map(item => (
                    <Members.Item
                      key={item}
                      name={items[item].name}
                      checked={selected.includes(item)}
                      setSelectedItem={() => toggleSelected(item)}
                    />
                  ))}
                </Members.Unit>
              )
            })}
          </Members.Unit>
        )
      })}
    </Box>
  )
}

Members.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSelected: PropTypes.func.isRequired,
}

const counter = (keys, selected) => (selected ? `${selected}/${keys}` : keys)

class Unit extends React.Component {
  state = { collapsed: true }

  shouldComponentUpdate(nextProps, nextState) {
    const { collapsed } = this.state
    const { collapsed: nextCollapsed } = nextState
    if (collapsed !== nextCollapsed) {
      return true
    }
    const { selected } = this.props
    const { selected: nextSelected } = nextProps
    return !arrayEql(nextSelected, selected)
  }

  reveal = () => {
    this.setState(currState => ({ collapsed: !currState.collapsed }))
  }

  render() {
    const {
      name,
      size,
      children,
      keys,
      selected,
      setSelectedItems,
    } = this.props
    const { collapsed } = this.state
    const allSelected = keys.length === selected.length
    const someSelected = selected.length > 0
    const Icon = collapsed ? FormNext : FormDown
    return (
      <Box gap="xsmall">
        <Box direction="row" gap="xsmall">
          <Button hoverIndicator="light-1" onClick={this.reveal}>
            <Box pad="xsmall">
              <Icon size={size} />
            </Box>
          </Button>
          <CheckBox
            label={
              <Text size={size} weight="bold">
                {name !== "0" ? name : "(ikke oppgitt) "} (
                {counter(keys.length, selected.length)})
              </Text>
            }
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onChange={() => setSelectedItems(keys, !allSelected)}
          />
        </Box>
        <Collapsible open={!collapsed}>
          <Box pad={{ left: "large" }}>{children}</Box>
        </Collapsible>
      </Box>
    )
  }
}

Members.Unit = Unit

class Item extends React.Component {
  shouldComponentUpdate(nextProps, _) {
    const { checked } = this.props
    const { checked: nextChecked } = nextProps

    return nextChecked !== checked
  }
  render() {
    const { name, checked, setSelectedItem } = this.props
    return (
      <CheckBox
        label={<Text size="xsmall">{name}</Text>}
        checked={checked}
        onChange={setSelectedItem}
      />
    )
  }
}

Members.Item = Item

export default Members
