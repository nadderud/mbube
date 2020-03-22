import styled from "styled-components"

const unitStyles = {
  flokken: {
    background: "#f2cc07",
    color: "#000",
  },
  troppen: {
    background: "#63ac3b",
    color: "#fff",
  },
  rover: {
    background: "#751052",
    color: "#fff",
  },
}

export const withUnitColor = (Component) => styled(Component)`
  background: ${(props) => (unitStyles[props.unit] || {}).background};
  color: ${(props) => (unitStyles[props.unit] || {}).color};
`
