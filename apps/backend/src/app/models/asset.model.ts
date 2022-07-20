import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { StreamingURL } from '../services/drm/ams.service';
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
  id: string = v4();

  @Property()
  url!: string;

  @Enum(() => AssetType)
  type: AssetType = AssetType.FILE;

  @Enum(() => AssetStatus)
  status: AssetStatus = AssetStatus.UPLOADED;

  @Property() mime: string;

  @Property() name: string;

  @Property() config: Record<string, unknown>;

  @Property({ nullable: true }) contentKey?: string;
  @Property({ type: 'json', nullable: true }) streamingURLs?: StreamingURL[];
}
