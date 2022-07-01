import { Link } from 'react-router-dom';

export default function CoursePage(props: any) {
  return (
    <div>
      <Link to="/student">Student Home</Link>
      <h1>Course Page </h1>
    </div>
  );
}
