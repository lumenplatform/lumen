import * as express from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { OrganizationService } from '../services/organization.service';
import { sendJSON } from '../utils/response-mapper';

export const organizationRouter = express.Router();
const organizationService = new OrganizationService();
const organizationController = new OrganizationController(organizationService);

organizationRouter.get('/current', (req, res, next) => {
  organizationController
    .getOrgById(req.user.orgId, ['theme', 'billing'])
    .then(sendJSON(res, 200))
    .catch(next);
});

organizationRouter.post('/current', (req, res, next) => {
  organizationController
    .updateOrgInformation(req.user.orgId, req.body)
    .then(sendJSON(res, 200))
    .catch(next);
});

organizationRouter.get('/dashboard-data', (req, res,next) => {
  organizationController
    .getOrgDashboardDataById(req.user.orgId)
    .then(sendJSON(res, 200))
    .catch(next);
});
