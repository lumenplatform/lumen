import * as express from 'express';
import { AuthController } from '../controllers';
import { guard } from '../middleware/security';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { sendJSON } from '../utils/response-mapper';

export const authRouter = express.Router();

const authService = new AuthService();
const userService = new UserService();
const orgService = new OrganizationService();

const authController = new AuthController(userService, orgService);

authRouter.use(guard.isAuthenticated);

authRouter.get('/me', (req, res, next) => {
  authController
    .getUserFromRequest(req.user)
    .then(sendJSON(res))
    .catch(next);
});

authRouter.post('/register-organization', (req, res, next) => {
  authController
    .registerAsOrganization({
      userEmail: req.user.email,
      orgName: req.body.orgName,
      logo: req.body.logo,
      description: req.body.description,
    })
    .then(sendJSON(res))
    .catch(next);
});
