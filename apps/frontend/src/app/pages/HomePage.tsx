import { Link } from 'react-router-dom';
import Profile from './Profile';

export default function HomePage(props: any) {
  return (
    <div>
      <h1>Site Home</h1>
      <Profile />
      <Link to="/student">Student Home</Link>
      &nbsp; | &nbsp;
      <Link to="/manage">Management Home</Link>
    </div>
  );
}
