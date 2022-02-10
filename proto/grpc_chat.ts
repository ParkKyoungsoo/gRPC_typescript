import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatServiceClient as _chatService_ChatServiceClient, ChatServiceDefinition as _chatService_ChatServiceDefinition } from './chatService/ChatService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatService: {
    ChatMessage: MessageTypeDefinition
    ChatService: SubtypeConstructor<typeof grpc.Client, _chatService_ChatServiceClient> & { service: _chatService_ChatServiceDefinition }
  }
}

