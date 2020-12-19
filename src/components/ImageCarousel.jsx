/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Box, Heading, Carousel, Text } from "grommet"
import BackgroundImage from "gatsby-background-image"


const ImageCarousel = ({height, data, speed}) => (
    <Box height="90vh" fill="horizontal">
        <Carousel fill controls="selectors" play={speed}>
        {data &&
            data.map(info => (
                <BackgroundImage
                    Tag="div"
                    fluid={info.image}
                    backgroundColor="steelblue"
                >
                    <Box height={height} pad="medium" justify="end">
                        <Box width="large" alignSelf="center" pad={{"vertical":"xlarge"}}>
                            <Heading level="1" size="large" color="white">{info.header}</Heading>
                            <Text color="white">{info.text}</Text>
                        </Box>
                    </Box>
            </BackgroundImage>
            ))}
        </Carousel>
      </Box>

)


export default ImageCarousel