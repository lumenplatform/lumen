// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

export function App() {
  const [response, setResponse] = useState('loading');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then((r) => {
        setResponse(r);
      });
  });

  return (
    <>
      {response}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      <Button variant="contained">Hello World</Button>
    </>
  );
}

export default App;
