import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logoMTS from './LogoMTS.png';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LoopIcon from '@material-ui/icons/Loop';

import { grey } from '@material-ui/core/colors';


interface HeaderProps {
  onNewOrder: (e: React.FormEvent) => void,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: 30,
  },
  appLogo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    paddingLeft: 10,
  },
  myCart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresh: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    color: theme.palette.getContrastText(grey[900]),
  },
}));

const AppHeader = ({ onNewOrder }:HeaderProps):React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={2} className={classes.appLogo}>
              <img src={logoMTS} height="33" alt="Misakey" />
              <Typography className={classes.appName}>
                AppDemo
              </Typography>
            </Grid>
            <Grid item xs={8} className={classes.myCart}>
              <Typography variant="h6" align="center">
                Mon Panier
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.refresh}>
              <IconButton onClick={onNewOrder}>
                <LoopIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;