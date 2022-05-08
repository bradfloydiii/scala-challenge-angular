import { Component, OnInit } from '@angular/core';
import { IBridge, IHiker, IHikingResult } from 'src/app/models/models';
import { HikingService } from 'src/app/services/hiking/hiking.service';

@Component({
  selector: 'app-hiking',
  templateUrl: './hiking.component.html',
  styleUrls: ['./hiking.component.css'],
})
export class HikingComponent implements OnInit {
  hikers: IHiker[] | undefined;
  bridges: IBridge[] | undefined;
  results: IHikingResult[] | undefined;
  data: any;

  constructor(public service: HikingService) {
    this.results = this.service.hikingResults;
  }

  ngOnInit(): void {
    this.service.getHikingData().subscribe(
      (data) => {
        this.service.hikers = data.hikers;
        this.service.bridges = data.bridges;
      },
      (error) => {
        console.log('error: ', error);
      },
      () => {
        // console.log(
        //   'hikers',
        //   this.service.hikers,
        //   'bridges',
        //   this.service.bridges
        // );
      }
    );

    this.service.getHikingData();
  }

  calculateAllData(): void {
    this.service.calculateAllBridgeData();
  }
}
