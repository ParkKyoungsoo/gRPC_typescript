// Original file: proto/route_guide.proto

import type { Point as _routeguide_Point, Point__Output as _routeguide_Point__Output } from '../routeguide/Point';

export interface Feature {
  'name'?: (string);
  'location'?: (_routeguide_Point | null);
}

export interface Feature__Output {
  'name': (string);
  'location': (_routeguide_Point__Output | null);
}
