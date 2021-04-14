import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  demo: {
    flexGrow: 1,
  },
  vault: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    marginTop: theme.spacing(1),
  },
  link: {
    color: '#fff',
    margin: theme.spacing(1),
    fontWeight: 'bold',
  },
  appBar: {
    height: 30,
    background: 'white',
  },
  toolBar: {
    height: 30,
    minHeight: 'unset',
  },
  see: {
    marginRight: 5,
  },
}));

const AppHeader:React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Toolbar className={classes.toolBar} component={Link} href="https://www.misakey.com" underline="none" color="inherit" target="_blank" rel="noopener noreferrer">
            <Typography className={classes.demo}>
              Site de simulation
            </Typography>
            <Typography className={classes.see}>
              Voir
            </Typography>
            <img src="https://static.misakey.com/img/MisakeyLogoTypo.svg" height="20" alt="Misakey" />
            <ArrowForwardIosIcon fontSize="small" />
          </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;