import React from "react"
import styled from "styled-components"
import unitColor from "./style/unitColor"

const BadgeBase = styled.span`
  display: inline-box;
  padding: 4px;
  margin: 2px 6px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  float: right;
  border-radius: 4px;
`

const UnitBadge = ({ name, unit }) => {
  const Badge = unitColor(BadgeBase, unit)
  return <Badge>{name}</Badge>
}

export default UnitBadge
