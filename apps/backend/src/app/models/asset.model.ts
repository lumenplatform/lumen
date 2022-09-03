import {
  AfterCreate,
  AfterUpdate,
  Entity,
  Enum,
  EventArgs,
  PrimaryKey,
  Property,
  RequestContext,
  UpdateOptions,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AMSService, StreamingURL } from '../services/drm/ams.service';
import { StorageService } from '../services/storage.service';
export enum AssetType {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  VIDEO = 'VIDEO',
}

export enum AssetStatus {
  UPLOADED = 'UPLOADED',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  DELETED = 'DELETED',
}

@Entity()
export class Asset {
  @PrimaryKey()
  id?: string = v4();

  @Property()
  url: string;

  @Enum({ items: () => AssetType, hidden: true })
  type: AssetType = AssetType.FILE;

  @Enum({ items: () => AssetStatus, hidden: true })
  status: AssetStatus = AssetStatus.UPLOADED;

  @Property()
  mime: string;

  @Property()
  name: string;

  @Property({ default: 0, nullable: true })
  size: number;

  @Property({ nullable: true })
  config?: Record<string, unknown>;

  @Property({ nullable: true, hidden: true })
  contentKey?: string;

  @Property({ type: 'json', nullable: true, hidden: true })
  streamingURLs?: StreamingURL[];

  @Property({ persist: false })
  get path() {
    // generate a token for the drm server
    if (this.streamingURLs) {
      return {
        src: this.streamingURLs[0].url,
        protectionInfo: [
          {
            type: 'Widevine',
            authenticationToken:
              'Bearer ' +
              AMSService.generateToken(this.streamingURLs[0].keyIdentifier),
          },
        ],
      };
    }
    try {
      // generate a signed url allowing access for 1hr
      return StorageService.generateSignedURL(this.url);
    } catch (e) {
      // if an error occurs during generation (eg:invalid url) just return the url
      return this.url;
    }
  }

  @AfterUpdate()
  @AfterCreate()
  async processVideo(eventArgs: EventArgs<Asset>, options: UpdateOptions<any>) {
    if (
      this.mime.startsWith('video') &&
      !this.streamingURLs &&
      process.env.AUTO_PROCESS_VIDEO == 'true'
    ) {
      this.status = AssetStatus.PROCESSING;

      await eventArgs.em.nativeUpdate(
        Asset,
        { id: this.id },
        { status: AssetStatus.PROCESSING }
      );

      const drmService = new AMSService();
      const r = await drmService.getStreamingURLsFormURL(this.url);

      await eventArgs.em.nativeUpdate(
        Asset,
        { id: this.id },
        {
          contentKey: r[0].keyIdentifier,
          status: AssetStatus.ACTIVE,
          streamingURLs: r,
        }
      );
    }
  }
}
