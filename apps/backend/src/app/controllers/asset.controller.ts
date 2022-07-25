import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { Asset, AssetStatus } from '../models/asset.model';
import { DRMService } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';

export class AssetController {
  constructor(
    private storageService: StorageService,
    private drmService: DRMService
  ) {}

  async generateUploadConfig() {
    const sas = await this.storageService.generateSAS();
    return { sas, containerName: 'uploads' };
  }

  async setupStreamingForAsset(id: string) {
    const em = RequestContext.getEntityManager();
    const content = await em.findOneOrFail(Asset, id);

    content.status = AssetStatus.PROCESSING;

    em.flush();

    this.drmService.getStreamingURLsFormURL(content.url).then(async (r) => {
      const em = RequestContext.getEntityManager();
      const content = await em.findOneOrFail(Asset, id);
      content.contentKey = r[0].keyIdentifier;
      content.status = AssetStatus.ACTIVE;
      content.streamingURLs = r;
      em.flush();
    });

    // non video
    // return this.drmService.getStreamingURLsFormURL(inputUrl);
  }

  async createAsset(content: Asset[]) {
    const em = RequestContext.getEntityManager();
    for (const it of content) {
      const x = em.create(Asset, it);
      em.persist(x);
    }

    await em.flush();
  }
}
