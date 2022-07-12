import * as express from 'express';
import { AMSService } from '../services/ams.service';
import { StorageService } from '../services/storage.service';

export const contentRouter = express.Router();

const ams = new AMSService();
const storageService = new StorageService();

contentRouter.get('/', async (req, res) => {
  let it = await ams.getAllAssets();
  console.log(it);
  res.send('<pre>' + JSON.stringify(it, null, 1));
});

contentRouter.get('/get-container-sas', async (req, res) => {
  storageService
    .generateContainer()
    .catch(console.log)
    .then((r) => {
      res.json(r);
    });
});

contentRouter.get('/test', async (req, res) => {
  ams
    .getStreamingURLsForBlob()
    .catch(console.log)
    .then((r) => {
      res.json(r);
    });
});
