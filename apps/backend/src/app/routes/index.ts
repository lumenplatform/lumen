import * as express from 'express';
import errorHandler from '../middleware/error-handler';
import { injectUser } from '../middleware/security';
import { assetRouter } from './asset.router';
import { authRouter } from './auth.router';
import { coursesRouter } from './courses.router';
import { managementRouter } from './management';
import { organizationRouter } from './organization.router';
import { userRouter } from './user.router';

const router = express.Router();

router.use(injectUser);

router.use('/auth', authRouter);
router.use('/asset', assetRouter);
router.use('/manage', managementRouter);
router.use('/user', userRouter);
router.use('/courses', coursesRouter);
router.use('/org', organizationRouter);

router.use(errorHandler);

export default router;
