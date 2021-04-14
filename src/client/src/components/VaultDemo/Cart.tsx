import React from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Cart, colorsToHex } from 'helpers/generateRandomCart';

import { ReactComponent as ShoeIcon } from './shoe.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


interface CartProps {
  cart:Cart,
  email:string,
  formError:string,
  isSending:boolean,
  onValidateCart: (e: React.FormEvent) => void,
  setEmail: (email: string) => void,
}


const CartComponent = ({
  cart,
  onValidateCart,
  formError,
  isSending,
  email,
  setEmail,
}:CartProps):React.ReactElement => {
  return (
    <>
      <Box mt={2} p={1}>
        <Typography variant="h4">
          Vos produits (1)
        </Typography>
      </Box>
      <Paper variant="outlined">
        <Box my={3} p={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <SvgIcon component={ShoeIcon} fontSize="large" viewBox="0 0 512 512" style={{ color: colorsToHex(cart.color), fontSize: 80 }}/>
          <Box flexGrow={1} ml={2}>
            <Typography variant="h6">
              Paire de chaussures
            </Typography>
            <Typography>
              Couleur: <strong>{cart.color}</strong>
            </Typography>
            <Typography>
              Qt: <strong>1</strong>
            </Typography>
          </Box>
          <Typography>
            <strong>{cart.price}€</strong>
          </Typography>
        </Box>
      </Paper>
      <Box my={1}>
        <Typography align="right">
          Total de la commande {cart.price}€
        </Typography>
      </Box>

      <Box mt={2} p={1}>
        <Typography variant="h4">
          Vos informations
        </Typography>
      </Box>
      <form noValidate autoComplete="off" onSubmit={onValidateCart}>
      <Paper variant="outlined">
        <Box p={3}>
            <Typography align="center">
              Veuillez saisir votre email pour confirmer la commande
            </Typography>
            <TextField
              fullWidth
              label="Email"
              placeholder="prenom.nom@email.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={formError.length > 0}
              helperText={formError}
              disabled={isSending}
            />

        </Box>        
      </Paper>
      <Box my={1}>
        <Button type="submit" variant="contained" color="primary" disabled={isSending} fullWidth>
          Confirmer la commande
        </Button>
      </Box>
      </form> 
    </>
  );
}

export default CartComponent;