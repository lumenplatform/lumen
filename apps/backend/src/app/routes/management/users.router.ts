import * as express from 'express';
import { AuthController } from '../../controllers';
import { OrganizationService } from '../../services/organization.service';
import { UserService } from '../../services/user.service';
import { sendJSON } from '../../utils/response-mapper';

export const usersRouter = express.Router();
const usersService = new UserService();
const orgService = new OrganizationService();
const authController = new AuthController(usersService, orgService);

usersRouter.get('/', (req, res, next) => {
  usersService.getUsersByOrgId(req.user.orgId).then(sendJSON(res)).catch(next);
});

// update users / change role etc
usersRouter.put('/:uid');

usersRouter.post('/invites', (req, res, next) => {
  authController
    .inviteEmailToOrganization({ email: req.body.email, orgId: req.user.orgId })
    .then(sendJSON(res))
    .catch(next);
});

usersRouter.get('/invites', (req, res, next) => {
  authController
    .getPendingUserInvitesForOrg({ orgId: req.user.orgId })
    .then(sendJSON(res))
    .catch(next);
});
