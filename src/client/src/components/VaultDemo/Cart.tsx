import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Cart } from 'helpers/generateRandomCart';

interface CartProps {
  cart:Cart,
  email:string,
  formError:string,
  isSending:boolean,
  onNewOrder: (e: React.FormEvent) => void,
  onValidateCart: (e: React.FormEvent) => void,
  setEmail: (email: string) => void,
}

const CartComponent = ({
  cart,
  onNewOrder,
  onValidateCart,
  formError,
  isSending,
  email,
  setEmail,
}:CartProps):React.ReactElement => (
  <Box m={3}>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Ceci n'est pas un panier de e-commerce.
        </Typography>
        <Typography>
          Dans votre panier, vous avez:
        </Typography>
        <ul>
          <li>Une paire de chaussure {cart.color}</li>
          <li>Total: {cart.price}€</li>
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onNewOrder}>Générer un nouveau panier</Button>
      </CardActions>
    </Card>
    <Box my={3}>
      <Card variant="outlined" >
        <Box m={2}>
          <form noValidate autoComplete="off" onSubmit={onValidateCart}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={formError.length > 0}
              helperText={formError}
              disabled={isSending}
            />
            <Box my={1}>
              <Button type="submit" variant="contained" color="primary" disabled={isSending}>
                Recevoir ma facture
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  </Box>
);

export default CartComponent;