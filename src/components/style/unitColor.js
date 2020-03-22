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

export const unitColor = ({ unit }) => `
background: ${(unitStyles[unit] || {}).background};
color: ${(unitStyles[unit] || {}).color};
`
