import React, { useState } from 'react';

import Header from './Header';

import Cart from './Cart';
import Confirmation from './Confirmation';

import generateRandomCart from 'helpers/generateRandomCart';

import { ThemeProvider } from '@material-ui/core/styles'

import theme from './theme';

import api from 'helpers/api';


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

    api.post('/producer/invoice', {email, cart})
      .then(r => {
        setInvitationLink(r.invitationLink);
        setStep('confirm');
      })
      .catch(e => {
        setFormError(e.desc);
      })
      .finally(() => setIsSending(false));
  }

  const onNewOrder = (e: React.FormEvent): void => {
    e.preventDefault();
    setCart(generateRandomCart());
    setInvitationLink('');
    setStep('cart');
  }

  return (
    <ThemeProvider theme={theme}>
      <Header nProductsInCart={step === 'cart' ? 1 : 0}/>
      
        {(step === 'cart') ? (
          <Cart
            cart={cart}
            email={email}
            formError={formError}
            isSending={isSending}
            onNewOrder={onNewOrder}
            onValidateCart={onValidateCart}
            setEmail={setEmail}
          />
        ) : (
          <Confirmation
            cart={cart}
            invitationLink={invitationLink}
            onNewOrder={onNewOrder}
          />
        )}
    </ThemeProvider>
  );
}

export default VaultDemo;