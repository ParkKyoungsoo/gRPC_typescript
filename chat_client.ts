import readline from 'readline';
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/grpc_chat';

const packagaDefinition = protoloader.loadSync('./proto/grpc_chat.proto');
const proto = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;
const client = new proto.chatService.ChatService('localhost:50051', grpc.credentials.createInsecure());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const user = process.argv[2];
let metadata = new grpc.Metadata();
metadata.add('user', user);
const call = client.chat(metadata);

call.on('data', (chatMessage) => {
    console.log(`${chatMessage.fromName} ==> ${chatMessage.message}`);
});
call.on('end', () => {
    console.log('Server ended call');
});

rl.on('line', (line) => {
    if(line === 'quit') {
        call.end();
        rl.close();
    } else {
        call.write({
            message: line
        }); 
    }
});

console.log('Enter your message below: ');