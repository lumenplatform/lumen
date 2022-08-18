import express = require('express');
import { coursesRouter } from './courses.router';
import { usersRouter } from './users.router';

export const managementRouter = express.Router();

managementRouter.use('/courses', coursesRouter);
managementRouter.use('/users', usersRouter);
