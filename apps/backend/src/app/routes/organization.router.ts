import * as express from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { OrganizationService } from '../services/organization.service';
import { sendJSON,createResponse } from '../utils/response-mapper';

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

//get course fee for organization
organizationRouter.get('/public-enrollments', (req, res, next) => {
  organizationController
    .getPublicCourseEnrollments(req.user.orgId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//get enrollment charges for organization
organizationRouter.get('/private-enrollments', (req, res, next) => {
  organizationController
    .getPrivateCourseEnrollments(req.user.orgId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//get withdrawals of organization
organizationRouter.get('/withdrawals', (req, res, next) => {
  organizationController
    .getWithdrawals(req.user.orgId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//withdraw amount
organizationRouter.post('/withdraw', (req, res, next) => {
  console.log(req.body);
  organizationController
    .withdrawFunds(req.user.orgId, req.body.amount)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});