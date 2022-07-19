import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { Content, ContentStatus } from '../models/content.model';
import { DRMService } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';

export class ContentController {
  constructor(
    private storageService: StorageService,
    private drmService: DRMService
  ) {}

  async generateUploadConfig() {
    const sas = await this.storageService.generateSAS();
    return { sas, containerName: 'uploads' };
  }

  async setupStreamingForContent(id: string) {
    const em = RequestContext.getEntityManager();
    const content = await em.findOneOrFail(Content, id);

    content.status = ContentStatus.PROCESSING;

    em.flush();

    this.drmService.getStreamingURLsFormURL(content.url).then(async (r) => {
      const em = RequestContext.getEntityManager();
      const content = await em.findOneOrFail(Content, id);
      content.contentKey = r[0].keyIdentifier;
      content.status = ContentStatus.ACTIVE;
      content.streamingURLs = r;
      em.flush();
    });

    // non video
    // return this.drmService.getStreamingURLsFormURL(inputUrl);
  }

  async createContent(content: Content[]) {
    const em = RequestContext.getEntityManager();
    for (const it of content) {
      const x = em.create(Content, it);
      em.persist(x);
    }

    await em.flush();
  }
}
