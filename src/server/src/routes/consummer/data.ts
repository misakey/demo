import { Request, Response } from 'express';

import misakey from '~/constants/misakey/consumer';

export const getInvoices = (req: Request, res: Response) => {
  misakey.getData(req.params.dataSubject, 'purchase', req.params.producerId)
    .then((data:any) => {
      const boxes = data.boxes;
      const messages = boxes[0].messages;
      const jsonFiles = messages.filter((message:any) => message.type === 'file' && message.file.name.endsWith('.json'));
      const ret = jsonFiles.map((message:any) => {
        console.log("COUU");
        console.log(message.file.name);
        console.log(typeof(message.file.data));
        const utf8decoder = new TextDecoder();
        console.log(utf8decoder.decode(message.file.data))
        data = JSON.parse(utf8decoder.decode(message.file.data));
        return {
          name: message.file.name,
          date: message.date,
          data,
        }
      })

      res.send(ret);
    })
    .catch((error:any) => {
      console.error(error);
      res.status(500);
      res.send();
    });


}