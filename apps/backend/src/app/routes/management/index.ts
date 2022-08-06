import express = require('express');
import { coursesRouter } from './courses.router';

export const managementRouter = express.Router();

managementRouter.use('/courses', coursesRouter);
