export enum EmailTemplate {
  COURSE_ENROLLMENT = 'COURSE_ENROLLMENT',
}

export type MailTemplates = Record<
  EmailTemplate,
  {
    text: (data: unknown) => string;
    subject: (data: unknown) => string;
    template: string;
  }
>;

export type SendMailOptions = {
  data: unknown;
  template: EmailTemplate;
};

export interface MailService {
  sendMail(receiver: string, options: SendMailOptions): Promise<void>;
}