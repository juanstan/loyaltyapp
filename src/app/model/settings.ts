import {Interest} from './interest';

export class Settings {
  mapBoxTemplate: string;
  interests: Interest;
  initialLng: number;
  initialLat: number;
  created_at: Date;
  updated_at: Date;
}
