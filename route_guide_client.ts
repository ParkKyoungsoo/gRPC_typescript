import * as async from 'async';
import fs from 'fs';
import parseArgs from 'minimist';
import path from 'path';
import _ from 'lodash';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/route_guide';
import { features } from 'process';
import { IPoint, IFeature } from './models/RouteModel';

const packagaDefinition = protoLoader.loadSync('./proto/route_guide.proto');
const routeguide = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;
const client = new routeguide.routeguide.RouteGuide('localhost:50051', grpc.credentials.createInsecure());
const COORD_FACTOR = 1e7;

const runGetFeature = (callback: any) => {
  console.log(callback.toString());
  const next = _.after(2, callback);
  const featureCallback = (error: any, feature: any) => {

    if (error) {
      callback(error);
      return;
    }

    if (feature.name === '') {
      console.log('Found no feature at ' +
        feature.location.latitude / COORD_FACTOR + ' , ' +
        feature.location.longitude / COORD_FACTOR);
    } else {
      console.log('Found feature called "' + feature.name + '" at ' +
        feature.location.latitude / COORD_FACTOR + ' , ' +
        feature.location.longitude / COORD_FACTOR);
    }
    next();
  }
  const point1: IPoint = {
    latitude: 409146138,
    longitude: -746188906
  };
  const point2: IPoint = {
    latitude: 0,
    longitude: 0
  };
  client.getFeature(point1, featureCallback);
  client.getFeature(point2, featureCallback);
}

interface IRectangle {
  lo: IPoint,
  hi: IPoint,
}

const runListFeature = (callback: any) => {
  console.log("client listFeature",callback.toString());
  let rectangle: IRectangle = {
    lo: {
      latitude: 400000000,
      longitude: -750000000
    },
    hi: {
      latitude: 420000000,
      longitude: -730000000
    }
  }
  console.log('Looking for features between 40, -75 and 42, -73');
  let call = client.listFeatures(rectangle);
  call.on('data', (feature: any) => {
    console.log('Found feature called "' + feature.name + '" at ' +
      feature.location.latitude / COORD_FACTOR + ', ' +
      feature.location.longitude / COORD_FACTOR);
  });
  call.on('end', callback);

}

const runRecordRoute = (callback: any) => {
  let argv = parseArgs(process.argv, {
    string: 'db_path'
  });

  fs.readFile(path.resolve(argv.db_path), (err: any, data: any) => {
    if (err) {
      callback(err);
      return;
    }

    const feature_list = JSON.parse(data);
    const num_points: number = 5;
    const call = client.recordRoute((error: any, stats: any) => {
      console.log(err, stats);
      if (error) {
        callback(error);
        return;
      }

      console.log('Finished trip with', stats.pointCount, 'points');
      console.log('Passed', stats.featureCount, 'features');
      console.log('Travelled', stats.distance, 'meters');
      console.log('It took', stats.elapsedTime, 'seconds');
      callback();
    });

    const pointSender = (lat: number, lng: number) => {
      return (callback: any) => {
        console.log('Visiting point ' + lat / COORD_FACTOR + ', ' +
          lng / COORD_FACTOR);
        call.write({
          latitude: lat,
          longitude: lng
        });
        _.delay(callback, _.random(500, 1500));
      }
    }
    let point_senders = [];

    for (let i = 0; i < num_points; i++) {
      const rand_point = feature_list[_.random(0, feature_list.length - 1)];
      point_senders[i] = pointSender(rand_point.location.latitude, rand_point.location.longitude);
    }

    async.series(point_senders, () => {
      call.end();
    });
  });
}

const runRouteChat = (callback: any) => {
  const call = client.routeChat();

  call.on('data', (note: any) => {
    console.log('Got message "' + note.message + '" at ' +
      note.location.latitude + ' , ' + note.location.longitude);
  });

  call.on('end', callback);

  const notes = [{
    location: {
      latitude: 0,
      longitude: 0
    },
    message: 'First message'
  }, {
    location: {
      latitude: 0,
      longitude: 1
    },
    message: 'Second message'
  }, {
    location: {
      latitude: 1,
      longitude: 0
    },
    message: 'Third message'
  }, {
    location: {
      latitude: 0,
      longitude: 0
    },
    message: 'Fourth message'
  }];


  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log('Sending message "' + note.message + '" at ' +
      note.location.latitude + ', ' + note.location.longitude);
    call.write(note);
  }
  call.end();
}

const main = () => {
  async.series([
    // runGetFeature,
    // runListFeature,
    // runRecordRoute,
    runRouteChat
  ]);
}

if (require.main === module) {
  main();
}

exports.runGetFeature = runGetFeature;
exports.runListFeature = runListFeature;
exports.runRouteChat = runRouteChat;
exports.runRouteChat = runRouteChat;


