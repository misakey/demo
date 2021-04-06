import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Cart, colorsToHex } from 'helpers/generateRandomCart';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { ReactComponent as ShoeIcon } from './shoe.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


import { grey } from '@material-ui/core/colors';

interface CartProps {
  cart:Cart,
  email:string,
  formError:string,
  isSending:boolean,
  onNewOrder: (e: React.FormEvent) => void,
  onValidateCart: (e: React.FormEvent) => void,
  setEmail: (email: string) => void,
}


const BlackButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
      backgroundColor: grey[800],
    },
    height: 30,
  },
}))(Button);


const CartComponent = ({
  cart,
  onNewOrder,
  onValidateCart,
  formError,
  isSending,
  email,
  setEmail,
}:CartProps):React.ReactElement => {
  return (
    <>
      <Box my={2} p={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">
          Vos produits (1)
        </Typography>
        <BlackButton size="small" onClick={onNewOrder} variant="contained">Générer un nouveau panier</BlackButton>
      </Box>
      <Box my={3} p={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <SvgIcon component={ShoeIcon} fontSize="large" viewBox="0 0 512 512" style={{ color: colorsToHex(cart.color), fontSize: 80 }}/>
        <Box flexGrow={1} ml={2}>
          <Typography variant="h6">
            Paire de chaussures
          </Typography>
          <Typography>
            Couleur: <strong>{cart.color}</strong>
          </Typography>
        </Box>
        <Typography>
          <strong>{cart.price}€</strong>
        </Typography>
      </Box>
      <Box bgcolor="#DDD" p={1} mt={3}>
        <Typography variant="h4">
          Résumé
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography>
            <strong>Montant total de la commande</strong>
          </Typography>
          <Typography variant="h6">
            {cart.price}€
          </Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={onValidateCart}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Rentrez votre email pour recevoir votre facture"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={formError.length > 0}
            helperText={formError}
            disabled={isSending}
          />
          <Box my={5} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <Button type="submit" variant="contained" color="primary" disabled={isSending}>
              Recevoir ma facture
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default CartComponent;