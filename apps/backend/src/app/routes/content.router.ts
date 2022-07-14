import * as express from 'express';
import { AMSService } from '../services/drm/ams.service';
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
    .generateSAS()
    .catch(console.log)
    .then((r) => {
      res.json(r);
    });
});

contentRouter.get('/test', async (req, res) => {
  let inputUrl: string =
    'https://amssamples.streaming.mediaservices.windows.net/2e91931e-0d29-482b-a42b-9aadc93eb825/AzurePromo.mp4';

  inputUrl =
    'https://lumenlmsstorage.blob.core.windows.net/test/2q5Z1Zvra3csQhfF.mp4?sv=2021-08-06&se=2022-07-13T17%3A54%3A47Z&sr=c&sp=rcw&sig=oGSwJI78GDbWAl4mknRH%2FVZBS%2F2ZsRk9Wz8aQmOPoqk%3D';

  ams
    .getStreamingURLsFormURL(inputUrl)
    .catch(console.log)
    .then((r) => {
      res.json(r);
    });
});

contentRouter.get('/token', async (req, res) => {
  res.send(ams.generateToken('14bfd13e-dcb2-4aeb-8873-f9dceae52112'));
});

contentRouter.post('/', (req, res) => {
  // get URLs & move ?
});

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

