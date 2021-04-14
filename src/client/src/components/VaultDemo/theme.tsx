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
});
