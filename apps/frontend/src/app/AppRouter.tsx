import { Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/Auth';
import HomePage from './pages/public/HomePage';
import AdminLayout from './pages/management/AdminLayout';
import Billing from './pages/management/Billing';
import CourseCreate from './pages/management/course/CourseCreate';
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
import ForInstructors from './pages/public/ForInstructors';
import NotFound from './pages/NotFound';

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
      <Route path="/teaching" element={<ForInstructors />} />

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
          </Route>
          <Route path=":courseId/materialview" element={<CourseMaterialPage />}>
            <Route path=":materialId" element={<CourseMaterialView />} />
          </Route>
        </Route>

        {/* Pages accessed by the teacher / admin / moderator */}
        <Route path="/manage" element={<AdminLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="billing" element={<Billing />}></Route>
          <Route path="customize" element={<Customizations />}></Route>
        </Route>
        <Route path="/manage">
          <Route path="new-course" element={<CourseCreate />}></Route>
          <Route path="courses/:courseId" element={<CourseCreate />}></Route>
        </Route>

        {/* Common pages to all users */}
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
