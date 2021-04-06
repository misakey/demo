import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logoMTS from './LogoMTS.png';

import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

interface HeaderProps {
  nProductsInCart:number,
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

const AppHeader = ({ nProductsInCart }:HeaderProps):React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <img src={logoMTS} height="33" alt="Misakey" />
          </div>
          <Badge badgeContent={nProductsInCart} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;