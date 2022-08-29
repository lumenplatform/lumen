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

  PLATFORM_INVITATION: {
    text: (r: any) => `Welcome to Lumén!
    If you are looking for a secure online platform to launch your courses, join now!!! You can join as 
    a course content creator or a student.
      `,
    subject: (r: any) => `Hello there, let's learn or earn with Lumén!`,
    template: 'platform-invitation',
  },
  COURSE_COMPLETION: {
    text: (r: any) => `Hello there!
    You have successfully completed the ${r.course.title} course with Lumén. Get your certificate today.
    And browse more courses from our catalogue to find more new and interesting things to learn. Good Luck!
      `,
    subject: (r: any) => `Hello there,congraducations on completing the ${r.course.title} course!`,
    template: 'course-completion',
  }
};
