var appRoot = require('app-root-path');

import sendMail, { Attachment } from './index';

const ejs = require('ejs');
const fs = require('fs');


const sendInvoiceConfirmationEmail = async (receiverAddress: string, invoiceFile: string, invitationLink: string) => {
  const subject = "Votre facture";

  const attachment = {
    name: 'facture.pdf',
    contentType: 'application/pdf',
    encoding: 'base64',
    content: invoiceFile,
  }

  const htmlContentRaw = fs.readFileSync(appRoot + '/src/templates/invoiceConfirmation.html.ejs', 'utf8');
  const textContentRaw = fs.readFileSync(appRoot + '/src/templates/invoiceConfirmation.txt.ejs', 'utf8');

  const htmlContent = ejs.render(htmlContentRaw, {filename: 'invoiceConfirmation.html.ejs', invitationLink });
  const textContent = ejs.render(textContentRaw, {filename: 'invoiceConfirmation.txt.ejs', invitationLink });

  return await sendMail(receiverAddress, subject, htmlContent, textContent, attachment);
}

export default sendInvoiceConfirmationEmail;