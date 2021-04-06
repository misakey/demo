import React, { useState } from 'react';

import Cart from './Cart';
import Confirmation from './Confirmation';

import generateRandomCart from 'helpers/generateRandomCart';

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

  if (step === 'cart') {
    return (
      <Cart
        cart={cart}
        email={email}
        formError={formError}
        isSending={isSending}
        onNewOrder={onNewOrder}
        onValidateCart={onValidateCart}
        setEmail={setEmail}
      />
    );
  } else if (step === 'confirm') {
    return (
      <Confirmation
        cart={cart}
        invitationLink={invitationLink}
        onNewOrder={onNewOrder}
      />
    );
  }
  return null;

}

export default VaultDemo;