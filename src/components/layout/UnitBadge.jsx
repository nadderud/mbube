import React from "react"
import styled from "styled-components"

// project components
import { unitColor } from "../style/unitColor"

const Badge = styled.span`
  display: inline-box;
  padding: 4px;
  margin: 2px 6px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  float: right;
  border-radius: 4px;
  ${(props) => unitColor}
`

const UnitBadge = ({ name, unit }) => {
  if (!unit) return null
  return <Badge unit={unit}>{name}</Badge>
}

export default UnitBadge
