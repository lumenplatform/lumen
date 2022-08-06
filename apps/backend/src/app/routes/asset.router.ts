import * as express from 'express';
import * as Yup from 'yup';
import { AssetController } from '../controllers/asset.controller';
import { validate } from '../middleware/validation';
import { AMSService } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';
import { createResponse } from '../utils/response-mapper';
import { asyncHandler } from './../utils/async-wrapper';

export const assetRouter = express.Router();

const ams = new AMSService();
const storageService = new StorageService();
const assetController = new AssetController(storageService, ams);

assetRouter.get('/', async (req, res) => {
  const it = await ams.getAllAssets();
  console.log(it);
  res.send('<pre>' + JSON.stringify(it, null, 1));
});

assetRouter.get('/upload-config', (req, res, next) => {
  assetController
    .generateUploadConfig()
    .catch(next)
    .then((config) => res.json(createResponse(config)));
});

assetRouter.post(
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
  asyncHandler(({ body }) => assetController.createAsset(body))
);

assetRouter.get('/:id', (req, res) => {
  // redirect to azure storage
});

assetRouter.delete('/:id', (req, res) => {
  // delete
});

assetRouter.post('/video', (req, res) => {
  // get url and queue to processing
  // return id & stuff
});

assetRouter.get('/video/:id', (req, res) => {
  // streaming URL with token
});

assetRouter.delete('/video/:id', (req, res) => {
  // delete in DB & azure
});

assetRouter.get('/token', async (req, res) => {
  res.send(AMSService.generateToken('14bfd13e-dcb2-4aeb-8873-f9dceae52112'));
});
