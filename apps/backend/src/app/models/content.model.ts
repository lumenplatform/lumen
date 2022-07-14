import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum ContentType {
  FILE = 'FILE',
  VIDEO = 'VIDEO',
}

export enum ContentStatus {
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  DELETED = 'DELETED',
}

@Entity()
export class Content {
  @PrimaryKey()
  id!: string;

  @Property()
  url!: string;

  @Enum(() => ContentType)
  type: ContentType = ContentType.FILE;

  @Enum(() => ContentStatus)
  status: ContentStatus = ContentStatus.PROCESSING;
}
