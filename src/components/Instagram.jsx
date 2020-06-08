import React, { useState, useEffect } from "react"
import styled from "styled-components"

const USER_ID = `1946950564`
const PHOTO_COUNT = 12
const PHOTO_WIDTH = 480

const StyledGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;

  img {
    max-width: 100%;
  }
`

const Instagram = () => {
  const [photos, setPhotos] = useState(null)
  useEffect(() => {
    fetchPhotos(setPhotos)
  }, [])

  if (photos) {
    return (
      <StyledGrid>
        {photos.map((photo) => (
          <a key={photo.id} href={photo.url} title={photo.caption}>
            <img src={photo.src} alt={photo.caption} />
          </a>
        ))}
      </StyledGrid>
    )
  }

  return <div>...</div>
}

const fetchPhotos = async (cb) => {
  try {
    const response = await fetch(
      `https://www.instagram.com/graphql/query?query_id=17888483320059182&variables={"id":"${USER_ID}","first":${PHOTO_COUNT},"after":null}`
    )
    const { data } = await response.json()
    const photos = data.user.edge_owner_to_timeline_media.edges.map(
      ({ node }) => {
        const { id } = node
        const caption = node.edge_media_to_caption.edges[0].node.text
        const thumbnail = node.thumbnail_resources.find(
          (thumbnail) => thumbnail.config_width === PHOTO_WIDTH
        )
        const { src, config_width: width, config_height: height } = thumbnail
        const url = `https://www.instagram.com/p/${node.shortcode}`
        return {
          id,
          caption,
          src,
          width,
          height,
          url,
        }
      }
    )
    cb(photos)
  } catch (error) {
    console.error(error)
    cb([])
  }
}

export default Instagram
