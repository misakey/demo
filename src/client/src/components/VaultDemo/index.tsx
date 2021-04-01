import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import generateRandomCart from 'helpers/generateRandomCart';


const VaultDemo:React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [cart, setCart] = useState(generateRandomCart());
  const [step, setStep] = useState('cart');
  const [invitationLink, setInvitationLink] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onValidateCart = (e: React.FormEvent):void => {
    e.preventDefault();
    setFormError('');
    setIsSending(true);

    fetch('http://localhost:5000/producer/invoice', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, cart }) // body data type must match "Content-Type" header
    })
    .then(response => {
      if (response.status === 200) {
        response.json().then(r => {
          setInvitationLink(r.invitationLink);
          console.log(r);
          setIsSending(false);
          setStep('confirm');
        })
      } else if (response.status === 400) {
        response.json().then(r => {
          console.log(r);
          setIsSending(false);
          setFormError(r.message);
        })
      } else {
        setFormError('Une erreur inconnue est arrivée');
        setIsSending(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setFormError('Le service est temporairement indisponible.');
      setIsSending(false);
    });
  }

  const onNewOrder = (e: React.FormEvent): void => {
    e.preventDefault();
    setCart(generateRandomCart());
    setInvitationLink('');
    setStep('cart');
  }

  if (step === 'cart') {
    return (
      <Box m={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              Ceci n'est pas un panier de e-commerce.
            </Typography>
            <Typography>
              Dans votre panier, vous avez:
              <ul>
                <li>Une paire de chaussure {cart.color}</li>
                <li>Total: {cart.price}€</li>
              </ul>
            </Typography>
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
  } else if (step === 'confirm') {
    return (
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
  }
  return null;

}

export default VaultDemo;