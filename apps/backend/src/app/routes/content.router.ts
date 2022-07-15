import { RequestContext } from '@mikro-orm/core';
import * as express from 'express';
import * as Yup from 'yup';
import { ContentController } from '../controllers/content.controller';
import { validate } from '../middleware/validation';
import { AMSService } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';
import { createResponse } from './../utils/response-mapper';
export const contentRouter = express.Router();

const ams = new AMSService();
const storageService = new StorageService();
const contentController = new ContentController(storageService, ams);

contentRouter.get('/', async (req, res) => {
  let it = await ams.getAllAssets();
  console.log(it);
  res.send('<pre>' + JSON.stringify(it, null, 1));
});

contentRouter.get('/upload-config', async (req, res, next) => {
  contentController
    .generateUploadConfig()
    .catch(next)
    .then((config) => res.json(createResponse(config)));
});

contentRouter.post(
  '/',
  validate({
    body: Yup.array(
      Yup.object({
        url: Yup.string().url('invalid valid URL').required(),
        mime: Yup.string().required(),
        name: Yup.string().required(),
        config: Yup.object(),
      })
    ).min(1),
  }),
  (req, res, next) => {
    contentController
      .createContent(req.body)
      .then((r) => {
        res.json(createResponse(r));
      })
      .catch(next);
  }
);

contentRouter.get('/:id', (req, res) => {
  // redirect to azure storage
});

contentRouter.delete('/:id', (req, res) => {
  // delete
});

contentRouter.post('/video', (req, res) => {
  // get url and queue to processing
  // return id & stuff
});

contentRouter.get('/video/:id', (req, res) => {
  // streaming URL with token
});

contentRouter.delete('/video/:id', (req, res) => {
  // delete in DB & azure
});

contentRouter.get('/token', async (req, res) => {
  res.send(ams.generateToken('14bfd13e-dcb2-4aeb-8873-f9dceae52112'));
});
