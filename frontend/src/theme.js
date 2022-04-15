import { createTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3bb5ff',
      dark: '#297AF2',
    },
    secondary: {
      main: '#ff5640',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f8f9fc',
    },
    text: {
      secondary: '#6B85B2',
    },
  },
})

export default theme
