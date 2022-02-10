import * as parseArgs from "minimist"; 
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';

import { ProtoGrpcType} from './proto/helloworld';

const sayHello = (call: any, callback: any): void => {
    callback(null, {message: 'Hello' + call.request.name});
}

const sayHelloAgain = (call: any, callback: any): void => {
    callback(null, {message: 'Hello again' + call.request.name});
}
const packagaDefinition: protoloader.PackageDefinition = protoloader.loadSync('./proto/helloworld.proto');
const proto: ProtoGrpcType = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;

const start = (): void => {
    const server: grpc.Server = new grpc.Server();
    server.addService(proto.helloworld.Greeter.service, {sayHello: sayHello, sayHelloAgain: sayHelloAgain});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
      });
}

start();