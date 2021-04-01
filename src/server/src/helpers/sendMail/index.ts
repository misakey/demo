import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

const mimemessage = require('mimemessage');

const REGION = "eu-west-1";


const sendMail = async (receiverAddress: string, subject:string, htmlContent:string, textContent:string, attachment:string, attachmentName:string) => {
  if (process.env.ENV === 'development') {
    console.log(`Sending email to ${receiverAddress}`)
    console.log(`Subject: ${subject}`)
    console.log(`Content: ${textContent}`);
    if (attachment.length > 0) {
      console.log(`With attachment: ${attachmentName}`);
    }
    return { isError: false, data: null };
  } else if (process.env.ENV === 'production') {
    const mailContent = mimemessage.factory({contentType: 'multipart/mixed',body: []});
    mailContent.header('From', 'MTS <demo@misakey.com>');
    mailContent.header('To',receiverAddress);
    mailContent.header('Subject', subject);
  
    const alternateEntity = mimemessage.factory({
      contentType: 'multipart/alternate',
      body: []
    });
  
    const htmlEntity = mimemessage.factory({
      contentType: 'text/html;charset=utf-8',
      body:  htmlContent,
    });
    const plainEntity = mimemessage.factory({
      body: textContent
    });
  
    alternateEntity.body.push(htmlEntity);
    alternateEntity.body.push(plainEntity);
  
    mailContent.body.push(alternateEntity);
  
    if (attachment.length > 0) {
      const attachmentEntity = mimemessage.factory({
        contentType: 'text/pdf',
        contentTransferEncoding: 'base64',
        body: attachment,
      });
      attachmentEntity.header('Content-Disposition', `attachment ;filename="${attachmentName}"`);
      mailContent.body.push(attachmentEntity);
    }

    const sesCommandInput = {
      RawMessage: { Data: new TextEncoder().encode(mailContent.toString()) },
    };
  
  
    const ses = new SESClient({ region: REGION });

    try {
      const data = await ses.send(new SendRawEmailCommand(sesCommandInput));
      return { isError: false, data };
    } catch (err) {
      return { isError: true, error: err };
    }
  }
}

export default sendMail;