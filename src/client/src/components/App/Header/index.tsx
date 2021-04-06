import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  vault: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    marginTop: theme.spacing(1),
  },
  demonstration: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    fontSize: 14,
    marginTop: theme.spacing(1.5),
  },
  link: {
    color: '#fff',
    margin: theme.spacing(1),
    fontWeight: 'bold',
  }
}));

const AppHeader:React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src="https://static.misakey.com/img/MisakeyLogoTypo.svg" height="33" alt="Misakey" />
          <Typography className={classes.vault}>
            Vault
          </Typography>
          <Typography className={classes.demonstration}>
            Demonstration
          </Typography>
          <Typography>
            <Link href="https://www.misakey.com" className={classes.link}>
              Misakey ?
            </Link>
          </Typography>
          <Tooltip title="Vous êtes sur une démonstration de la technologie Misakey. Toutes les données sont fake.">
            <Typography>
              <Link href="#" className={classes.link}>
                En savoir plus
              </Link>
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;