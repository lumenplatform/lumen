import * as express from 'express';
import { UserService } from '../../services/user.service';
import { sendJSON } from '../../utils/response-mapper';

export const usersRouter = express.Router();
const usersService = new UserService();

usersRouter.get('/', (req, res, next) => {
  usersService.getUsersByOrgId(req.user.orgId).then(sendJSON(res)).catch(next);
});

// update users / change role etc
usersRouter.put('/:uid');

// invite users through email
usersRouter.post('/invite');
