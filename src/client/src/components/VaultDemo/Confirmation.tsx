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
  <>
    <Box my={2} p={1}>
      <Typography variant="h4" align="center">
        Merci pour votre commande !
      </Typography>
    </Box>
    <Box>
      <Typography>Une confirmation de votre commande vous a été envoyé par email.</Typography>
      <Typography>Votre facture a également été envoyé dans votre coffre-fort personnel.</Typography>
    </Box>
    <Box my={5} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Button href={invitationLink} target="_blank" rel="noopenener noreferrer" variant="contained" color="primary">
        Voir ma facture dans mon coffre-fort
      </Button>
    </Box>
    <Box my={5}>
      <Button size="small" onClick={onNewOrder} variant="contained">Nouvelle commande</Button>
    </Box>
  </>
);

export default ConfirmationComponent;