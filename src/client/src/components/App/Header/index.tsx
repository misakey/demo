import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppHeader:React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src="https://static.misakey.com/img/MisakeyLogoTypo.svg" height="40" alt="Misakey" />
          <Typography variant="h6" className={classes.title}>
            Misakey Demonstration - Vault
          </Typography>
          <Tooltip title="Vous êtes sur une démonstration de la technologie Misakey. Toutes les données sont fake.">
            <IconButton color="inherit" aria-label="info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;