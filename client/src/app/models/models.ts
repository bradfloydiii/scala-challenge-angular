export interface IHiker {
  _id: number;
  speed: number;
}

export interface IBridge {
  _id: number;
  length: number;
  numHikers: number;
}

export interface IHikingResponse {
  hikers: IHiker[];
  bridges: IBridge[];
}

export interface IHikingResult {
  id: number ;
  bridgeLength: number;
  numHikers: number;
  hikerIds: number[];
  totalBridgeTime: number;
}
