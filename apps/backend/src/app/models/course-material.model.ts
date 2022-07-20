import { Asset } from './asset.model';

export class CourseMaterial {
  title;
  description?;
  content?: Asset;
  children?: CourseMaterial[];
  timeEstimate: number;
}
