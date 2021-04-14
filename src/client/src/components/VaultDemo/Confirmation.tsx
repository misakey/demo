import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/core/styles';


interface ConfirmationProps {
  invitationLink:string,
  onNewOrder: (e: React.FormEvent) => void,
}


const useStyles = makeStyles(() => ({
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const ConfirmationComponent = ({
  invitationLink,
  onNewOrder,
}:ConfirmationProps):React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Box mt={1}>
        <Link onClick={onNewOrder} color="textPrimary" href="#" className={classes.link}>
          <ArrowBackIcon />
          Simulateur de panier
        </Link>
      </Box>
      <Box my={2} p={1}>
        <Typography variant="h4" align="center">
          Merci pour votre commande !
        </Typography>
      </Box>
      <Box mb={3}>
        <Typography align="center">
          Votre commande est en cours de préparation
        </Typography>
      </Box>
      <Paper variant="outlined">
        <Box my={3}>
          <Typography align="center">
            Votre facture factice est disponible dans l’email de confirmation de commande et dans votre coffre-fort personnel
          </Typography>
        </Box>
        <Box my={3} display="flex" justifyContent="center" alignItems="center">
          <Button href={invitationLink} target="_blank" rel="noopenener noreferrer" variant="contained" color="primary">
            Voir ma facture
          </Button>
        </Box>
      </Paper>
      <Box my={5}  display="flex" justifyContent="center" alignItems="center">
        <Link onClick={onNewOrder} color="textPrimary" href="#">
          Retour au simulateur de panier
        </Link>
      </Box>
    </>
  )
};

export default ConfirmationComponent;