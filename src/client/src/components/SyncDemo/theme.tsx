import { createMuiTheme } from '@material-ui/core/styles';
import { blue, yellow } from '@material-ui/core/colors';


export default createMuiTheme({
    palette: {
        primary: {
          main: blue[400],
        },
        secondary: {
          main: yellow[500],
        }
    },
});
