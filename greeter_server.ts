import * as parseArgs from "minimist"; 
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';

import { ProtoGrpcType} from './proto/helloworld';

const sayHello = (call: any, callback: any) => {
    callback(null, {message: 'Hello' + call.request.message});
}

const sayHelloAgain = (call: any, callback: any) => {
    callback(null, {message: 'Hello again' + call.request.message});
}

export function start() {
    const packagaDefinition = protoloader.loadSync('./proto/helloworld.proto');
    const proto = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;
    const server = new grpc.Server();
    server.addService(proto.helloworld.Greeter.service, {sayHello: sayHello, sayHelloAgain: sayHelloAgain});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
      });
}

start();

