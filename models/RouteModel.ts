export interface IPoint {
    latitude: number,
    longitude: number,
}

export interface IFeature {
    name: string,
    location: IPoint,
}