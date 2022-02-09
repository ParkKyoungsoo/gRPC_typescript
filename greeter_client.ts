import * as parseArgs from "minimist"; 
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';

import { ProtoGrpcType} from './proto/helloworld';

export function start() {
    const packagaDefinition = protoloader.loadSync('./proto/helloworld.proto');
    const proto = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;
    const argv = parseArgs.default(process.argv.slice(2), {
        string: 'target'
    });

    const target = argv.target || 'localhost:50051';
    const client = new proto.helloworld.Greeter(target, grpc.credentials.createInsecure());

    const user = argv._.length > 0 ? argv._[0] : ', world';

    client.sayHello({name: user}, (err: any, response: any) => {
        console.log('Greeting:', response?.message);
    });

    client.sayHelloAgain({name: user}, (err: any, response: any) => {
        console.log('Greeting:', response?.message);
    })

}

start();

 