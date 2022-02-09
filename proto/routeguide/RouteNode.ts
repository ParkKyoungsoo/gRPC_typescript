// Original file: proto/route_guide.proto

import type { Point as _routeguide_Point, Point__Output as _routeguide_Point__Output } from '../routeguide/Point';

export interface RouteNode {
  'location'?: (_routeguide_Point | null);
  'message'?: (string);
}

export interface RouteNode__Output {
  'location': (_routeguide_Point__Output | null);
  'message': (string);
}
