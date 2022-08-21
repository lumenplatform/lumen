import axios from 'axios';
import * as ejs from 'ejs';
import * as path from 'path';

import { MailService, SendMailOptions } from './email-types';
import { mailTemplates } from './mail-templates';

export class MailJetService implements MailService {
  constructor() {
    // todo: verify credentials are present
  }

  async sendMail(receiver: string, options: SendMailOptions) {
    const template = mailTemplates[options.template];
    const templatePath = path.join(
      __dirname,
      './assets/templates',
      template.template + '.ejs'
    );

    const html = await ejs.renderFile(templatePath, options.data);

    const requestBody = {
      Messages: [
        {
          From: {
            Email: 'notifications@lumenlms.xyz',
            Name: 'Lumen LMS',
          },
          To: [
            {
              Email: receiver,
            },
          ],
          Subject: template.subject(options.data),
          TextPart: template.text(options.data),
          HTMLPart: html,
          CustomID: 'lumen-template:' + options.template,
        },
      ],
    };

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MAILJET_KEY,
        password: process.env.MAILJET_SECRET,
      },
    };

    const response = await axios.post(
      'https://api.mailjet.com/v3.1/send',
      requestBody,
      requestConfig
    );
    return response.data;
  }
}
