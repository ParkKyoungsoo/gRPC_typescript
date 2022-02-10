// Original file: proto/grpc_chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatMessage as _chatService_ChatMessage, ChatMessage__Output as _chatService_ChatMessage__Output } from '../chatService/ChatMessage';

export interface ChatServiceClient extends grpc.Client {
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatService_ChatMessage, _chatService_ChatMessage__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatService_ChatMessage, _chatService_ChatMessage__Output>;
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatService_ChatMessage, _chatService_ChatMessage__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatService_ChatMessage, _chatService_ChatMessage__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  chat: grpc.handleBidiStreamingCall<_chatService_ChatMessage__Output, _chatService_ChatMessage>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  chat: MethodDefinition<_chatService_ChatMessage, _chatService_ChatMessage, _chatService_ChatMessage__Output, _chatService_ChatMessage__Output>
}
