import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
var morgan = require('morgan');

import { InitORM } from './app/config/db';

import { indexRouter } from './app/routes';
import { logger } from './app/utils/logger';
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

app.use('/api', indexRouter);

const port = process.env.PORT;

InitORM().then((e) => {
  const server = app.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', logger.error);
});
