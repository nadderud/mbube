import React from "react"
import { grommet, Grommet } from "grommet";
import { deepMerge } from "grommet/utils"

const myTheme = {
    global: {
      size: {
        medium: "350px",
      },
      breakpoints: {
        small: {
          value: 774
        }
      },
      colors: {
        brand: "#43b02a",
      },
      font: {
        family: "'LFT Etica','Helvetica Neue',Arial,sans-serif",
      },
      hover: {
        color: { dark: "brand", light: "brand" },
      },
    },
};

const mergedTheme = deepMerge(myTheme, grommet)

const CustomTheme = ({children}) => {
    return(
        <Grommet theme={mergedTheme}>
            {children}
        </Grommet>
    )
}

export default CustomTheme