import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';


export default createMuiTheme({
    palette: {
        primary: {
          main: red[400],
        },
        secondary: {
          main: green[500],
        }
    },
    overrides: {
      MuiAppBar:{
        root: {
          // boxShadow: 'none !important',
        }
      },
      MuiButton: {
        root: {
          boxShadow: 'none !important',
          borderRadius: 50,
        },
      },
    }
});
