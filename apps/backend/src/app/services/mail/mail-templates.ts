import { MailTemplates } from './email-types';

export const mailTemplates: MailTemplates = {
  COURSE_ENROLLMENT: {
    text: (r: any) => `Welcome to Course ${r.course.title}`,
    subject: (r: any) => `Welcome to Course  ${r.course.title}`,
    template: 'course-enrollment',
  },
  COURSE_INVITATION: {
    text: (r: any) => `Welcome to Course ${r.course.title}`,
    subject: (r: any) => `Welcome to Course  ${r.course.title}`,
    template: 'course-invitation',
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
