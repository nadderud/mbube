import React from "react"
import { grommet, Grommet } from "grommet"
import { deepMerge } from "grommet/utils"

const myTheme = {
  global: {
    breakpoints: {
      small: {
        value: 774,
      },
    },
    colors: {
      brand: "rgb(122,200, 98)",
    },
    font: {
      family: "'LFT Etica','Helvetica Neue',Arial,sans-serif",
    },
    hover: {
      color: { dark: "brand", light: "brand" },
    },
  },
  carousel:{
    icons:{
      color: "brand",
    }
  }
}

const mergedTheme = deepMerge(myTheme, grommet)

const CustomTheme = ({ children }) => {
  return <Grommet theme={mergedTheme}>{children}</Grommet>
}

export default CustomTheme
