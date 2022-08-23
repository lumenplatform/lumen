import { MailTemplates } from './email-types';

export const mailTemplates: MailTemplates = {
  COURSE_ENROLLMENT: {
    text: (r: any) => `Welcome to Lumén!
      Thank you for choosing to follow the ${r.course.title} Course with us. Have a great learning session 
      and don't forget to collect your certificate upon completion. Before we begin, here's a little 
      introduction into the course.
      ${r.course.description}
      `,
    subject: (r: any) => `Welcome to the ${r.course.title} Course  `,
    template: 'course-enrollment',
  },
};
