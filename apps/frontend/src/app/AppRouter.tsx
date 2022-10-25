import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth, RequireDesktop, UserRole } from './components/Auth';
import Enroll from './components/EnrollPageHeader';
import AdminLayout from './pages/management/AdminLayout';
import Billing from './pages/management/Billing';
import CourseCreate from './pages/management/course/CourseCreate';
import ManageCourse from './pages/management/course/ManageCourse';
import Courses from './pages/management/Courses';
import Customizations from './pages/management/Customizations';
import Dashboard from './pages/management/Dashboard';
import ExamPage from './pages/management/exam/ExamPage';
import Users from './pages/management/Users';
import NotFound from './pages/NotFound';
import Notification from './pages/Notification/AllNotification';
import ForInstructors from './pages/public/ForInstructors';
import HomePage from './pages/public/HomePage';
import SearchPage from './pages/public/SearchPage';
import ContentView from './pages/student/course-viewer/ContentView';
import CourseViewer from './pages/student/course-viewer/CourseViewer';
import AssignmentGrades from './pages/student/course/AssignmentGrades';
import AssignmentSettings from './pages/student/course/AssignmentSetting';
import CourseInfo from './pages/student/course/CourseInfo';
import CourseMaterial from './pages/student/course/CourseMaterial';
import CourseResources from './pages/student/course/CourseResources';
import FileUpload from './pages/student/course/FileUpload';
import SubmissionStatus from './pages/student/course/SubmissionStatus';
import CoursePage from './pages/student/CoursePage';
import StudentHome from './pages/student/StudentHome';
import UserProfile from './pages/UserProfile';
import QuizPage from './pages/student/quiz/QuizPage';
import AttemptQuizPage from './pages/student/quiz/QuizAttemptPage';
import QuizResultPage from './pages/student/quiz/QuizResultPage';
import QuizTemplatePage from './pages/student/quiz/QuizTemplatePage';
import ContactUs from './pages/contactUs';
import Privacy from './pages/privacy';
import Certificate from './pages/student/course/CourseMaterial';

const ProtectedPage = ({ userRole }: { userRole: UserRole }) => (
  <RequireAuth role={userRole}>
    <RequireDesktop bypass={userRole === 'instructor'}>
      <Outlet />
    </RequireDesktop>
  </RequireAuth>
);

export default function () {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/teaching" element={<ForInstructors />} />
      <Route path="/courses" element={<SearchPage />} />
      <Route path="/courses/:courseId" element={<Enroll />} />
      <Route path="/contact" element={<ContactUs />} /> 
      <Route path='/privacy' element={<Privacy />} />
      

      {/* Pages accessed by the student */}
      <Route element={<ProtectedPage userRole="student" />}>
        <Route path="/student">
          <Route index element={<StudentHome />} />
          <Route path=":courseId" element={<CoursePage />}>
            <Route path="material" element={<CourseMaterial />} />
            <Route path="info" element={<CourseInfo />} />
            <Route path="resources" element={<CourseResources />} />
            <Route path="grades" element={<AssignmentGrades />} />
            <Route path="SubmissionStatus" element={<SubmissionStatus />} />
            <Route path="AssignmentSettings" element={<AssignmentSettings />} />
            <Route path="Certificate" element={<Certificate />} />
            <Route path="" element={<Navigate replace to="material" />}></Route>
          </Route>
          <Route path=":courseId/learn/" element={<CourseViewer />}>
            <Route path=":sectionId/:topicId" element={<ContentView />} />
          </Route>
          <Route path=":courseId/quiz/" element={<QuizTemplatePage />} >
            <Route path=":quizId" element={<AttemptQuizPage />} />
            <Route path=":quizId/attempt/:attemptId" element={<QuizPage />} />
            <Route path=":quizId/attempt/:attemptId/results" element={<QuizResultPage />} />
          </Route>
        </Route>
      </Route>

      {/* Pages accessed by the teacher / admin / moderator */}
      <Route element={<ProtectedPage userRole="instructor" />}>
        <Route path="/manage" element={<AdminLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="billing" element={<Billing />}></Route>
          <Route path="customize" element={<Customizations />}></Route>
          <Route path="courses/:courseId">
            <Route index element={<ManageCourse />} />
          </Route>
        </Route>
        <Route path="/manage/courses/:courseId">
            <Route path="new-exam" element={<ExamPage />} />
            <Route path="exam/:examId" element={<ExamPage />} />
        </Route>
        <Route path="/manage">
          <Route path="new-course" element={<CourseCreate />}></Route>
          <Route path="courses/:courseId">
            <Route path="edit" element={<CourseCreate />}></Route>
          </Route>
        </Route>
      </Route>

      {/* Common pages to all users */}
      <Route element={<ProtectedPage userRole="any" />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/Add Submission" element={<FileUpload />} />
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
