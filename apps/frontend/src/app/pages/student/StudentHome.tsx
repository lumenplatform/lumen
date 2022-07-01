import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import UpcomingEvents from '../../components/UpcomingEvents';

export default function StudentHome(props: any) {
  return (
    <div>
      <Link to="/">Site Home</Link>
      <h1>Student Home</h1>
      <Link to="/student/course-01">Course 01</Link>

      <CourseCard></CourseCard>
      <UpcomingEvents />
    </div>
  );
}
