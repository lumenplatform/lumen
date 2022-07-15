import { RequestContext } from '@mikro-orm/core';
import { urlencoded } from 'express';
import express = require('express');
import path = require('path');
import { ContentController } from '../controllers/content.controller';
import { Content } from '../models/content.model';
import { AMSService } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';

const app = express();

app.use(urlencoded());

const viewsPath = 'apps/backend/src/app/admin/views';
app.set('views', path.join(__dirname, '../../../', viewsPath));

const ams = new AMSService();
const storageService = new StorageService();
const contentController = new ContentController(storageService, ams);

app.get('/', async (req, res, next) => {
  const em = RequestContext.getEntityManager();

  Promise.all([
    ams.getStreamingEndpoint(),
    em.find(Content, {}, { orderBy: { id: 'asc' } }),
  ])
    .catch(next)
    .then((e) => {
      res.render('info', {
        streamingEndpoint: e[0],
        content: e[1].map((r) => ({
          ...r,
          streamingURLs: r.streamingURLs.map((k) => ({
            ...k,
            token: ams.generateToken(k.keyIdentifier),
          })),
        })),
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

    if (action === 'PROCESS_VIDEO') {
      await contentController.setupStreamingForContent(
        new String(req.query.content_id).toString()
      );
    }
  }
  res.redirect('/admin');
});

export default app;
