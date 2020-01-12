import styled from "styled-components"

const unitStyles = {
  flokken: `
      background: #f2cc07;
      color: #000;
    `,
  troppen: `
      background: #63ac3b;
      color: #fff;
    `,
  rover: `
      background: #751052;
      color: #fff;
    `,
}

const unitColor = (Component, unitName) =>
  styled(Component)`
    ${unitStyles[unitName]}
  `

export default unitColor
