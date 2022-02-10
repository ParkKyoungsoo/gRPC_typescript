// Original file: proto/grpc_chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatMessage as _grpc_service_ChatMessage, ChatMessage__Output as _grpc_service_ChatMessage__Output } from '../grpc_service/ChatMessage';

export interface ChatServiceClient extends grpc.Client {
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_service_ChatMessage, _grpc_service_ChatMessage__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_service_ChatMessage, _grpc_service_ChatMessage__Output>;
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_service_ChatMessage, _grpc_service_ChatMessage__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_grpc_service_ChatMessage, _grpc_service_ChatMessage__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  chat: grpc.handleBidiStreamingCall<_grpc_service_ChatMessage__Output, _grpc_service_ChatMessage>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  chat: MethodDefinition<_grpc_service_ChatMessage, _grpc_service_ChatMessage, _grpc_service_ChatMessage__Output, _grpc_service_ChatMessage__Output>
}
