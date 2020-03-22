import React from "react"
import styled from "styled-components"
import { withUnitColor } from "./style/unitColor"

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

const Badge = withUnitColor(BadgeBase)

const UnitBadge = ({ name, unit }) => {
  if (!unit) return null
  return <Badge unit={unit}>{name}</Badge>
}

export default UnitBadge
