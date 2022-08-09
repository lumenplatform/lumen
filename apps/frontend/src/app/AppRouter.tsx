import { Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/Auth';
import HomePage from './pages/HomePage';
import AdminLayout from './pages/management/AdminLayout';
import Billing from './pages/management/Billing';
import CourseCreate from './pages/management/Course/CourseCreate/CourseCreate';
import Courses from './pages/management/Courses';
import Customizations from './pages/management/Customizations';
import Dashboard from './pages/management/Dashboard';
import Users from './pages/management/Users';
import CourseInfo from './pages/student/course/CourseInfo';
import CourseMaterial from './pages/student/course/CourseMaterial';
import CourseResources from './pages/student/course/CourseResources';
import CoursePage from './pages/student/CoursePage';
import SearchPage from './pages/student/SearchPage';
import StudentHome from './pages/student/StudentHome';
import UserProfile from './pages/UserProfile';
import Enroll from './components/EnrollPageHeader';
import CourseMaterialPage from './pages/student/course/CourseMaterialPage';
import CourseMaterialView from './pages/student/course/CourseMaterialView';
import AssignmentGrades from './pages/student/course/AssignmentGrades';
import SubmissionStatus from './pages/student/course/SubmissionStatus';
import AssignmentSettings from './pages/student/course/AssignmentSetting';
import FileUpload from './pages/student/course/FileUpload';
const ProtectedPage = () => (
  <RequireAuth>
    <Outlet />
  </RequireAuth>
);

export default function () {
  return (
    <Routes>
      {/* Site Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Protected Pages */}
      <Route element={<ProtectedPage />}>
        {/* Pages accessed by the student */}
        <Route path="/student">
          <Route index element={<StudentHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":courseId/enrollment" element={<Enroll />}></Route>
          <Route path=":courseId" element={<CoursePage />}>
            <Route path="material" element={<CourseMaterial />} />
            <Route path="info" element={<CourseInfo />} />
            <Route path="resources" element={<CourseResources />} />
            <Route path="grades" element={<AssignmentGrades />} />
            <Route path="SubmissionStatus" element={<SubmissionStatus />} />
            <Route path="AssignmentSettings" element={<AssignmentSettings />} />
          </Route>
          <Route path=":courseId/materialview" element={<CourseMaterialPage />}>
            <Route path=":materialId" element={<CourseMaterialView />} />
          </Route>
        </Route>

        {/* Pages accessed by the teacher / admin / moderator */}
        <Route path="/manage" element={<AdminLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="new-course" element={<CourseCreate />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="billing" element={<Billing />}></Route>
          <Route path="customize" element={<Customizations />}></Route>
        </Route>
        {/* Common pages to all users */}
        <Route path="/profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}
