import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IHiker,
  IBridge,
  IHikingResponse,
  IHikingResult,
} from 'src/app/models/models';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HikingService {
  _hikers: IHiker[] | undefined;
  _bridges: IBridge[] | undefined;
  _results: IHikingResult[] | undefined;

  constructor(private httpClient: HttpClient) {}

  getHikingData(): Observable<IHikingResponse> {
    return this.httpClient.get<IHikingResponse>(`${baseURL}`);
  }

  addHiker(hiker: IHiker): void {
    this._hikers = this._hikers ? [...this._hikers, hiker] : [hiker];
  }

  addBridge(bridge: IBridge): void {
    this._bridges = this._bridges ? [...this._bridges, bridge] : [bridge];
  }

  calculateAllBridgeData() {
    let hikeResults = [];
    for (let x = 0; x < this.bridges.length; x++) {
      hikeResults.push(
        this.calculateBridgeData(
          this.bridges[x]._id,
          this.bridges[x].numHikers,
          this.bridges[x].length
        )
      );
    }
    this._results = hikeResults;
  }

  calculateBridgeData(
    id: number,
    numHikers: number,
    bridgeLength: number
  ): IHikingResult {
    let totalBridgeTime = 0;

    // grab the subset of hikers by numHikers
    let slowHikers = this.hikers.slice(0, numHikers);

    // grab hiker ids
    let hikerIds = slowHikers.map((hiker) => hiker._id);

    // sort the array slowest to fastest
    slowHikers.sort((a, b) => (a.speed > b.speed ? 1 : -1));

    // assign the fastest hiker to the lead
    let leadHiker = slowHikers.pop();

    // calculate the time to cross with the slowest hiker lead first
    // remember to add the time to cross back with the fastest hiker
    // since there is only one torch
    slowHikers.map((slowHiker, index) => {
      totalBridgeTime +=
        bridgeLength / slowHiker.speed +
        (index === slowHikers.length - 1 && leadHiker
          ? 0
          : bridgeLength / (leadHiker ? leadHiker.speed : 1));
    });

    let hikeResult: IHikingResult = {
      id,
      bridgeLength,
      numHikers,
      hikerIds,
      totalBridgeTime,
    };
    return hikeResult;
  }

  // hikers
  get hikers(): IHiker[] {
    if (this._hikers) return this._hikers;
    return [];
  }

  set hikers(data: IHiker[]) {
    this._hikers = [...data];
  }

  // bridges
  get bridges(): IBridge[] {
    if (this._bridges) return this._bridges;
    return [];
  }

  set bridges(data: IBridge[]) {
    this._bridges = [...data];
  }

  // hiking results
  get hikingResults(): IHikingResult[] {
    if (this._results) return this._results;
    return [];
  }

  set hikingResults(data) {
    this._results = [...data];
  }
}
