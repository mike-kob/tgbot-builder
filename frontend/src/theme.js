import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    h1: {
      fontSize: 44,
      fontWeight: 500,
      lineHeight: '60px',
    },
    h2: {
      fontSize: 36,
      fontWeight: 500,
    },
    h3: {
      fontSize: 24,
      fontWeight: 500,
    },
    body1: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '30px',
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3bb5ff',
      dark: '#297AF2',
    },
    secondary: {
      main: '#ff5640',
      dark: '#C51916',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f8f9fc',
    },
    text: {
      primary: '#022A6E',
      secondary: '#6B85B2',
    },
  },
});

export default theme;
