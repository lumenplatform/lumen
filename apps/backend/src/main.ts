import * as express from 'express';
import { environment } from './environments/environment';

const app = express();
const path = require('path');

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome from backend!' });
});

if (environment.production) {
  app.use(express.static(path.join(__dirname, '../frontend')));
}

const port = process.env.port || process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
