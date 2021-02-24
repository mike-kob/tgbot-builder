import React from 'react'
import {
  Box,
} from '@material-ui/core'

import Header from '@/components/Header'

// const useStyles = makeStyles((theme) => ({
//   content: {
//     display: 'flex',
//     flexDirection: ' column',
//   },
// }))

const Home = (props) => {
  const { user } = props

  if (!user) {
    return (
      <>
        <Header />
        <Box m={3}>
          This is page for settings, name, changing password etc
        </Box>

      </>
    )
  }

  return (
    <>
      <Header />
    </>
  )
}

export default Home
