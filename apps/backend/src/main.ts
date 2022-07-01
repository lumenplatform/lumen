import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';

import { indexRouter } from './app/routes';
import { environment } from './environments/environment';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }

    interface Response {}
  }
}

const app = express();

if (environment.production) {
  app.use(express.static(path.join(__dirname, '../frontend')));
}

app.use('/api', indexRouter);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
