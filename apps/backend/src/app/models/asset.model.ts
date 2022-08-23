import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
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

    // generate a signed url allowing access for 1hr
    return StorageService.generateSignedURL(this.url);
  }
}
