import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ImageUploadInput } from './ImageUploadInput'

export const Active = () => {
  const [image, setImage] = React.useState(null)

  return (
    <Box width={300}>
      <ImageUploadInput value={image} onChange={setImage} />
    </Box>
  )
}

export const ReadOnly = () => {
  const [image, setImage] = React.useState(null)

  return (
    <Box width={300}>
      <ImageUploadInput readOnly={!!image} value={image} onChange={setImage} />
    </Box>
  )
}
