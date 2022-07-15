import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { StreamingURL } from '../services/drm/ams.service';
export enum ContentType {
  FILE = 'FILE',
  VIDEO = 'VIDEO',
}

export enum ContentStatus {
  UPLOADED = 'UPLOADED',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  DELETED = 'DELETED',
}

@Entity()
export class Content {
  @PrimaryKey()
  id: string = v4();

  @Property()
  url!: string;

  @Enum(() => ContentType)
  type: ContentType = ContentType.FILE;

  @Enum(() => ContentStatus)
  status: ContentStatus = ContentStatus.UPLOADED;

  @Property() mime: string;

  @Property() name: string;

  @Property() config: any;

  @Property({ nullable: true }) contentKey?: string;
  @Property({ type: 'json', nullable: true }) streamingURLs?: StreamingURL[];
}
