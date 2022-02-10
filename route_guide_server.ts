import parseArgs from 'minimist';
import * as grpc from '@grpc/grpc-js';
import * as protoloader from '@grpc/proto-loader';
import * as _ from 'lodash';
import fs from 'fs';
import path from 'path';

import { ProtoGrpcType } from './proto/route_guide';
import { IPoint, IFeature } from './models/RouteModel';
import { getServers } from 'dns';


const COORD_FACTOR = 1e7;

let feature_list: IFeature[] = [];

const checkFeature = (point: any): IFeature => {
    let feature: IFeature = {
        name: 'init',
        location: {
            latitude: -1,
            longitude: -1,
        }
    };

    for (let i = 0; i < feature_list.length; i++) {
        feature = feature_list[i];
        if (feature.location.latitude === point.latitude &&
            feature.location.longitude === point.longitude) {
            return feature;
        }
    }

    let name: string = '';

    feature = {
        name: name,
        location: point
    }
    return feature;
}

const getFeature = (call: any, callback: any): void => {
    console.log(callback.toString());
    callback(null, checkFeature(call.request));
}

const listFeatures = (call: any): void => {
    console.log(call);
    
    const lo: IPoint = call.request.lo;
    const hi: IPoint = call.request.hi;
    const left: number = _.min([lo.longitude, hi.longitude]) || -1;
    const right: number = _.max([lo.longitude, hi.longitude]) || -1;
    const top: number = _.max([lo.latitude, hi.latitude]) || -1;
    const bottom: number = _.min([lo.latitude, hi.longitude]) || -1;

    _.each(feature_list, (feature) => {
        if (feature.name === '') {
            return;
        }
        if (feature.location.longitude >= left &&
            feature.location.longitude <= right &&
            feature.location.latitude >= bottom &&
            feature.location.latitude <= top) {
            call.write(feature);
        }
    });
    call.end();
}


const getDistance = (start: any, end: any): number => {
    const toRadians = (num: number): number => {
        return num * Math.PI / 180;
    }
    const R: number = 6371000;  // earth radius in metres
    const lat1: number = toRadians(start.latitude / COORD_FACTOR);
    const lat2: number = toRadians(end.latitude / COORD_FACTOR);
    const lon1: number = toRadians(start.longitude / COORD_FACTOR);
    const lon2: number = toRadians(end.longitude / COORD_FACTOR);

    const deltalat: number = lat2 - lat1;
    const deltalon: number = lon2 - lon1;
    const a: number = Math.sin(deltalat / 2) * Math.sin(deltalat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltalon / 2) * Math.sin(deltalon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}


const recordRoute = (call: any, callback: any) => {
    let point_count: number = 0;
    let feature_count: number = 0;
    let distance: number = 0;
    let previous: any = null;
    // Start a timer
    let start_time: [number, number] = process.hrtime();
    call.on('data', (point: any) => {
        point_count += 1;
        if (checkFeature(point).name !== '') {
            feature_count += 1;
        }
        /* For each point after the first, add the incremental distance from the
         * previous point to the total distance value */
        if (previous != null) {
            distance += getDistance(previous, point);
        }
        previous = point;
    });

    console.log(call, callback.toString());

    call.on('end', () => {
        // snake_case not working


        callback(null,

            // {
            //     point_count: point_count,
            //     feature_count: feature_count,
            //     distance: distance | 0,
            //     elapsed_time: process.hrtime(start_time)[0]
            // },

            {
                pointCount: point_count,
                featureCount: feature_count,
                distance: distance | 0,
                elapsedTime: process.hrtime(start_time)[0]
            }
        );
    });
}

let route_notes: any = {};

const pointKey = (point: IPoint): string => {
    return point.latitude + ' ' + point.longitude;
}

const routeChat = (call: any) => {
    console.log(call);

    call.on('data', (note: any) => {
        const key: string = pointKey(note.location);
        if (route_notes.hasOwnProperty(key)) {
            _.each(route_notes[key], (note) => {
                call.write(note);
            });
        } else {
            route_notes[key] = [];
        }
        
        route_notes[key].push(JSON.parse(JSON.stringify(note)));
        console.log(key, route_notes);
    });

    call.on('end', () => {
        call.end();
    });
}
const packagaDefinition = protoloader.loadSync('./proto/route_guide.proto');
const proto: ProtoGrpcType = (grpc.loadPackageDefinition(packagaDefinition) as unknown) as ProtoGrpcType;

export function getServer() {
    const server: grpc.Server = new grpc.Server();
    server.addService(proto.routeguide.RouteGuide.service, {
        getFeature: getFeature,
        listFeatures: listFeatures,
        recordRoute: recordRoute,
        routeChat: routeChat
    });
    return server;
}

if (require.main === module) {
    const routeServer = getServer();
    routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        const argv = parseArgs(process.argv, {
            string: 'db_path'
        });

        fs.readFile(path.resolve(argv.db_path), (err: any, data: any) => {
            if (err) throw err;
            feature_list = JSON.parse(data);
            routeServer.start();
        });
    })
}

exports.getServer = getServer;

