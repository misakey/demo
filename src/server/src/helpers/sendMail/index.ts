import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

import logger from '~/logger';

import isNull from '~/helpers/isNull';

const mimemessage = require('mimemessage');

const REGION = "eu-west-1";

export type Attachment = {
  name: string,
  contentType: string,
  encoding?: string,
  content: string,
} | null | undefined;


const sendMail = async (receiverAddress: string, subject:string, htmlContent:string, textContent:string, attachment:Attachment) => {
  if (process.env.ENV === 'development') {
    logger.info(`Sending email to ${receiverAddress} - Subject: ${subject}${!isNull(attachment) ? ` With attachment: ${attachment.name}` : ''}`)
    logger.debug(`Content: ${textContent}`);
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
  
    if (!isNull(attachment)) {
      const attachmentEntity = mimemessage.factory({
        contentType: attachment.contentType,
        contentTransferEncoding: (!isNull(attachment.encoding)) ? attachment.encoding : undefined,
        body: attachment.content,
      });
      attachmentEntity.header('Content-Disposition', `attachment ;filename="${attachment.name}"`);
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