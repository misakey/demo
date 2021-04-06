import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Cart } from 'helpers/generateRandomCart';

interface ConfirmationProps {
  cart:Cart,
  invitationLink:string,
  onNewOrder: (e: React.FormEvent) => void,
}

const ConfirmationComponent = ({
  cart,
  invitationLink,
  onNewOrder,
}:ConfirmationProps):React.ReactElement => (
  <Box m={3}>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Merci pour votre commande !
        </Typography>
        <Typography>
          Vous avez commandé une paire de chaussures {cart.color}, pour {cart.price}€.
        </Typography>
        <Typography>
          Vous avez reçu votre facture par email.
        </Typography>
        <Typography>
          Vous pouvez également la consulter ici:
        </Typography>
        <Button href={invitationLink} target="_blank" rel="noopenener noreferrer" variant="contained" color="primary">Voir ma facture</Button>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onNewOrder}>Refaire une commande</Button>
      </CardActions>
    </Card>
  </Box>
);

export default ConfirmationComponent;