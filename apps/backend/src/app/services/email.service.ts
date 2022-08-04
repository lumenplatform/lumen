import ejs from 'ejs';
import path = require('path');
import nodemailer = require('nodemailer');

const containsHTML = (str) => /<[a-z][\s\S]*>/i.test(str);

type Body = {
  htmlFile?: {
    filePath: string;
    data: object;
  };
  html?: {
    body: string;
  }; 
  text?: {
    body: string;
  };
};
export interface MailService {
  sendMail(recieverEmail: string, subject: string, bodyOptions: Body)
}

export class SMTPMailService {
  private transporter;
  private mailer: nodemailer;
  constructor() {
    this.mailer = nodemailer;
    // this.transporter = this.mailer.createTransport({
    //   host: 'smtp.sendgrid.net',
    //   port: 587,
    //   auth: {
    //     user: 'apikey',
    //     pass: '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',
    //   },
    // });
    // this.transporter.verify();
  }

  async sendMail(recieverEmail, subject, bodyOptions) {
    let body;

    if (bodyOptions.htmlFile) {
      const { data, fileName } = bodyOptions.htmlFile;
      const filePath = path.join('./templates/email', fileName, '.ejs');
      body = await ejs.renderFile(filePath, data);
    } else if (bodyOptions.html) {
      body = bodyOptions.html.body;
    } else if (bodyOptions.text) {
      body = bodyOptions.text.body;
    }

    if (!body) throw new Error('No body found');

    this.transporter.sendMail({
      from: '"Your Name" <youremail@gmail.com>', // sender address
      to: 'receiverone@gmail.com, receivertwo@outlook.com', // list of receivers
      subject: 'Medium @edigleyssonsilva ✔', // Subject line
      text: !containsHTML(body) ? body : undefined,
      html: containsHTML(body) ? body : undefined,
    });
  }
}
