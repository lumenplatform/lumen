import { MailTemplates } from './email-types';

export const mailTemplates: MailTemplates = {
  COURSE_ENROLLMENT: {
    text: (r: any) => `Welcome to Course ${r.course.title}`,
    subject: (r: any) => `Welcome to Course  ${r.course.title}`,
    template: 'course-enrollment',
  },
};
