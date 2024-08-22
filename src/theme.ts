import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1EA055',
      },
      secondary: {
        main: '#EF5A23',
      },
      background: {
        default: '#ffff',
      },
      warning: {
        main: '#FFC107',
      },
    },
    typography: {
      h5: {
        fontWeight: 600,
      },
    },
  });
  
  export default theme;