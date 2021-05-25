import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';

import { grey } from '@material-ui/core/colors';

import updateFavicons from 'helpers/updateFavicons';


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
  back: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    color: theme.palette.getContrastText(grey[900]),
  },
}));

const SyncHeader = ():React.ReactElement => {
  const classes = useStyles();
  
  const mounted = useRef(false);

  useEffect(
    () => {
      if (mounted.current === false) {
        updateFavicons(false);
      }
      mounted.current = true;
    },
    [mounted],
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={2} className={classes.appLogo}>
              <Typography className={classes.appName}>
                Sync Demo
              </Typography>
            </Grid>
            <Grid item xs={8} className={classes.myCart}>
              <Typography variant="h6" align="center">
                Mes statistiques d'achat
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.back}>
              <Typography>
                <Link component={RouterLink} to="/" color="textPrimary">Vault demo</Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SyncHeader;
