import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/Auth';
import Enroll from './components/EnrollPageHeader';
import AdminLayout from './pages/management/AdminLayout';
import Billing from './pages/management/Billing';
import CourseCreate from './pages/management/course/CourseCreate';
import Courses from './pages/management/Courses';
import Customizations from './pages/management/Customizations';
import Dashboard from './pages/management/Dashboard';
import Users from './pages/management/Users';
import NotFound from './pages/NotFound';
import ForInstructors from './pages/public/ForInstructors';
import HomePage from './pages/public/HomePage';
import CourseInfo from './pages/student/course/CourseInfo';
import CourseMaterial from './pages/student/course/CourseMaterial';
import CourseViewer from './pages/student/course/CourseMaterialPage';
import ContentView from './pages/student/course/CourseMaterialView';
import CourseResources from './pages/student/course/CourseResources';
import CoursePage from './pages/student/CoursePage';
import SearchPage from './pages/student/SearchPage';
import StudentHome from './pages/student/StudentHome';
import UserProfile from './pages/UserProfile';
import ExamPage from './pages/management/exam/ExamPage';

const ProtectedPage = ({
  userRole,
}: {
  userRole: 'instructor' | 'student' | 'any';
}) => (
  <RequireAuth role={userRole}>
    <Outlet />
  </RequireAuth>
);

export default function () {
  return (
    <Routes>
      {/* Site Home Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/teaching" element={<ForInstructors />} />

      {/* Pages accessed by the student */}
      <Route element={<ProtectedPage userRole="student" />}>
        <Route path="/student">
          <Route index element={<StudentHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":courseId/enrollment" element={<Enroll />}></Route>
          <Route path=":courseId" element={<CoursePage />}>
            <Route path="material" element={<CourseMaterial />} />
            <Route path="info" element={<CourseInfo />} />
            <Route path="resources" element={<CourseResources />} />
            <Route path="" element={<Navigate replace to="material" />}></Route>
          </Route>
          <Route path=":courseId/learn/" element={<CourseViewer />}>
            <Route path=":sectionId/:topicId" element={<ContentView />} />
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
          <Route path=":courseId/exam/newexam" element={<ExamPage />} />
          <Route path=":courseId/exam/:examId" element={<ExamPage />} />
        </Route>
        <Route path="/manage">
          <Route path="new-course" element={<CourseCreate />}></Route>
          <Route path="courses/:courseId" element={<CourseCreate />}></Route>
        </Route>
      </Route>

      {/* Common pages to all users */}
      <Route element={<ProtectedPage userRole="any" />}>
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}