// Original file: proto/route_guide.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Feature as _routeguide_Feature, Feature__Output as _routeguide_Feature__Output } from '../routeguide/Feature';
import type { Point as _routeguide_Point, Point__Output as _routeguide_Point__Output } from '../routeguide/Point';
import type { Rectangle as _routeguide_Rectangle, Rectangle__Output as _routeguide_Rectangle__Output } from '../routeguide/Rectangle';
import type { RouteNode as _routeguide_RouteNode, RouteNode__Output as _routeguide_RouteNode__Output } from '../routeguide/RouteNode';
import type { RouteSummary as _routeguide_RouteSummary, RouteSummary__Output as _routeguide_RouteSummary__Output } from '../routeguide/RouteSummary';

export interface RouteGuideClient extends grpc.Client {
  GetFeature(argument: _routeguide_Point, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  GetFeature(argument: _routeguide_Point, metadata: grpc.Metadata, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  GetFeature(argument: _routeguide_Point, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  GetFeature(argument: _routeguide_Point, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  getFeature(argument: _routeguide_Point, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  getFeature(argument: _routeguide_Point, metadata: grpc.Metadata, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  getFeature(argument: _routeguide_Point, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  getFeature(argument: _routeguide_Point, callback: grpc.requestCallback<_routeguide_Feature__Output>): grpc.ClientUnaryCall;
  
  ListFeatures(argument: _routeguide_Rectangle, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_routeguide_Feature__Output>;
  ListFeatures(argument: _routeguide_Rectangle, options?: grpc.CallOptions): grpc.ClientReadableStream<_routeguide_Feature__Output>;
  listFeatures(argument: _routeguide_Rectangle, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_routeguide_Feature__Output>;
  listFeatures(argument: _routeguide_Rectangle, options?: grpc.CallOptions): grpc.ClientReadableStream<_routeguide_Feature__Output>;
  
  RecordRoute(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  RecordRoute(metadata: grpc.Metadata, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  RecordRoute(options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  RecordRoute(callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  recordRoute(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  recordRoute(metadata: grpc.Metadata, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  recordRoute(options: grpc.CallOptions, callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  recordRoute(callback: grpc.requestCallback<_routeguide_RouteSummary__Output>): grpc.ClientWritableStream<_routeguide_Point>;
  
  RouteChat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_routeguide_RouteNode, _routeguide_RouteNode__Output>;
  RouteChat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_routeguide_RouteNode, _routeguide_RouteNode__Output>;
  routeChat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_routeguide_RouteNode, _routeguide_RouteNode__Output>;
  routeChat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_routeguide_RouteNode, _routeguide_RouteNode__Output>;
  
}

export interface RouteGuideHandlers extends grpc.UntypedServiceImplementation {
  GetFeature: grpc.handleUnaryCall<_routeguide_Point__Output, _routeguide_Feature>;
  
  ListFeatures: grpc.handleServerStreamingCall<_routeguide_Rectangle__Output, _routeguide_Feature>;
  
  RecordRoute: grpc.handleClientStreamingCall<_routeguide_Point__Output, _routeguide_RouteSummary>;
  
  RouteChat: grpc.handleBidiStreamingCall<_routeguide_RouteNode__Output, _routeguide_RouteNode>;
  
}

export interface RouteGuideDefinition extends grpc.ServiceDefinition {
  GetFeature: MethodDefinition<_routeguide_Point, _routeguide_Feature, _routeguide_Point__Output, _routeguide_Feature__Output>
  ListFeatures: MethodDefinition<_routeguide_Rectangle, _routeguide_Feature, _routeguide_Rectangle__Output, _routeguide_Feature__Output>
  RecordRoute: MethodDefinition<_routeguide_Point, _routeguide_RouteSummary, _routeguide_Point__Output, _routeguide_RouteSummary__Output>
  RouteChat: MethodDefinition<_routeguide_RouteNode, _routeguide_RouteNode, _routeguide_RouteNode__Output, _routeguide_RouteNode__Output>
}
