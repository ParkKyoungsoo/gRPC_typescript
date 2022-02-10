import * as parseArgs from "minimist"; 
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';

import { ProtoGrpcType} from './proto/helloworld';
import { GreeterClient } from "./proto/helloworld/Greeter";

const start = (): void => {
    const packagaDefinition: protoloader.PackageDefinition = protoloader.loadSync('./proto/helloworld.proto');
    const proto: ProtoGrpcType = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;
    const argv: parseArgs.ParsedArgs = parseArgs.default(process.argv.slice(2), {
        string: 'target'
    });

    console.log(argv, argv.target);
    
    const target: any = argv.target || 'localhost:50051';
    const client: GreeterClient = new proto.helloworld.Greeter(target, grpc.credentials.createInsecure());

    const user: string = argv._.length > 0 ? argv._[0] : ', world';

    client.sayHello({name: user}, (err: any, response: any) => {
        console.log('Greeting:', response?.message);
    });

    client.sayHelloAgain({name: user}, (err: any, response: any) => {
        console.log('Greeting:', response?.message);
    });

}

start();

 