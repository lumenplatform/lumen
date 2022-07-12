import { urlencoded } from 'express';
import express = require('express');
import path = require('path');
import { AMSService } from '../services/ams.service';

const app = express();

app.use(urlencoded());

const viewsPath = 'apps/backend/src/app/admin/views';
app.set('views', path.join(__dirname, '../../../', viewsPath));

const ams = new AMSService();

app.get('/', async (req, res) => {
  Promise.all([ams.getStreamingEndpoint()])
    .catch((e) => {
      console.log(e);
      res.send(e);
    })
    .then((e) => {
      res.render('info', {
        streamingEndpoint: e[0],
      });
    });
});

app.get('/do', async (req, res) => {
  const action = req.query.action;
  if (action) {
    if (action === 'START_ENDPOINT') {
      await ams.startEndpoint();
    }

    if (action === 'STOP_ENDPOINT') {
      await ams.stopEndpoint();
    }
  }
  res.redirect('/admin');
});


export default app;
