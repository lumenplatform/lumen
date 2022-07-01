import { Link } from 'react-router-dom';

export default function StudentHome(props: any) {
  return (
    <div>
      <Link to="/">Site Home</Link>
      <h1>Student Home</h1>
      <Link to="/student/course-01">Course 01</Link>
    </div>
  );
}
