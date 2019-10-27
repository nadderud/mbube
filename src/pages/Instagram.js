import React from "react"

import WhiteBox from "../components/WhiteBox"
import { Grid } from "@horacioh/gatsby-theme-instagram"

const Instagram = () => {
    return(
        <div>
            <WhiteBox>
                <h1>Bilder fra instagram</h1>
                <Grid />
                <p>Følg <a href="https://www.instagram.com/nadderudspeidergruppe/"><strong>nadderudspeidergruppe</strong> på Instagram</a> for å se flere bilder.</p>
            </WhiteBox>
        </div>  
    )
}

export default Instagram
