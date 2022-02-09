import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RouteGuideClient as _routeguide_RouteGuideClient, RouteGuideDefinition as _routeguide_RouteGuideDefinition } from './routeguide/RouteGuide';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  routeguide: {
    Feature: MessageTypeDefinition
    Point: MessageTypeDefinition
    Rectangle: MessageTypeDefinition
    RouteGuide: SubtypeConstructor<typeof grpc.Client, _routeguide_RouteGuideClient> & { service: _routeguide_RouteGuideDefinition }
    RouteNode: MessageTypeDefinition
    RouteSummary: MessageTypeDefinition
  }
}

