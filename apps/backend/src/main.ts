import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';

import { InitORM, InjectORM } from './app/config/db';

import { json } from 'express';
import adminRouter from './app/admin/admin.router';
import apiRouter from './app/routes';
import { logger } from './app/utils/logger';
import { environment } from './environments/environment';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();
app.set('view engine', 'ejs');

if (environment.production) {
  // prod only middleware
  app.use(express.static(path.join(__dirname, '../frontend')));
} else {
  // dev only middleware
  app.use(
    morgan(
      '[REQUEST] :method :url :status :response-time ms - :res[content-length]',
      {}
    )
  );
}
app.use(json());
app.use(InjectORM);

app.use('/api', apiRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT;

InitORM().then((e) => {
  const server = app.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', logger.error);
});
