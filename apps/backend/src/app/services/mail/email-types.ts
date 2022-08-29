export enum EmailTemplate {
  COURSE_ENROLLMENT = 'COURSE_ENROLLMENT',
  PLATFORM_INVITATION = 'PLATFORM_INVITATION',
  COURSE_COMPLETION = 'COURSE_COMPLETION',
  
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
