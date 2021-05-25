import { Request, Response } from 'express';

import misakey from '~/constants/misakey/consumer';

export const getInvoices = (req: Request, res: Response) => {
  misakey.getData(req.params.dataSubject, 'purchase', req.params.producerId)
    .then((data:any) => {
      const boxes = data.boxes;
      
      const allPurchases = boxes.reduce((accumulatedPurchases:any, box:any) => {
        const messages = box.messages;
        const jsonFiles = messages.filter((message:any) => message.type === 'file' && message.file.name.endsWith('.json'));
        return accumulatedPurchases.concat(jsonFiles.map((message:any) => {
          const utf8decoder = new TextDecoder();
          data = JSON.parse(utf8decoder.decode(message.file.data));
          return {
            name: message.file.name,
            date: message.date,
            data,
          }
        }))
      }, [])

      res.send(allPurchases);
    })
    .catch((error:any) => {
      console.error(error);
      res.status(500);
      res.send();
    });


}